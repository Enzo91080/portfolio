import type { CaseStudyChrome, CreneoCaseStudy, WebcmsCaseStudy } from "../types.js";

export const caseStudyChromeFr: CaseStudyChrome = {
  backLabel: "Retour aux projets",
  counter: "Étude de cas",
  nextLabel: "Projet suivant",
  tocLabel: "Sommaire",
};

export const creneoFr: CreneoCaseStudy = {
  kind: "product",
  slug: "creneo",
  number: "01",
  meta: ["Projet principal", "SaaS B2B2C", "2025"],
  seo: {
    title: "Créneo — Étude de cas · Enzo AIME",
    description:
      "Créneo, plateforme SaaS de gestion d’agenda et de réservation en ligne pour les instituts : contexte, architecture, choix techniques et résultats.",
  },
  next: { slug: "webcms", title: "WebCMS" },
  title: "Créneo",
  lead: "La plateforme qui permet aux instituts de gérer leur agenda et à leurs clientes de réserver en ligne, en quelques secondes.",
  stack: "React · TypeScript · Node.js · Express · MongoDB · Docker · Nginx · GitLab CI · SonarCloud",
  demo: { label: "Voir la démo", href: "https://creneo.example.com" },
  repository: { label: "Voir GitHub", href: "https://github.com/prenom-nom/creneo" },
  heroMedia: { placeholder: "Capture principale — tableau de bord de l’institut (2400×1350)" },
  facts: [
    { term: "Rôle", value: "Seul développeur — produit, UX, front, back, ops" },
    { term: "Utilisateurs", value: "Gérantes, employées, clientes" },
    { term: "Plateformes", value: "Back-office desktop, réservation mobile" },
  ],
  status: { term: "Statut", value: "En ligne" },
  context: {
    label: "01 — Contexte",
    title: "Un carnet papier, un téléphone qui sonne pendant les soins, des créneaux perdus.",
    body: "Les petits instituts gèrent encore souvent leurs rendez-vous à la main. Les outils existants sont pensés pour de grandes enseignes : chers, complexes, peu adaptés à une équipe de deux ou trois personnes. Le besoin : un agenda partagé fiable, et une réservation en ligne que les clientes utilisent vraiment.",
  },
  solution: {
    label: "02 — Solution",
    titleBefore: "Deux interfaces, ",
    titleHighlight: "une seule source de vérité.",
    items: [
      {
        title: "Back-office institut",
        body: "Agenda par employée, prestations, horaires, clientes et historique — pensé pour être utilisé entre deux soins.",
      },
      {
        title: "Réservation cliente",
        body: "Choix de la prestation, du créneau et confirmation en trois étapes, sans création de compte obligatoire.",
      },
    ],
  },
  features: {
    label: "03 — Fonctionnalités principales",
    agenda: {
      title: "Agenda partagé",
      body: "Vue jour / semaine par employée, glisser-déposer des rendez-vous, détection des conflits en temps réel.",
      media: { placeholder: "Agenda semaine — vue multi-employées" },
    },
    booking: {
      title: "Réservation en ligne",
      body: "Créneaux calculés à partir des horaires, de la durée des prestations et des disponibilités réelles.",
      media: [
        { placeholder: "Mobile — prestations" },
        { placeholder: "Mobile — créneaux" },
        { placeholder: "Mobile — confirmation" },
      ],
    },
    services: {
      title: "Prestations & équipe",
      body: "Catalogue, durées, tarifs et compétences de chaque employée.",
      media: { placeholder: "Prestations & équipe" },
    },
    clients: {
      title: "Fiches clientes",
      body: "Historique des visites, notes internes, rappels automatiques.",
      media: { placeholder: "Fiches clientes & historique" },
    },
  },
  architecture: {
    label: "04 — Architecture technique",
    title: "Quatre couches, un pipeline.",
    body: "Chaque couche tourne dans son conteneur. Nginx sert le front et relaie l’API ; chaque merge request passe par les tests et l’analyse SonarCloud avant déploiement.",
    runtimeTag: "Docker Compose",
    proxyTag: "Nginx — reverse proxy · HTTPS",
    layers: [
      { name: "Frontend", detail: "React · TypeScript · SPA" },
      { name: "API", detail: "REST · JWT · validation des entrées" },
      { name: "Backend", detail: "Node.js · Express · services métier" },
      { name: "Base de données", detail: "MongoDB · index sur créneaux" },
    ],
    pipelineLabel: "CI/CD — GitLab",
    pipeline: ["lint", "tests", "SonarCloud", "build images", "déploiement"],
  },
  decisions: {
    label: "05 — Choix techniques",
    items: [
      {
        term: "React + TypeScript",
        value: "Typage partagé des modèles (rendez-vous, prestations) pour éviter les incohérences entre écrans.",
      },
      {
        term: "Express",
        value: "Un socle minimal, structuré en routes / contrôleurs / services pour garder la logique métier testable.",
      },
      {
        term: "MongoDB",
        value: "Des prestations aux attributs variables selon l’institut ; un modèle document plus souple au démarrage.",
      },
      {
        term: "Docker + Nginx",
        value: "Environnements identiques en local et en production, HTTPS et cache gérés en un seul point.",
      },
      {
        term: "GitLab CI + SonarCloud",
        value: "Aucun déploiement sans tests verts ni quality gate validée.",
      },
    ],
  },
  challenges: {
    label: "06 — Challenges",
    title: "Ce qui a demandé le plus de réflexion.",
    items: [
      {
        title: "Authentification",
        body: "JWT à durée courte + refresh token en cookie httpOnly, révocation à la déconnexion.",
      },
      {
        title: "Gestion des rôles",
        body: "Gérante, employée, cliente : permissions vérifiées côté API, jamais seulement dans l’interface.",
      },
      {
        title: "Données & créneaux",
        body: "Empêcher deux réservations simultanées sur le même créneau.",
      },
      {
        title: "Architecture Full-Stack",
        body: "Séparer clairement front, API et services pour faire évoluer chaque couche seule.",
      },
      {
        title: "Qualité & tests",
        body: "Tests unitaires sur le calcul des disponibilités, tests d’intégration sur l’API.",
      },
      {
        title: "Déploiement",
        body: "Pipeline reproductible, variables d’environnement isolées, retour arrière possible.",
      },
    ],
  },
  gallery: {
    label: "07 — Galerie",
    wide: { placeholder: "Vue large — agenda du jour" },
    items: [
      { placeholder: "Détail — rendez-vous" },
      { placeholder: "Paramètres institut" },
      { placeholder: "Statistiques" },
    ],
  },
  outcome: {
    label: "08 — Résultat",
    items: [
      {
        title: "Ce que j’ai construit",
        body: "Un produit complet et déployé : deux interfaces, une API sécurisée, un pipeline qualité.",
      },
      {
        title: "Ce que j’ai appris",
        body: "Prioriser un périmètre, modéliser des règles métier, automatiser ce qui se répète.",
      },
      {
        title: "Ce que ça démontre",
        body: "La capacité à porter une application de l’idée à la production, seul et avec rigueur.",
      },
    ],
  },
};

