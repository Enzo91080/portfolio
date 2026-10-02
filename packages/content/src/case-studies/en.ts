import type { CaseStudyChrome, CreneoCaseStudy, WebcmsCaseStudy } from "../types.js";

export const caseStudyChromeEn: CaseStudyChrome = {
  backLabel: "Back to work",
  counter: "Case study",
  nextLabel: "Next project",
  tocLabel: "Contents",
};

export const creneoEn: CreneoCaseStudy = {
  kind: "product",
  slug: "creneo",
  number: "01",
  meta: ["Main project", "B2B2C SaaS", "2025"],
  seo: {
    title: "Créneo — Case study · Enzo AIME",
    description:
      "Créneo, a SaaS platform for salon calendars and online booking: context, architecture, technical decisions and outcome.",
  },
  next: { slug: "webcms", title: "WebCMS" },
  title: "Créneo",
  lead: "The platform that lets salons run their calendar and lets their clients book online in seconds.",
  stack: "React · TypeScript · Node.js · Express · MongoDB · Docker · Nginx · GitLab CI · SonarCloud",
  demo: { label: "View the demo", href: "https://creneo.example.com" },
  repository: { label: "View on GitHub", href: "https://github.com/prenom-nom/creneo" },
  heroMedia: { placeholder: "Main screenshot — salon dashboard (2400×1350)" },
  facts: [
    { term: "Role", value: "Sole developer — product, UX, front end, back end, ops" },
    { term: "Users", value: "Salon owners, staff, clients" },
    { term: "Platforms", value: "Desktop back office, mobile booking" },
  ],
  status: { term: "Status", value: "Live" },
  context: {
    label: "01 — Context",
    title: "A paper diary, a phone ringing during treatments, lost time slots.",
    body: "Small salons still often manage appointments by hand. Existing tools are built for large chains: expensive, complex, poorly suited to a team of two or three. The need: a reliable shared calendar, and online booking that clients actually use.",
  },
  solution: {
    label: "02 — Solution",
    titleBefore: "Two interfaces, ",
    titleHighlight: "one source of truth.",
    items: [
      {
        title: "Salon back office",
        body: "Per-staff calendar, services, opening hours, clients and history — designed to be used between two treatments.",
      },
      {
        title: "Client booking",
        body: "Pick a service, a slot and confirm in three steps, with no mandatory account.",
      },
    ],
  },
  features: {
    label: "03 — Key features",
    agenda: {
      title: "Shared calendar",
      body: "Day / week view per staff member, drag-and-drop appointments, real-time conflict detection.",
      media: { placeholder: "Week calendar — multi-staff view" },
    },
    booking: {
      title: "Online booking",
      body: "Slots computed from opening hours, service durations and actual availability.",
      media: [
        { placeholder: "Mobile — services" },
        { placeholder: "Mobile — time slots" },
        { placeholder: "Mobile — confirmation" },
      ],
    },
    services: {
      title: "Services & team",
      body: "Catalogue, durations, prices and each staff member’s skills.",
      media: { placeholder: "Services & team" },
    },
    clients: {
      title: "Client records",
      body: "Visit history, internal notes, automatic reminders.",
      media: { placeholder: "Client records & history" },
    },
  },
  architecture: {
    label: "04 — Technical architecture",
    title: "Four layers, one pipeline.",
    body: "Each layer runs in its own container. Nginx serves the front end and proxies the API; every merge request goes through tests and SonarCloud analysis before deployment.",
    runtimeTag: "Docker Compose",
    proxyTag: "Nginx — reverse proxy · HTTPS",
    layers: [
      { name: "Frontend", detail: "React · TypeScript · SPA" },
      { name: "API", detail: "REST · JWT · input validation" },
      { name: "Backend", detail: "Node.js · Express · business services" },
      { name: "Database", detail: "MongoDB · indexes on slots" },
    ],
    pipelineLabel: "CI/CD — GitLab",
    pipeline: ["lint", "tests", "SonarCloud", "build images", "deploy"],
  },
  decisions: {
    label: "05 — Technical decisions",
    items: [
      {
        term: "React + TypeScript",
        value: "Shared model types (appointments, services) to avoid inconsistencies between screens.",
      },
      {
        term: "Express",
        value: "A minimal base, structured as routes / controllers / services to keep business logic testable.",
      },
      {
        term: "MongoDB",
        value: "Services whose attributes vary from salon to salon; a document model is more flexible early on.",
      },
      {
        term: "Docker + Nginx",
        value: "Identical environments locally and in production, HTTPS and caching handled in one place.",
      },
      {
        term: "GitLab CI + SonarCloud",
        value: "No deployment without green tests and a passed quality gate.",
      },
    ],
  },
  challenges: {
    label: "06 — Challenges",
    title: "What took the most thinking.",
    items: [
      {
        title: "Authentication",
        body: "Short-lived JWT + refresh token in an httpOnly cookie, revoked on logout.",
      },
      {
        title: "Roles",
        body: "Owner, staff, client: permissions checked by the API, never only in the interface.",
      },
      {
        title: "Data & slots",
        body: "Preventing two simultaneous bookings of the same slot.",
      },
      {
        title: "Full-Stack architecture",
        body: "Clearly separating front end, API and services so each layer can evolve on its own.",
      },
      {
        title: "Quality & tests",
        body: "Unit tests on availability computation, integration tests on the API.",
      },
      {
        title: "Deployment",
        body: "Reproducible pipeline, isolated environment variables, rollback available.",
      },
    ],
  },
  gallery: {
    label: "07 — Gallery",
    wide: { placeholder: "Wide view — today’s calendar" },
    items: [
      { placeholder: "Detail — appointment" },
      { placeholder: "Salon settings" },
      { placeholder: "Statistics" },
    ],
  },
  outcome: {
    label: "08 — Outcome",
    items: [
      {
        title: "What I built",
        body: "A complete, deployed product: two interfaces, a secured API, a quality pipeline.",
      },
      {
        title: "What I learned",
        body: "Scoping a product, modelling business rules, automating what repeats.",
      },
      {
        title: "What it shows",
        body: "The ability to take an application from idea to production, alone and with rigour.",
      },
    ],
  },
};

