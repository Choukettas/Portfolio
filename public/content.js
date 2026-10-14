window.PORTFOLIO = {

  /* ---------- Écran « cliquer pour entrer »  ---------- */
  splash: {
    enabled: true,
    text: "cliquer pour entrer",
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
    { label: "Projets",   value: "auto:projects", note: "publiés ici",       icon: "box" },
    { label: "Depuis",    value: "2021",          note: "je code",           icon: "calendar" },
    { label: "Lieu",      value: "France",        note: "fuseau Europe/Paris", icon: "pin" },
    { label: "Langages",  value: "5",            note: "et ça continue",    icon: "code" },
  ],

  /* ---------- Compétences ---------- */
  skills: [
    { name: "Python",      level: 85 },
    { name: "JavaScript",  level: 75 },
    { name: "HTML / CSS",  level: 67 },
    { name: "Host / Network",      level: 50 },
  ],

  /* ---------- Liens ---------- */
  links: [
    { label: "GitHub",    url: "https://github.com/choukettas",          icon: "github" },
    { label: "Discord",   url: "https://discord.com/users/1369458557354905702",         icon: "discord" },
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
      image: "",
      links: [{ label: "Voir le site", url: "https://pool.chouk.ovh" }],
    },
    {
      title: "emeRIZZ",
      description: "Votre coach de rencontres",
      category: "web",
      tags: ["js","saas","AI", "app"],
      year: "2026",
      status: "En cours",
      image: "",
      links: [{ label: "Voir le site", url: "https://emerizz.com" }],
    },
        {
      title: "1er Game JAMS",
      description: "Un jeu jouable dans le navigateur, créé pour une game jam de 48 h.",
      category: "Jeu",
      tags: ["2D", "Unity","C#"],
      year: "2026",
      status: "Terminé",
      image: "",
      links: [{ label: "Jouer", url: "https://choukettas.itch.io/survie-game" }],
    },
    {
      title: "Games Tracker",
      description: "Tracker de jeux gratuis",
      category: "Bot/automatisation",
      tags: ["Python","Discord","Games"],
      year: "2025",
      status: "Terminé",
      image: "",
      links: [{ label: "Code source", url: "https://github.com/Choukettas/games_tracker_V2" }],
    },
    {
      title: "Outil d'automatisation",
      description: "Un script Python qui permet de trier entierter de mais fichier telecharger",
      category: "Outil",
      tags: ["Python", "Script"],
      year: "2025",
      status: "terminé",
      image: "",
      links: [{ label: "Code source", url: "https://github.com/Choukettas/Download-Manager" }],
    }
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
          J'ai pue decouvir le developement grasse a un formation (studio XP) et crée mais tout premier jeux video
        `,
      },
      {
        date: "2024",
        title: "Premier vrai projet",
        text: `
          Je decouvre lebergement et les installation de serveur on monte un projet apeler skyclouds
          pour ebergementd VPS projet que je quiterais peu de themps aprés 
          pour me lencer dans la création de bot discord et l'aprentisage de python et java-script
        `,
      },
      {
        date: "2025",
        title: "tout a changer",
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
