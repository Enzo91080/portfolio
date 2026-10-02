import type { ContactErrorCode } from "@portfolio/contracts";

export type SectionId = "accueil" | "projets" | "apropos" | "parcours" | "contact";
export type ProjectSlug = "creneo" | "webcms";

export interface ExternalLink {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A visual slot: real image when available, described placeholder until then. */
export interface Media {
  image?: ImageAsset;
  placeholder: string;
}

export interface Term {
  term: string;
  value: string;
}

export interface HeroLayer {
  number: string;
  name: string;
  stack: string;
  mobileName: string;
  mobileStack: string;
}

export interface TitledText {
  title: string;
  body: string;
}

/** Labels shared by every case study page. */
export interface CaseStudyChrome {
  backLabel: string;
  counter: string;
  nextLabel: string;
  tocLabel: string;
}

interface CaseStudyBase {
  slug: ProjectSlug;
  number: string;
  meta: string[];
  seo: { title: string; description: string };
  next: { slug: ProjectSlug; title: string };
}

export interface CreneoCaseStudy extends CaseStudyBase {
  kind: "product";
  title: string;
  lead: string;
  stack: string;
  demo: ExternalLink;
  repository: ExternalLink;
  heroMedia: Media;
  facts: Term[];
  status: Term;
  context: { label: string; title: string; body: string };
  solution: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    items: TitledText[];
  };
  features: {
    label: string;
    agenda: TitledText & { media: Media };
    booking: TitledText & { media: [Media, Media, Media] };
    services: TitledText & { media: Media };
    clients: TitledText & { media: Media };
  };
  architecture: {
    label: string;
    title: string;
    body: string;
    runtimeTag: string;
    proxyTag: string;
    layers: { name: string; detail: string }[];
    pipelineLabel: string;
    pipeline: string[];
  };
  decisions: { label: string; items: Term[] };
  challenges: { label: string; title: string; items: TitledText[] };
  gallery: { label: string; wide: Media; items: Media[] };
  outcome: { label: string; items: TitledText[] };
}

export interface WebcmsCaseStudy extends CaseStudyBase {
  kind: "institutional";
  title: string;
  subtitle: string;
  lead: string;
  facts: Term[];
  confidentiality: Term;
  heroMedia: Media;
  context: { navLabel: string; label: string; title: string; points: string[] };
  role: { navLabel: string; label: string; items: { tag: string; title: string }[] };
  features: {
    navLabel: string;
    label: string;
    items: string[];
    figures: { media: Media; caption: string }[];
  };
  architecture: {
    navLabel: string;
    label: string;
    nodes: string[];
    highlighted: number;
    note: string;
  };
  problems: {
    navLabel: string;
    label: string;
    headers: [string, string, string];
    rows: { problem: string; analysis: string; solution: string }[];
  };
  environment: { navLabel: string; label: string; items: string[] };
  learnings: { navLabel: string; label: string; items: TitledText[] };
}

export type CaseStudy = CreneoCaseStudy | WebcmsCaseStudy;

export interface SiteContent {
  caseStudyChrome: CaseStudyChrome;
  caseStudies: { creneo: CreneoCaseStudy; webcms: WebcmsCaseStudy };
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  person: {
    fullName: string;
    titleLines: [string, string];
    initials: string;
    email: string;
  };
  links: {
    cv: string;
    linkedin: string;
    github: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    language: string;
    themeToLight: string;
    themeToDark: string;
    switchToLocale: Record<"fr" | "en", string>;
  };
  nav: {
    items: { id: SectionId; label: string }[];
    themeNames: { dark: string; light: string };
    menuOpen: string;
    menuClose: string;
    menuTitle: string;
    menuFooter: string[];
  };
  hero: {
    ariaLabel: string;
    meta: string[];
    lead: string;
    description: string;
    ctaProjects: string;
    ctaCv: string;
    ctaContact: string;
    availability: string;
    scrollHint: string;
    transitionLabel: string;
    transitionTitle: [string, string];
    layers: HeroLayer[];
    portrait: Media;
    mobile: {
      meta: string[];
      description: string;
      availability: string;
    };
  };
  projects: {
    label: string;
    summary: string;
    featured: {
      slug: ProjectSlug;
      number: string;
      meta: string[];
      title: string;
      description: string;
      details: Term[];
      caseStudyCta: string;
      demo: ExternalLink;
      repository: ExternalLink;
      media: Media;
      mobileMedia: Media;
    };
    secondary: {
      slug: ProjectSlug;
      number: string;
      meta: string[];
      title: string;
      subtitle: string;
      description: string;
      details: Term[];
      caseStudyCta: string;
      media: Media;
      captions: [string, string];
    };
    upcoming: {
      number: string;
      title: string;
      status: string;
    };
  };
  about: {
    label: string;
    text: { before: string; highlight: string; after: string };
    facts: string[];
    cvLink: string;
  };
  skills: {
    label: string;
    intro: string;
    groups: { number: string; name: string; items: string }[];
  };
  journey: {
    label: string;
    titleLines: [string, string];
    steps: {
      period: string;
      title: string;
      current?: boolean;
      caseStudy?: { slug: ProjectSlug; label: string };
    }[];
  };
  certifications: {
    label: string;
    items: { title: string; issuer: string; period: string }[];
  };
  contact: {
    label: string;
    title: string;
    channels: { label: string; href: string; kind: "external" | "download" }[];
    responseTime: string;
    form: {
      name: string;
      email: string;
      message: string;
      privacy: string;
      submit: string;
      submitting: string;
      errors: Record<ContactErrorCode, string>;
      failure: string;
      sentLabel: string;
      sentTitle: string;
    };
  };
  footer: {
    copyright: string;
    credit: string;
    backToTop: string;
  };
}
