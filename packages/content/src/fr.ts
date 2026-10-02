import { caseStudyChromeFr, creneoFr, webcmsFr } from "./case-studies/fr.js";
import type { SiteContent } from "./types.js";

const email = "contact@prenomnom.dev";
const links = {
  cv: "/cv/prenom-nom-cv.pdf",
  linkedin: "https://www.linkedin.com/in/prenom-nom",
  github: "https://github.com/prenom-nom",
};

export const fr: SiteContent = {
  caseStudyChrome: caseStudyChromeFr,
  caseStudies: { creneo: creneoFr, webcms: webcmsFr },
  meta: {
    title: "Enzo AIME — Développeur Full-Stack",
    description:
      "Développeur Full-Stack basé dans la région d’Évry-Courcouronnes, spécialisé dans la création d’applications web modernes, performantes et bien structurées.",
    ogLocale: "fr_FR",
  },
  person: {
    fullName: "Enzo AIME",
    titleLines: ["Enzo", "AIME"],
    initials: "EA",
    email,
  },
  links,
  a11y: {
    skipToContent: "Aller au contenu",
    mainNav: "Navigation principale",
    language: "Langue",
    themeToLight: "Passer en thème clair",
    themeToDark: "Passer en thème sombre",
    switchToLocale: { fr: "Afficher en français", en: "View in English" },
  },
  nav: {
    items: [
      { id: "accueil", label: "Accueil" },
      { id: "projets", label: "Projets" },
      { id: "apropos", label: "À propos" },
      { id: "parcours", label: "Parcours" },
      { id: "contact", label: "Contact" },
    ],
    themeNames: { dark: "Dark", light: "Light" },
    menuOpen: "Menu",
    menuClose: "Fermer",
    menuTitle: "Navigation",
    menuFooter: [email, "Évry-Courcouronnes — disponible"],
  },
  hero: {
    ariaLabel: "Présentation",
    meta: ["Développeur Full-Stack", "24 ans", "Région d’Évry-Courcouronnes"],
    lead: "Je conçois des applications web complètes, de l’idée jusqu’au déploiement.",
    description:
      "Développeur Full-Stack basé dans la région d’Évry-Courcouronnes, spécialisé dans la création d’applications web modernes, performantes et bien structurées.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger mon CV",
    ctaContact: "Me contacter",
    availability: "Disponible pour de nouvelles opportunités — CDI",
    scrollHint: "Faire défiler",
    transitionLabel: "02 — Projets sélectionnés",
    transitionTitle: ["Cinq couches.", "Deux produits réels."],
    layers: [
      { number: "01", name: "Frontend", stack: "React · Next.js · TypeScript", mobileName: "Frontend", mobileStack: "React · TS" },
      { number: "02", name: "API", stack: "REST", mobileName: "API", mobileStack: "REST" },
      { number: "03", name: "Backend", stack: "Node.js · NestJS", mobileName: "Backend", mobileStack: "Node · Nest" },
      { number: "04", name: "Database", stack: "PostgreSQL", mobileName: "Data", mobileStack: "PostgreSQL" },
      { number: "05", name: "DevOps", stack: "Docker · GitLab CI", mobileName: "DevOps", mobileStack: "Docker · CI" },
    ],
    portrait: {
      image: {
        src: "/images/portrait.jpg",
        alt: "Portrait de Enzo AIME",
        width: 864,
        height: 1536,
      },
      placeholder: "Portrait — fond neutre, cadrage buste, lumière latérale",
    },
    mobile: {
      meta: ["Full-Stack", "24 ans", "Évry-Courcouronnes"],
      description:
        "Développeur Full-Stack spécialisé dans la création d’applications web modernes, performantes et bien structurées.",
      availability: "Disponible — CDI",
    },
  },
  projects: {
    label: "02 — Projets sélectionnés",
    summary: "2 en ligne · 1 en préparation",
    featured: {
      slug: "creneo",
      number: "01",
      meta: ["Projet principal", "SaaS · Réservation", "2025"],
      title: "Créneo",
      description:
        "Une plateforme SaaS qui permet aux instituts de gérer leur agenda, leurs prestations et la prise de rendez-vous en ligne — conçue, développée et déployée de bout en bout.",
      details: [
        { term: "Rôle", value: "Conception, front, back, déploiement" },
        {
          term: "Stack",
          value: "React · TypeScript · Node.js · Express · MongoDB · Docker · Nginx · GitLab CI",
        },
      ],
      caseStudyCta: "Lire l’étude de cas",
      demo: { label: "Démo en ligne", href: "https://creneo.example.com" },
      repository: { label: "Code sur GitHub", href: "https://github.com/prenom-nom/creneo" },
      media: { placeholder: "Capture Créneo — agenda de l’institut (desktop, 1600×1000)" },
      mobileMedia: { placeholder: "Prise de RDV mobile" },
    },
    secondary: {
      slug: "webcms",
      number: "02",
      meta: ["Alternance", "Application interne"],
      title: "WebCMS",
      subtitle: "Arianespace",
      description:
        "Digitalisation et gestion de processus métier dans un environnement industriel exigeant : évolution, maintenance et fiabilisation d’une application existante.",
      details: [
        { term: "Période", value: "2024 — 2026" },
        { term: "Rôle", value: "Développeur Full-Stack alternant" },
        { term: "Périmètre", value: "Processus, SIPOC, imports, audit, administration" },
        { term: "Environnement", value: "React · TypeScript · Node.js · SSO / LDAP" },
      ],
      caseStudyCta: "Lire l’étude de cas",
      media: { placeholder: "Capture WebCMS anonymisée — vue arborescence des processus" },
      captions: ["Interface anonymisée — données fictives", "Code non public"],
    },
    upcoming: {
      number: "03",
      title: "Nouveau projet",
      status: "En préparation — publication prochaine",
    },
  },
  about: {
    label: "03 — À propos",
    text: {
      before: "Développeur Full-Stack junior, j’aime transformer un besoin concret en application ",
      highlight: "claire, robuste et agréable à utiliser.",
      after:
        " Je m’intéresse autant à l’expérience utilisateur qu’à l’architecture et à la qualité du code.",
    },
    facts: ["24 ans", "Région d’Évry-Courcouronnes", "Français · Anglais"],
    cvLink: "CV en PDF",
  },
  skills: {
    label: "Compétences",
    intro: "Les mêmes couches que l’architecture du hero — chacune utilisée sur un projet réel.",
    groups: [
      { number: "01", name: "Frontend", items: "TypeScript, React, Next.js, Tailwind CSS" },
      { number: "02", name: "Backend", items: "Node.js, NestJS, Express, REST" },
      { number: "03", name: "Data", items: "PostgreSQL, MongoDB, Prisma" },
      { number: "04", name: "DevOps", items: "Docker, Git, GitLab CI, Nginx" },
    ],
  },
  journey: {
    label: "04 — Parcours",
    titleLines: ["Quatre ans,", "une trajectoire."],
    steps: [
      { period: "2022", title: "Premiers projets et développement web" },
      { period: "2022 — 2024", title: "Certification niveau 6 — Cloud Campus" },
      {
        period: "2024 — 2026",
        title: "Développeur Full-Stack en alternance — Arianespace",
        caseStudy: { slug: "webcms", label: "Voir l’étude de cas WebCMS" },
      },
      {
        period: "Aujourd’hui",
        title: "Projets personnels et nouvelles opportunités professionnelles",
        current: true,
      },
    ],
  },
  certifications: {
    label: "Diplômes & certifications",
    items: [
      {
        title: "Certification professionnelle — Niveau 6",
        issuer: "Cloud Campus",
        period: "2022 — 2024",
      },
    ],
  },
  contact: {
    label: "05 — Contact",
    title: "Un projet, une opportunité ou simplement envie d’échanger ?",
    channels: [
      { label: "LinkedIn", href: links.linkedin, kind: "external" },
      { label: "GitHub", href: links.github, kind: "external" },
      { label: "CV — PDF", href: links.cv, kind: "download" },
    ],
    responseTime: "Réponse sous 48 h",
    form: {
      name: "Nom",
      email: "Email",
      message: "Message",
      privacy: "Vos données servent uniquement à vous répondre.",
      submit: "Envoyer le message",
      submitting: "Envoi en cours…",
      errors: {
        required: "Ce champ est requis.",
        too_short: "Ce champ est trop court.",
        too_long: "Ce champ est trop long.",
        invalid_email: "Adresse email invalide.",
      },
      failure: `L’envoi a échoué. Réessayez ou écrivez-moi directement à ${email}.`,
      sentLabel: "Message envoyé",
      sentTitle: "Merci — je reviens vers vous très vite.",
    },
  },
  footer: {
    copyright: "© 2026 Enzo AIME",
    credit: "Conçu et développé par mes soins",
    backToTop: "Retour en haut",
  },
};
