'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { pipeline } = require('node:stream');


/* ---------- Configuration ---------- */

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const VIEWS_FILE = path.join(DATA_DIR, 'views.json');

const PORT = parsePort(process.env.PORT, 3000);
const HOST = process.env.HOST || '0.0.0.0';
const TRUST_PROXY = process.env.TRUST_PROXY === '1';

const MAX_URL_LENGTH = 2048;
const SAVE_DELAY_MS = 2000;
const MAX_VISITORS_PER_DAY = 50000;
const SHUTDOWN_TIMEOUT_MS = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function parsePort(value, fallback) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port < 65536 ? port : fallback;
}


/* ---------- Réponses HTTP ---------- */

function send(res, status, headers, body) {
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    ...headers,
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function sendJson(res, status, data, extraHeaders) {
  send(res, status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  }, JSON.stringify(data));
}

function sendText(res, status, message, extraHeaders) {
  send(res, status, { 'Content-Type': 'text/plain; charset=utf-8', ...extraHeaders }, message);
}

function pathnameOf(url) {
  return url.split(/[?#]/, 1)[0];
}

function clientIp(req) {
  if (TRUST_PROXY) {
    const forwarded = String(req.headers['x-forwarded-for'] || '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean);

    if (forwarded.length > 0) return forwarded[forwarded.length - 1];
  }
  return req.socket.remoteAddress || 'unknown';
}


/* ---------- Compteur de vues ---------- */

let viewCount = loadViewCount();
let saveTimer = null;
let visitorsDay = todayKey();
const visitorsToday = new Set();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashVisitor(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

function loadViewCount() {
  try {
    const saved = JSON.parse(fs.readFileSync(VIEWS_FILE, 'utf8'));
    return Number.isSafeInteger(saved.total) && saved.total >= 0 ? saved.total : 0;
  } catch (error) {
    if (error.code !== 'ENOENT') console.warn(`Compteur illisible (${VIEWS_FILE}) : ${error.message}`);
    return 0;
  }
}

function saveViewCount() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });

    const temporaryFile = `${VIEWS_FILE}.tmp`;
    fs.writeFileSync(temporaryFile, JSON.stringify({ total: viewCount }));
    fs.renameSync(temporaryFile, VIEWS_FILE);
  } catch (error) {
    console.error(`Impossible d'enregistrer le compteur : ${error.message}`);
  }
}

function scheduleSave() {
  if (saveTimer) return;

  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveViewCount();
  }, SAVE_DELAY_MS);
}

function flushViewCount() {
  if (!saveTimer) return;

  clearTimeout(saveTimer);
  saveTimer = null;
  saveViewCount();
}

function registerView(ip) {
  const today = todayKey();
  if (today !== visitorsDay) {
    visitorsDay = today;
    visitorsToday.clear();
  }

  const visitor = hashVisitor(ip);
  if (visitorsToday.has(visitor) || visitorsToday.size >= MAX_VISITORS_PER_DAY) return false;

  visitorsToday.add(visitor);
  viewCount += 1;
  scheduleSave();
  return true;
}


/* ---------- Routes de l'API ---------- */

function handleHealth(req, res) {
  sendJson(res, 200, {
    status: 'ok',
    uptime: Math.round(process.uptime()),
    time: new Date().toISOString(),
  });
}

function handleViewsGet(req, res) {
  sendJson(res, 200, { views: viewCount });
}

function handleViewsPost(req, res) {
  req.resume();
  const counted = registerView(clientIp(req));
  sendJson(res, 200, { views: viewCount, counted });
}

const API_ROUTES = {
  '/api/health': { GET: handleHealth },
  '/api/views': { GET: handleViewsGet, POST: handleViewsPost },
};

function handleApi(req, res, pathname) {
  if (!Object.hasOwn(API_ROUTES, pathname)) {
    return sendJson(res, 404, { error: 'not_found' });
  }

  const route = API_ROUTES[pathname];
  const method = req.method === 'HEAD' ? 'GET' : req.method;

  if (!Object.hasOwn(route, method)) {
    return sendJson(res, 405, { error: 'method_not_allowed' }, { Allow: Object.keys(route).join(', ') });
  }
  return route[method](req, res);
}


/* ---------- Fichiers du site ---------- */

function resolvePublicPath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch (error) {
    return null;
  }

  const segments = decoded.split('/').filter(Boolean);
  if (segments.length === 0) segments.push('index.html');

  const hasUnsafeSegment = segments.some((segment) => segment.startsWith('.') || /[\\:\0]/.test(segment));
  if (hasUnsafeSegment) return null;

  const filePath = path.join(PUBLIC_DIR, ...segments);
  return filePath.startsWith(PUBLIC_DIR + path.sep) ? filePath : null;
}

async function serveStatic(req, res, pathname) {
  const filePath = resolvePublicPath(pathname);
  if (!filePath) return sendText(res, 404, 'Introuvable');

  let stats;
  try {
    stats = await fs.promises.stat(filePath);
  } catch (error) {
    return sendText(res, 404, 'Introuvable');
  }
  if (!stats.isFile()) return sendText(res, 404, 'Introuvable');

  const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'Last-Modified': stats.mtime.toUTCString(),
    ETag: etag,
  };

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    return res.end();
  }

  res.writeHead(200, { ...headers, 'Content-Length': stats.size });
  if (req.method === 'HEAD') return res.end();

  pipeline(fs.createReadStream(filePath), res, (error) => {
    if (error) res.destroy();
  });
}


/* ---------- Serveur ---------- */

async function handleRequest(req, res) {
  if (req.url.length > MAX_URL_LENGTH) return sendText(res, 414, 'URL trop longue');

  const pathname = pathnameOf(req.url);
  if (!pathname.startsWith('/')) return sendText(res, 400, 'Requête invalide');

  if (pathname.startsWith('/api/')) return handleApi(req, res, pathname);

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendText(res, 405, 'Méthode non autorisée', { Allow: 'GET, HEAD' });
  }
  return serveStatic(req, res, pathname);
}

function logRequest(req, res) {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    console.log(`${new Date().toISOString()} ${req.method} ${pathnameOf(req.url)} ${res.statusCode} ${duration}ms`);
  });
}

const server = http.createServer((req, res) => {
  logRequest(req, res);

  handleRequest(req, res).catch((error) => {
    console.error(error);

    if (res.headersSent) {
      res.destroy();
    } else {
      sendJson(res, 500, { error: 'internal_error' });
    }
  });
});

server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;

server.on('error', (error) => {
  const reason = error.code === 'EADDRINUSE' ? `le port ${PORT} est déjà utilisé` : error.message;
  console.error(`Démarrage impossible : ${reason}`);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const displayHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
  console.log(`Portfolio en ligne : http://${displayHost}:${PORT}`);
});


/* ---------- Arrêt propre ---------- */

function shutdown() {
  flushViewCount();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), SHUTDOWN_TIMEOUT_MS).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