export const webcmsEn: WebcmsCaseStudy = {
  kind: "institutional",
  slug: "webcms",
  number: "02",
  meta: ["Professional case study", "Work-study"],
  seo: {
    title: "WebCMS — Arianespace · Case study · Enzo AIME",
    description:
      "WebCMS at Arianespace: digitising and managing business processes during a work-study programme. Role, features, problems and solutions.",
  },
  next: { slug: "creneo", title: "Créneo" },
  title: "WebCMS",
  subtitle: "— Arianespace",
  lead: "Digitising and managing business processes during my work-study programme.",
  facts: [
    { term: "Organisation", value: "Arianespace" },
    { term: "Period", value: "2024 — 2026 · work-study" },
    { term: "Type", value: "Existing internal application" },
    { term: "Role", value: "Full-Stack developer" },
  ],
  confidentiality: { term: "Confidentiality", value: "Private codebase · anonymised screenshots" },
  heroMedia: {
    placeholder: "Anonymised screenshot — process view (sample data) or substitute diagram",
  },
  context: {
    navLabel: "Context",
    label: "01 — Project context",
    title: "An internal application in production, used daily by business teams.",
    points: [
      "Real professional environment, established team",
      "Strong business constraints and domain vocabulary",
      "Security requirements: SSO, directory, fine-grained rights",
      "Maintaining and evolving an existing codebase",
    ],
  },
  role: {
    navLabel: "My role",
    label: "02 — My role",
    items: [
      { tag: "Front", title: "Front-end development" },
      { tag: "Back", title: "Back-end development" },
      { tag: "Product", title: "Feature evolution" },
      { tag: "Reliability", title: "Bug fixing" },
      { tag: "UX", title: "UX/UI improvements" },
      { tag: "Quality", title: "Tests & deployment" },
    ],
  },
  features: {
    navLabel: "Features",
    label: "03 — Features worked on",
    items: [
      "Process management",
      "Tree structure",
      "SIPOC",
      "Stakeholder management",
      "Data imports",
      "Audit log",
      "Administration",
      "Authentication",
      "UX/UI evolutions",
    ],
    figures: [
      {
        media: { placeholder: "Tree structure — sample data" },
        caption: "Fig. 1 — Process tree",
      },
      {
        media: { placeholder: "Import — validation screen" },
        caption: "Fig. 2 — Import and validation",
      },
    ],
  },
  architecture: {
    navLabel: "Architecture",
    label: "04 — Architecture (simplified)",
    nodes: ["Users", "SSO / LDAP", "Frontend", "API", "Backend", "Data"],
    highlighted: 1,
    note: "Deliberately generic view: no server, flow or internal data name is exposed.",
  },
  problems: {
    navLabel: "Problems & solutions",
    label: "05 — Problems & solutions",
    headers: ["Problem", "Analysis", "Solution"],
    rows: [
      {
        problem: "Complex business data",
        analysis: "Nested relations between processes, stakeholders and documents.",
        solution: "Models clarified with users, types shared between front and back end.",
      },
      {
        problem: "Front / back consistency",
        analysis: "Rules duplicated and diverging from one screen to another.",
        solution: "Validation centralised in the API, explicit errors surfaced in the interface.",
      },
      {
        problem: "User rights",
        analysis: "Roles from the directory, different scopes per team.",
        solution: "Access control checked on every request, sensitive actions logged.",
      },
      {
        problem: "Data import",
        analysis: "Heterogeneous files, errors found too late.",
        solution: "Row-by-row pre-validation with a report before saving.",
      },
      {
        problem: "Business UX",
        analysis: "Dense screens, long paths for frequent tasks.",
        solution: "Field feedback, simpler forms, clear empty states and messages.",
      },
      {
        problem: "Legacy maintenance",
        analysis: "Inherited, sparsely documented code.",
        solution: "Methodical reading, tests before refactoring, documentation along the way.",
      },
    ],
  },
  environment: {
    navLabel: "Environment",
    label: "06 — Professional environment",
    items: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "GitLab CI", "Nginx", "SSO", "LDAP", "Tests"],
  },
  learnings: {
    navLabel: "Takeaways",
    label: "07 — What I took away",
    items: [
      { title: "Teamwork", body: "Code reviews, shared conventions, collective prioritisation." },
      { title: "Existing project", body: "Understand before changing, evolve without breaking." },
      { title: "Business constraints", body: "Turning a real process into application rules." },
      { title: "Communication", body: "Gathering needs and explaining choices to users." },
    ],
  },
};
