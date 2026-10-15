window.PORTFOLIO = {

  /* ---------- Écran « cliquer pour entrer »  ---------- */
  splash: {
    enabled: true,
    text: "Bienvenue dans mon histoire",
  },

  /* ---------- Profil ---------- */
  profile: {
    name: "chouk",
    handle: "@choukettas",
    avatar: "assets/avatar.svg",
    typing: [
      "Développeur",
      "Créateur de projets",
      "Curieux de tout",
    ],
    badges: ["Dev", "Créatif", "Noctambule"],
    status: { text: "Disponible pour des projets", live: true },
    about: `
      Salut, moi c'est chouk. J'ai 16 ans, Je crée des sites, des outils et des petits projets
      pour le plaisir d'apprendre et de partager.

      Ici tu trouveras ce que j'ai fabriqué, l'histoire de mon parcours,
      et le moyen de me contacter.
    `,
  },

  /* ---------- Statistiques ---------- */
  stats: [
    { label: "Projets", value: "auto:projects", note: "publiés ici", icon: "box" },
    { label: "Depuis", value: "2023", note: "je code", icon: "calendar" },
    { label: "Lieu", value: "France", note: "fuseau Europe/Paris", icon: "pin" },
    { label: "Langages", value: "5", note: "et ça continue", icon: "code" },
  ],

  /* ---------- Compétences ---------- */
  skills: [
    { name: "Python", level: 85 },
    { name: "JavaScript", level: 75 },
    { name: "HTML / CSS", level: 67 },
    { name: "Host / Network", level: 50 },
  ],

  /* ---------- Liens ---------- */
  links: [
    { label: "GitHub", url: "https://github.com/choukettas", icon: "github" },
    { label: "Discord", url: "https://discord.com/users/1369458557354905702", icon: "discord" },
  ],

  /* ---------- Projets ---------- */
  projects: [
    {
      title: "Pool de Minage PRL",
      description: "Une pool PRL en PPLNS",
      category: "Crypto",
      tags: ["JS", "PRL", "Crypto", "Pool"],
      year: "2026",
      status: "En cours",
      image: "assets/Projet/PearlPool.png",
      links: [{ label: "Voir le site", url: "https://pool.chouk.ovh" }],
    },
    {
      title: "emeRIZZ",
      description: "Votre coach de rencontres",
      category: "web",
      tags: ["js", "saas", "AI", "app"],
      year: "2026",
      status: "En cours",
      image: "assets/Projet/emerizz.png",
      links: [{ label: "Voir le site", url: "https://emerizz.com" }],
    },
    {
      title: "Drone FPV",
      description: "Créer un drone FPV de zéro",
      category: "Électronique",
      tags: ["FPV", "Impression 3D", "Betaflight", "ERLS"],
      year: "2026",
      status: "Terminer",
      image: "assets/Projet/DroneFPV.jpg",
      links: [],
    },
    {
      title: "Cerfa-filler",
      description: "Logiciel développé dans le cadre d'un stage chez Anaveo pour générer automatiquement des Cerfa.",
      category: "outil",
      tags: ["Python", "Logiciel", "Entreprise", "Anaveo"],
      year: "2026",
      status: "Terminer",
      image: "assets/Projet/cerfa_filler.png",
      links: [{ label: "Voir l'Entreprise", url: "https://www.anaveo.fr" }],
    },
    {
      title: "Games Tracker",
      description: "Un outil de suivi des jeux gratuits",
      category: "Bot/automatisation",
      tags: ["Python", "Discord", "Games"],
      year: "2026",
      status: "Terminé",
      image: "assets/Projet/Game_Tracker.png",
      links: [{ label: "Code source", url: "https://github.com/Choukettas/games_tracker_V2" }],
    },
    {
      title: "Première Game Jam",
      description: "Un jeu jouable dans le navigateur, créé pour une Game Jam de 48 heures.",
      category: "Jeu",
      tags: ["2D", "Unity", "C#"],
      year: "2025",
      status: "Terminé",
      image: "assets/Projet/GameJames.png",
      links: [{ label: "Jouer", url: "https://choukettas.itch.io/survie-game" }],
    },
    {
      title: "Automatisation",
      description: "Un script Python qui permet de trier l'ensemble de mes fichiers téléchargés.",
      category: "Outil",
      tags: ["Python", "Soft"],
      year: "2025",
      status: "terminé",
      image: "assets/Projet/GDT.png",
      links: [{ label: "Code source", url: "https://github.com/Choukettas/Download-Manager" }],
    },

  ],

  /* ---------- Mon histoire ---------- */
  story: {
    title: "Comment tout a commencé",
    intro: `
    Tout a commencé un soir, avec une envie : créer des jeux vidéo. Je regardais des tutoriels, je testais, j'apprenais. Inspiré par des films comme Matrix, je découvrais peu à peu la programmation et tout ce qu'elle permettait de créer. J'ai rapidement compris que je voulais aller plus loin.
    Depuis, chaque projet m'a appris quelque chose : chercher, échouer, recommencer et aller jusqu'au bout. Aujourd'hui, je continue d'apprendre en me lançant de nouveaux défis. C'est cette histoire que je raconte ici.
    `,
    chapters: [
      {
        date: "2023",
        title: "Les premières lignes",
        text: `
          J'ai pu découvrir le développement de jeux vidéo grâce à une formation chez Studio XP, où j'ai créé mes tout premiers jeux vidéo. Cette expérience m'a permis de découvrir les bases du développement
        `,
      },
      {
        date: "2024",
        title: "Premier vrai projet",
        text: `
        Je découvre ensuite l'hébergement et l'installation de serveurs. Avec d'autres personnes, nous lançons un projet appelé SkyClouds, spécialisé dans l'hébergement de VPS. Je quitte finalement ce projet peu de temps après pour me consacrer à de nouvelles expériences : la création de bots Discord et l'apprentissage de Python et de JavaScript.
        `,
      },
      {
        date: "2025",
        title: "L'heure d'un tournant",
        text: `
          Cette année J'ai exploré de nombreux domaines de l'informatique, 
          en passant par les Game Jams, le développement web, l'administration 
          d'infrastructures réseau et les CTF (Capture The Flag).
        `,
      },
      {
        date: "2026",
        title: "Aujourd'hui",
        text: `
          Mon objectif est de repousser mes limites, 
          d'apprendre par moi-même et de transformer mes idées en projets concrets. 
          Chaque projet est pour moi une occasion de relever de nouveaux défis, 
          de développer mes compétences et de progresser un peu plus.
        `,
      },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    email: "pereztimeo.pro@gmail.com",
    text: "Une idée, une question, un projet ? Écris-moi, je réponds dès que possible.",
  },
};