export const webcmsFr: WebcmsCaseStudy = {
  kind: "institutional",
  slug: "webcms",
  number: "02",
  meta: ["Étude de cas professionnelle", "Alternance"],
  seo: {
    title: "WebCMS — Arianespace · Étude de cas · Enzo AIME",
    description:
      "WebCMS chez Arianespace : digitalisation et gestion de processus métier dans le cadre d’une alternance. Rôle, fonctionnalités, problèmes rencontrés et solutions.",
  },
  next: { slug: "creneo", title: "Créneo" },
  title: "WebCMS",
  subtitle: "— Arianespace",
  lead: "Digitalisation et gestion de processus métier dans le cadre de mon alternance.",
  facts: [
    { term: "Organisation", value: "Arianespace" },
    { term: "Période", value: "2024 — 2026 · alternance" },
    { term: "Type", value: "Application interne, existante" },
    { term: "Rôle", value: "Développeur Full-Stack" },
  ],
  confidentiality: { term: "Confidentialité", value: "Code non public · captures anonymisées" },
  heroMedia: {
    placeholder:
      "Capture anonymisée — vue processus (données fictives) ou schéma de remplacement",
  },
  context: {
    navLabel: "Contexte",
    label: "01 — Contexte du projet",
    title: "Une application interne en production, utilisée au quotidien par des équipes métier.",
    points: [
      "Environnement professionnel réel, équipe existante",
      "Contraintes métier fortes et vocabulaire spécifique",
      "Exigences de sécurité : SSO, annuaire, droits fins",
      "Maintenance et évolution d’un code déjà en place",
    ],
  },
  role: {
    navLabel: "Mon rôle",
    label: "02 — Mon rôle",
    items: [
      { tag: "Front", title: "Développement frontend" },
      { tag: "Back", title: "Développement backend" },
      { tag: "Produit", title: "Évolution de fonctionnalités" },
      { tag: "Fiabilité", title: "Correction de bugs" },
      { tag: "UX", title: "Amélioration UX/UI" },
      { tag: "Qualité", title: "Tests & déploiement" },
    ],
  },
  features: {
    navLabel: "Fonctionnalités",
    label: "03 — Fonctionnalités travaillées",
    items: [
      "Gestion des processus",
      "Arborescence",
      "SIPOC",
      "Gestion des acteurs",
      "Imports de données",
      "Journal d’audit",
      "Administration",
      "Authentification",
      "Évolutions UX/UI",
    ],
    figures: [
      {
        media: { placeholder: "Arborescence — données fictives" },
        caption: "Fig. 1 — Arborescence des processus",
      },
      {
        media: { placeholder: "Import — écran de validation" },
        caption: "Fig. 2 — Import et validation",
      },
    ],
  },
  architecture: {
    navLabel: "Architecture",
    label: "04 — Architecture (simplifiée)",
    nodes: ["Utilisateurs", "SSO / LDAP", "Frontend", "API", "Backend", "Données"],
    highlighted: 1,
    note: "Vue volontairement générique : aucun nom de serveur, de flux ou de donnée interne n’est exposé.",
  },
  problems: {
    navLabel: "Problèmes & solutions",
    label: "05 — Problèmes rencontrés & solutions apportées",
    headers: ["Problème", "Analyse", "Solution"],
    rows: [
      {
        problem: "Données métier complexes",
        analysis: "Relations imbriquées entre processus, acteurs et documents.",
        solution: "Modèles clarifiés avec les utilisateurs, typage partagé front/back.",
      },
      {
        problem: "Cohérence front / back",
        analysis: "Règles dupliquées et divergentes selon les écrans.",
        solution: "Validation centralisée côté API, erreurs explicites remontées à l’interface.",
      },
      {
        problem: "Droits utilisateurs",
        analysis: "Rôles issus de l’annuaire, périmètres différents par équipe.",
        solution: "Contrôle d’accès vérifié à chaque requête, actions sensibles tracées.",
      },
      {
        problem: "Import de données",
        analysis: "Fichiers hétérogènes, erreurs découvertes trop tard.",
        solution: "Pré-validation ligne par ligne avec rapport avant enregistrement.",
      },
      {
        problem: "Ergonomie métier",
        analysis: "Écrans denses, parcours longs pour des tâches fréquentes.",
        solution: "Retours terrain, simplification des formulaires, états vides et messages clairs.",
      },
      {
        problem: "Maintenance de l’existant",
        analysis: "Code hérité, peu documenté.",
        solution: "Lecture méthodique, tests avant refactor, documentation au fil de l’eau.",
      },
    ],
  },
  environment: {
    navLabel: "Environnement",
    label: "06 — Environnement professionnel",
    items: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "GitLab CI", "Nginx", "SSO", "LDAP", "Tests"],
  },
  learnings: {
    navLabel: "Apports",
    label: "07 — Apports de l’expérience",
    items: [
      { title: "Travail en équipe", body: "Revues de code, conventions partagées, priorisation collective." },
      { title: "Projet existant", body: "Comprendre avant de modifier, faire évoluer sans casser." },
      { title: "Contraintes métier", body: "Traduire un processus réel en règles applicatives." },
      { title: "Communication", body: "Recueillir les besoins et expliquer les choix aux utilisateurs." },
    ],
  },
};
