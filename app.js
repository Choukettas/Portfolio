(() => {
  'use strict';

  /* ---------- Données ---------- */

  const config = window.PORTFOLIO;
  if (!config) {
    document.body.textContent = 'content.js introuvable ou invalide.';
    return;
  }

  const profile = config.profile || {};
  const projects = config.projects || [];
  const links = config.links || [];
  const stats = config.stats || [];
  const skills = config.skills || [];
  const story = config.story || {};
  const contact = config.contact || {};
  const splashConfig = config.splash || {};

  const siteName = profile.name || 'Portfolio';
  const initial = siteName.trim().charAt(0).toUpperCase() || '?';
  const avatarSrc = profile.avatar || 'assets/avatar.svg';

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const RECENT_PROJECTS_COUNT = 3;
  const ALL_CATEGORIES = 'Tous';
  const AVATAR_SIZE = 152;

  const TYPING_DELAY = 80;
  const DELETING_DELAY = 35;
  const PAUSE_AFTER_WORD = 1600;
  const PAUSE_BEFORE_NEXT_WORD = 350;

  const TILT_MAX_DEGREES = 7;
  const SPLASH_FADE_MS = 450;
  const THEME_COLORS = { ink: '#0a0a0a', paper: '#f2f2f2' };

  const PAGES = [
    { id: 'profil', label: 'Profil', icon: 'user', subtitle: () => profile.handle || 'Qui je suis' },
    { id: 'projets', label: 'Projets', icon: 'grid', subtitle: () => `${projects.length} projet${plural(projects.length)} à découvrir` },
    { id: 'histoire', label: 'Histoire', title: 'Mon histoire', icon: 'book', subtitle: () => story.title || 'Mon parcours' },
    { id: 'contact', label: 'Contact', icon: 'mail', subtitle: () => 'Parlons-en' },
  ];


  /* ---------- Icônes ---------- */

  const ICONS = {
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    arrow: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2z"/><path d="M11 11V7"/><path d="M16 11V7"/>',
    discord: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
    x: '<path d="M4 4l16 16"/><path d="M20 4 4 20"/>',
    tiktok: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  };

  function createSvg(name, className) {
    const template = document.createElement('template');
    template.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.link}</svg>`;

    const svg = template.content.firstElementChild;
    if (className) svg.setAttribute('class', className);
    return svg;
  }

  function createIconBox(name, className) {
    return h('span', { class: className }, createSvg(name));
  }


  /* ---------- Utilitaires DOM ---------- */

  function select(selector, root = document) {
    return root.querySelector(selector);
  }

  function selectAll(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function setAttributes(element, attributes) {
    for (const [name, value] of Object.entries(attributes || {})) {
      if (value == null || value === false) continue;

      if (name === 'class') {
        element.className = value;
      } else if (name.startsWith('on')) {
        element.addEventListener(name.slice(2), value);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    }
  }

  function isRenderable(child) {
    return child != null && child !== false && child !== '';
  }

  function h(tag, attributes, ...children) {
    const element = document.createElement(tag);
    setAttributes(element, attributes);

    for (const child of children.flat(Infinity)) {
      if (!isRenderable(child)) continue;
      element.append(child.nodeType ? child : String(child));
    }
    return element;
  }


  /* ---------- Utilitaires texte et liens ---------- */

  function plural(count) {
    return count > 1 ? 's' : '';
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function formatNumber(index) {
    return String(index + 1).padStart(2, '0');
  }

  function categoryOf(project) {
    return project.category || (project.tags || [])[0] || '';
  }

  function joinLines(block) {
    return block
      .split('\n')
      .map((line) => line.trim())
      .join(' ')
      .trim();
  }

  function toParagraphs(text) {
    return String(text || '')
      .trim()
      .split(/\n\s*\n/)
      .map(joinLines)
      .filter(Boolean)
      .map((paragraph) => h('p', null, paragraph));
  }

  function sanitizeUrl(url) {
    const value = String(url || '').trim();
    if (!value) return '#';
    if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return '#';
    return value;
  }

  function createLink(attributes, ...children) {
    const href = sanitizeUrl(attributes.href);
    const isExternal = /^https?:/i.test(href);

    return h('a', {
      ...attributes,
      href,
      target: isExternal ? '_blank' : null,
      rel: isExternal ? 'noopener noreferrer' : null,
    }, ...children);
  }


  /* ---------- Composants communs ---------- */

  function panelTitle(title, aside) {
    return h('div', { class: 'panel-title' }, title, aside && h('small', null, aside));
  }

  function createInitialBadge(className) {
    return h('div', { class: className, 'aria-hidden': 'true' }, initial);
  }

  function createAvatar() {
    const image = h('img', {
      class: 'avatar',
      src: avatarSrc,
      alt: `Photo de profil de ${profile.name || ''}`,
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
    });
    image.addEventListener('error', () => image.replaceWith(createInitialBadge('avatar-fallback')), { once: true });
    return image;
  }

  function createLinkButton(link) {
    return createLink({ class: 'link-btn', href: link.url },
      createIconBox(link.icon || 'link', 'ico'),
      h('span', { class: 'lbl' }, link.label),
      createSvg('arrow', 'arr'));
  }


  /* ---------- Page Profil ---------- */

  function renderProfilePage(page) {
    const card = buildProfileCard();
    const column = h('div', null, buildStats(), buildAbout(), buildSkills(), buildRecentProjects());

    page.append(h('div', { class: 'home-grid' }, card, column));

    startTyping(select('.typed', card), profile.typing || []);
    enableTilt(card);
  }

  function buildProfileCard() {
    const typingPhrases = profile.typing || [];
    const badges = profile.badges || [];

    return h('aside', { class: 'panel profile' },
      h('div', { class: 'avatar-wrap' }, createAvatar()),
      h('h2', { class: 'name' }, profile.name),
      profile.handle && h('p', { class: 'handle' }, profile.handle),
      h('p', { class: 'typing', 'aria-label': typingPhrases.join(', ') },
        h('span', { class: 'typed', 'aria-hidden': 'true' }),
        h('span', { class: 'caret', 'aria-hidden': 'true' })),
      badges.length > 0 && h('div', { class: 'badges' }, badges.map((badge) => h('span', { class: 'badge' }, badge))),
      links.length > 0 && h('div', { class: 'links' }, links.map(createLinkButton)));
  }

  function buildStats() {
    if (stats.length === 0) return null;

    const columns = clamp(stats.length, 1, 4);
    return h('div', { class: 'stats', style: `--cols:${columns}` }, stats.map(buildStatCard));
  }

  function buildStatCard(stat) {
    const value = stat.value === 'auto:projects' ? projects.length : stat.value;

    return h('div', { class: 'stat' },
      h('div', { class: 'label' },
        h('span', null, stat.label),
        createIconBox(stat.icon || 'star', 'ico')),
      h('div', { class: 'value' }, value),
      stat.note && h('div', { class: 'note' }, stat.note));
  }

  function buildAbout() {
    return h('section', { class: 'panel' },
      panelTitle('À propos'),
      h('div', { class: 'prose' }, toParagraphs(profile.about)));
  }

  function buildSkills() {
    if (skills.length === 0) return null;

    return h('section', { class: 'panel' },
      panelTitle('Compétences'),
      skills.map(buildSkill));
  }

  function buildSkill(skill) {
    const level = clamp(Number(skill.level) || 0, 0, 100);

    return h('div', { class: 'skill' },
      h('div', { class: 'row' },
        h('span', null, skill.name),
        h('span', null, `${level}%`)),
      h('div', { class: 'bar', role: 'img', 'aria-label': `${skill.name} : ${level}%` },
        h('div', { class: 'fill', style: `--w:${level}%` })));
  }

  function buildRecentProjects() {
    if (projects.length === 0) return null;

    const recent = projects.slice(0, RECENT_PROJECTS_COUNT);

    return h('section', { class: 'panel' },
      panelTitle('Derniers projets', h('a', { href: '#projets' }, 'Tout voir →')),
      recent.map(buildRecentProjectRow));
  }

  function buildRecentProjectRow(project, index) {
    return h('a', { class: 'mini', href: '#projets' },
      h('span', { class: 'n' }, formatNumber(index)),
      h('span', { class: 't' }, project.title),
      h('span', { class: 'tg' }, categoryOf(project)),
      createSvg('arrow', 'arr'));
  }

  function startTyping(element, words) {
    const phrases = words.filter(Boolean);
    if (phrases.length === 0) return;

    if (prefersReducedMotion || phrases.length === 1) {
      element.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charCount = 0;
    let deleting = false;

    function tick() {
      const phrase = phrases[phraseIndex];
      element.textContent = phrase.slice(0, charCount);

      if (!deleting && charCount < phrase.length) {
        charCount++;
        setTimeout(tick, TYPING_DELAY);
      } else if (!deleting) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER_WORD);
      } else if (charCount > 0) {
        charCount--;
        setTimeout(tick, DELETING_DELAY);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE_NEXT_WORD);
      }
    }

    tick();
  }

  function enableTilt(card) {
    if (prefersReducedMotion) return;

    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      const box = card.getBoundingClientRect();
      const offsetX = (event.clientX - box.left) / box.width - 0.5;
      const offsetY = (event.clientY - box.top) / box.height - 0.5;
      const rotateY = (offsetX * TILT_MAX_DEGREES).toFixed(2);
      const rotateX = (-offsetY * TILT_MAX_DEGREES).toFixed(2);

      card.style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  }


  /* ---------- Page Projets ---------- */

  function renderProjectsPage(page) {
    if (projects.length === 0) {
      page.append(h('div', { class: 'notice' }, 'Aucun projet pour le moment : ajoute-en dans content.js.'));
      return;
    }

    const cards = projects.map(buildProjectCard);
    const categories = [...new Set(projects.map(categoryOf).filter(Boolean))];

    if (categories.length > 1) page.append(buildFilters(categories, cards));
    page.append(h('div', { class: 'projects' }, cards));
  }

  function buildProjectCard(project, index) {
    const tags = project.tags || [];
    const projectLinks = project.links || [];

    return h('article', { class: 'panel project', 'data-category': categoryOf(project) },
      buildThumbnail(project, index),
      h('div', { class: 'p-body' },
        h('div', { class: 'p-head' },
          h('h3', null, project.title),
          project.status && h('span', { class: 'badge' }, project.status)),
        h('p', { class: 'p-desc' }, project.description),
        h('div', { class: 'p-meta' },
          tags.map((tag) => h('span', { class: 'chip' }, tag)),
          project.year && h('span', { class: 'yr' }, project.year)),
        projectLinks.length > 0 && h('div', { class: 'p-links' }, projectLinks.map(buildProjectLink))));
  }

  function buildThumbnail(project, index) {
    return h('div', { class: 'thumb' },
      h('span', { class: 'num', 'aria-hidden': 'true' }, formatNumber(index)),
      project.image && h('img', {
        src: project.image,
        alt: `Aperçu de ${project.title}`,
        loading: 'lazy',
        onerror: (event) => event.target.remove(),
      }));
  }

  function buildProjectLink(link) {
    return createLink({ class: 'btn ghost sm', href: link.url }, link.label, createSvg('arrow'));
  }

  function buildFilters(categories, cards) {
    const buttons = [ALL_CATEGORIES, ...categories].map((category) =>
      h('button', {
        class: 'btn ghost sm',
        type: 'button',
        onclick: () => applyFilter(category),
      }, category));

    function applyFilter(selected) {
      cards.forEach((card) => {
        card.hidden = selected !== ALL_CATEGORIES && card.dataset.category !== selected;
      });

      buttons.forEach((button) => {
        const isOn = button.textContent === selected;
        button.classList.toggle('on', isOn);
        button.setAttribute('aria-pressed', String(isOn));
      });
    }

    applyFilter(ALL_CATEGORIES);

    return h('div', { class: 'filters', role: 'group', 'aria-label': 'Filtrer par catégorie' }, buttons);
  }


  /* ---------- Page Histoire ---------- */

  function renderStoryPage(page) {
    const chapters = story.chapters || [];

    page.append(h('div', { class: 'story-wrap' },
      h('section', { class: 'panel' },
        panelTitle(story.title || 'Mon histoire'),
        h('div', { class: 'story-intro' }, toParagraphs(story.intro))),
      chapters.length > 0 && buildTimeline(chapters)));
  }

  function buildTimeline(chapters) {
    return h('section', { class: 'panel' },
      panelTitle('Mon parcours', `${chapters.length} étape${plural(chapters.length)}`),
      h('div', { class: 'timeline' }, chapters.map(buildChapter)));
  }

  function buildChapter(chapter) {
    return h('div', { class: 'chapter' },
      chapter.date && h('span', { class: 'badge when' }, chapter.date),
      h('h3', null, chapter.title),
      chapter.text && h('div', null, toParagraphs(chapter.text)));
  }


  /* ---------- Page Contact ---------- */

  function renderContactPage(page) {
    page.append(h('div', { class: 'contact-grid' },
      buildContactPanel(),
      links.length > 0 && buildLinksPanel()));
  }

  function buildContactPanel() {
    const { email } = contact;

    return h('section', { class: 'panel' },
      panelTitle('Écris-moi'),
      h('div', { class: 'prose' }, h('p', null, contact.text)),
      email && h('p', { class: 'mail-line' }, createLink({ href: `mailto:${email}` }, email)),
      buildContactForm(email),
      h('p', { class: 'form-note' }, 'Le bouton ouvre ton application de messagerie avec le message prêt à envoyer.'));
  }

  function buildContactForm(email) {
    const nameInput = h('input', {
      class: 'input',
      id: 'contact-name',
      type: 'text',
      autocomplete: 'name',
      placeholder: 'Ton nom',
    });

    const messageInput = h('textarea', {
      class: 'input',
      id: 'contact-message',
      required: true,
      placeholder: 'Ton message…',
    });

    function sendByMail(event) {
      event.preventDefault();
      if (!email) return;

      const sender = nameInput.value ? ` — ${nameInput.value}` : '';
      const subject = encodeURIComponent(`Message depuis ton portfolio${sender}`);
      const body = encodeURIComponent(messageInput.value);

      location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    return h('form', { class: 'form', onsubmit: sendByMail },
      h('div', { class: 'field' }, h('label', { for: 'contact-name' }, 'Nom'), nameInput),
      h('div', { class: 'field' }, h('label', { for: 'contact-message' }, 'Message'), messageInput),
      h('button', { class: 'btn', type: 'submit' }, 'Envoyer', createSvg('send')));
  }

  function buildLinksPanel() {
    return h('section', { class: 'panel' },
      panelTitle('Me retrouver'),
      h('div', { class: 'links flush' }, links.map(createLinkButton)));
  }


  /* ---------- Structure commune ---------- */

  function renderBrand() {
    const logo = h('img', { src: avatarSrc, alt: '' });
    logo.addEventListener('error', () => logo.replaceWith(createInitialBadge('brand-fallback')), { once: true });

    select('#brand').append(logo, h('span', { class: 'brand-name' }, siteName));
  }

  function renderNavigation() {
    const nav = select('#nav');

    for (const page of PAGES) {
      nav.append(h('a', {
        class: 'nav-item',
        href: `#${page.id}`,
        'data-nav': page.id,
        'data-label': page.label,
      }, createSvg(page.icon), h('span', null, page.label)));
    }
  }

  function renderFooters() {
    const year = new Date().getFullYear();

    select('#side-meta').append(
      h('div', null, 'Projets ', h('b', null, projects.length)),
      h('div', null, `© ${year} `, h('b', null, siteName)));

    select('#foot').append(
      h('span', null, `© ${year} ${siteName}`),
      h('span', null, 'noir & blanc · fait main'));
  }

  function renderStatus() {
    const { status } = profile;
    if (!status || !status.text) return;

    const badge = select('#status');
    badge.hidden = false;
    badge.classList.toggle('live', status.live !== false);
    select('#status-text').textContent = status.text;
  }

  function renderShell() {
    renderBrand();
    renderNavigation();
    renderFooters();
    renderStatus();
    select('#favicon').href = avatarSrc;

    renderProfilePage(select('[data-page="profil"]'));
    renderProjectsPage(select('[data-page="projets"]'));
    renderStoryPage(select('[data-page="histoire"]'));
    renderContactPage(select('[data-page="contact"]'));
  }


  /* ---------- Navigation ---------- */

  function markNavItem(item, isActive) {
    item.classList.toggle('active', isActive);

    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  }

  function showCurrentPage() {
    const requestedId = location.hash.slice(1);
    const current = PAGES.find((page) => page.id === requestedId) || PAGES[0];
    const title = current.title || current.label;

    selectAll('.page').forEach((section) => {
      section.classList.toggle('active', section.dataset.page === current.id);
    });
    selectAll('.nav-item').forEach((item) => {
      markNavItem(item, item.dataset.nav === current.id);
    });

    select('#page-title').textContent = title;
    select('#page-sub').textContent = current.subtitle();
    document.title = `${title} — ${siteName}`;
    window.scrollTo(0, 0);
  }


  /* ---------- Thème ---------- */

  function rememberTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      return;
    }
  }

  function setupThemeToggle() {
    const root = document.documentElement;
    const themeColorMeta = select('meta[name="theme-color"]');

    function syncThemeColor() {
      themeColorMeta.setAttribute('content', THEME_COLORS[root.dataset.theme] || THEME_COLORS.ink);
    }

    select('#theme-btn').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'paper' ? 'ink' : 'paper';
      rememberTheme(root.dataset.theme);
      syncThemeColor();
    });

    syncThemeColor();
  }


  /* ---------- Écran d'entrée ---------- */

  function rememberEntered() {
    try {
      sessionStorage.setItem('entered', '1');
    } catch (error) {
      return;
    }
  }

  function fillSplash() {
    select('#splash-name').textContent = profile.name || '';
    select('#splash-text').textContent = splashConfig.text || 'cliquer pour entrer';

    const image = select('#splash-avatar');
    image.src = avatarSrc;
    image.addEventListener('error', () => image.remove(), { once: true });
  }

  function setupSplash() {
    const root = document.documentElement;

    if (splashConfig.enabled === false) {
      root.classList.remove('splash-on');
      return;
    }

    const screen = select('#splash');
    let entered = false;

    function enter() {
      if (entered) return;
      entered = true;

      rememberEntered();
      screen.classList.add('leaving');
      setTimeout(() => root.classList.remove('splash-on'), prefersReducedMotion ? 0 : SPLASH_FADE_MS);
    }

    fillSplash();
    screen.addEventListener('click', enter);
    screen.addEventListener('keydown', (event) => {
      if (['Enter', ' ', 'Escape'].includes(event.key)) {
        event.preventDefault();
        enter();
      }
    });

    if (root.classList.contains('splash-on')) screen.focus();
  }


  /* ---------- Démarrage ---------- */

  renderShell();
  setupThemeToggle();
  setupSplash();
  window.addEventListener('hashchange', showCurrentPage);
  showCurrentPage();
})();
