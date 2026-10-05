import { caseStudyChromeEn, creneoEn, webcmsEn } from "./case-studies/en.js";
import type { SiteContent } from "./types.js";

const email = "enzo.aime91@gmail.com";
const links = {
  cv: "/cv/prenom-nom-resume.pdf",
  linkedin: "https://www.linkedin.com/in/prenom-nom",
  github: "https://github.com/prenom-nom",
};

export const en: SiteContent = {
  caseStudyChrome: caseStudyChromeEn,
  caseStudies: { creneo: creneoEn, webcms: webcmsEn },
  meta: {
    title: "Enzo AIME — Full-Stack Developer",
    description:
      "Full-Stack developer based near Évry-Courcouronnes, focused on modern, fast and well-structured web applications.",
    ogLocale: "en_US",
  },
  person: {
    fullName: "Enzo AIME",
    titleLines: ["Enzo", "AIME"],
    initials: "EA",
    email,
  },
  links,
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    language: "Language",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    switchToLocale: { fr: "Afficher en français", en: "View in English" },
  },
  nav: {
    items: [
      { id: "accueil", label: "Home" },
      { id: "projets", label: "Work" },
      { id: "apropos", label: "About" },
      { id: "parcours", label: "Journey" },
      { id: "contact", label: "Contact" },
    ],
    themeNames: { dark: "Dark", light: "Light" },
    menuOpen: "Menu",
    menuClose: "Close",
    menuTitle: "Navigation",
    menuFooter: [email, "Évry-Courcouronnes — available"],
  },
  hero: {
    ariaLabel: "Introduction",
    meta: ["Full-Stack Developer", "24 y/o", "Évry-Courcouronnes area, France"],
    lead: "I build complete web applications, from the first idea to deployment.",
    description:
      "Full-Stack developer based near Évry-Courcouronnes, focused on modern, fast and well-structured web applications.",
    ctaProjects: "See my work",
    ctaCv: "Download my resume",
    ctaContact: "Get in touch",
    availability: "Open to new opportunities — full-time",
    scrollHint: "Scroll",
    transitionLabel: "02 — Selected work",
    transitionTitle: ["Five layers.", "Two real products."],
    layers: [
      { number: "01", name: "Frontend", stack: "React · Next.js · TypeScript", mobileName: "Frontend", mobileStack: "React · TS" },
      { number: "02", name: "API", stack: "REST", mobileName: "API", mobileStack: "REST" },
      { number: "03", name: "Backend", stack: "Node.js · NestJS", mobileName: "Backend", mobileStack: "Node · Nest" },
      { number: "04", name: "Database", stack: "PostgreSQL", mobileName: "Data", mobileStack: "PostgreSQL" },
      { number: "05", name: "DevOps", stack: "Docker · GitLab CI", mobileName: "DevOps", mobileStack: "Docker · CI" },
    ],
    portrait: {
      image: {
        src: "/images/portrait.png",
        alt: "Portrait of Enzo AIME",
        width: 1145,
        height: 1374,
      },
      placeholder: "Portrait — neutral background, head and shoulders, side light",
    },
    mobile: {
      meta: ["Full-Stack", "24 y/o", "Évry-Courcouronnes"],
      description: "Full-Stack developer focused on modern, fast and well-structured web applications.",
      availability: "Available — full-time",
    },
  },
  projects: {
    label: "02 — Selected work",
    summary: "2 live · 1 in progress",
    featured: {
      slug: "creneo",
      number: "01",
      meta: ["Main project", "SaaS · Booking", "2025"],
      title: "Créneo",
      description:
        "A SaaS platform that lets beauty salons manage their calendar, services and online booking — designed, built and deployed end to end.",
      details: [
        { term: "Role", value: "Design, front end, back end, deployment" },
        {
          term: "Stack",
          value: "React · TypeScript · Node.js · Express · MongoDB · Docker · Nginx · GitLab CI",
        },
      ],
      caseStudyCta: "Read the case study",
      demo: { label: "Live demo", href: "https://creneo.example.com" },
      repository: { label: "Code on GitHub", href: "https://github.com/prenom-nom/creneo" },
      media: { placeholder: "Créneo screenshot — salon calendar (desktop, 1600×1000)" },
      mobileMedia: { placeholder: "Mobile booking" },
    },
    secondary: {
      slug: "webcms",
      number: "02",
      meta: ["Work-study", "Internal application"],
      title: "WebCMS",
      subtitle: "Arianespace",
      description:
        "Digitising and managing business processes in a demanding industrial environment: evolving, maintaining and hardening an existing application.",
      details: [
        { term: "Period", value: "2024 — 2026" },
        { term: "Role", value: "Full-Stack developer (work-study)" },
        { term: "Scope", value: "Processes, SIPOC, imports, audit, administration" },
        { term: "Environment", value: "React · TypeScript · Node.js · SSO / LDAP" },
      ],
      caseStudyCta: "Read the case study",
      media: { placeholder: "Anonymised WebCMS screenshot — process tree view" },
      captions: ["Anonymised interface — sample data", "Private codebase"],
    },
    upcoming: {
      number: "03",
      title: "New project",
      status: "In progress — coming soon",
    },
  },
  about: {
    label: "03 — About",
    text: {
      before: "Junior Full-Stack developer, I enjoy turning a concrete need into an application that is ",
      highlight: "clear, robust and pleasant to use.",
      after: " I care as much about user experience as about architecture and code quality.",
    },
    facts: ["24 y/o", "Évry-Courcouronnes area", "French · English"],
    cvLink: "Resume (PDF)",
  },
  skills: {
    label: "Skills",
    intro: "The same layers as the hero architecture — each one used on a real project.",
    groups: [
      { number: "01", name: "Frontend", items: "TypeScript, React, Next.js, Tailwind CSS" },
      { number: "02", name: "Backend", items: "Node.js, NestJS, Express, REST" },
      { number: "03", name: "Data", items: "PostgreSQL, MongoDB, Prisma" },
      { number: "04", name: "DevOps", items: "Docker, Git, GitLab CI, Nginx" },
    ],
  },
  journey: {
    label: "04 — Journey",
    titleLines: ["Four years,", "one trajectory."],
    steps: [
      { period: "2022", title: "First projects and web development" },
      { period: "2022 — 2024", title: "Level 6 certification — Cloud Campus" },
      {
        period: "2024 — 2026",
        title: "Full-Stack developer, work-study — Arianespace",
        caseStudy: { slug: "webcms", label: "See the WebCMS case study" },
      },
      {
        period: "Today",
        title: "Personal projects and new professional opportunities",
        current: true,
      },
    ],
  },
  certifications: {
    label: "Degrees & certifications",
    items: [
      {
        title: "Professional certification — Level 6 (bachelor’s equivalent)",
        issuer: "Cloud Campus",
        period: "2022 — 2024",
      },
    ],
  },
  contact: {
    label: "05 — Contact",
    title: "A project, an opportunity, or just want to talk?",
    channels: [
      { label: "LinkedIn", href: links.linkedin, kind: "external" },
      { label: "GitHub", href: links.github, kind: "external" },
      { label: "Resume — PDF", href: links.cv, kind: "download" },
    ],
    responseTime: "Reply within 48 h",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      privacy: "Your details are only used to reply to you.",
      submit: "Send message",
      submitting: "Sending…",
      errors: {
        required: "This field is required.",
        too_short: "This field is too short.",
        too_long: "This field is too long.",
        invalid_email: "Invalid email address.",
      },
      failure: `Sending failed. Try again or email me directly at ${email}.`,
      sentLabel: "Message sent",
      sentTitle: "Thank you — I’ll get back to you very soon.",
    },
  },
  footer: {
    copyright: "© 2026 Enzo AIME",
    credit: "Designed and built by me",
    backToTop: "Back to top",
  },
};
