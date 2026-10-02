import type { SiteContent } from "@portfolio/content";
import { MediaFrame } from "@/components/primitives/media-frame";
import { MetaList } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Projects = SiteContent["projects"];

/** Asymmetric compositions, no card grid: Créneo as a product poster, WebCMS institutional. */
export function ProjectsSection({ projects }: { projects: Projects }) {
  return (
    <section
      id="projets"
      aria-labelledby="projets-title"
      className="container-site pb-[clamp(64px,8vw,120px)] pt-[clamp(64px,10vw,140px)]"
    >
      <div className="flex items-baseline justify-between gap-4 border-t border-line-strong pt-4 font-mono text-[12px] text-muted">
        <h2 id="projets-title" className="font-normal">
          {projects.label}
        </h2>
        <span>{projects.summary}</span>
      </div>

      <FeaturedProject project={projects.featured} />
      <SecondaryProject project={projects.secondary} />
      <UpcomingProject project={projects.upcoming} />
    </section>
  );
}

function FeaturedProject({ project }: { project: Projects["featured"] }) {
  const titleId = `t-${project.slug}`;
  return (
    <Reveal as="article" aria-labelledby={titleId} className="mt-[clamp(48px,7vw,96px)]">
      <MetaList accentFirst={project.number} items={project.meta} />
      <h3
        id={titleId}
        className="pointer-events-none relative z-[2] mt-2 font-display text-[length:clamp(84px,17vw,264px)] font-extrabold leading-[0.8] tracking-[-0.06em]"
      >
        {project.title}
      </h3>

      <div className="relative ml-auto mt-[clamp(-64px,-3.6vw,-20px)] w-[min(100%,80%)]">
        <MediaFrame
          media={project.media}
          sizes="(min-width: 1440px) 1024px, 80vw"
          lift
          className="aspect-[16/10] rounded-[10px]"
        />
        <MediaFrame
          media={project.mobileMedia}
          sizes="190px"
          className="absolute -bottom-12 left-[clamp(-120px,-6vw,-12px)] z-[3] aspect-[9/19] w-[clamp(96px,13vw,190px)] rounded-[18px] border-line-strong shadow-[var(--shadow-float)]"
        />
      </div>

      <div className="mt-[clamp(80px,8vw,112px)] flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-10 pl-[clamp(0px,14vw,220px)]">
        <p className="flex-[2_1_320px] text-pretty font-display text-[length:clamp(20px,1.8vw,26px)] font-medium leading-[1.35] tracking-[-0.015em]">
          {project.description}
        </p>
        <dl className="grid flex-[1_1_200px] content-start gap-3.5 text-[14px]">
          {project.details.map((detail) => (
            <div key={detail.term}>
              <dt className="font-mono text-[11px] text-muted">{detail.term}</dt>
              <dd className="mt-0.5">{detail.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-[1_1_200px] flex-col items-start gap-1">
          <Button asChild>
            <Link href={{ pathname: "/projets/[slug]", params: { slug: project.slug } }}>
              {project.caseStudyCta} <span aria-hidden="true">→</span>
            </Link>
          </Button>
          <a href={project.demo.href} className="pb-1 pt-3 text-[15px]">
            {project.demo.label} <span aria-hidden="true">↗</span>
          </a>
          <a href={project.repository.href} className="py-1 text-[15px]">
            {project.repository.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function SecondaryProject({ project }: { project: Projects["secondary"] }) {
  const titleId = `t-${project.slug}`;
  const lastDetail = project.details.length - 1;
  return (
    <Reveal
      as="article"
      aria-labelledby={titleId}
      className="mt-[clamp(96px,12vw,180px)] flex flex-wrap-reverse gap-x-[clamp(32px,5vw,80px)] gap-y-12 border-t border-line pt-8"
    >
      <div className="flex flex-[5_1_340px] flex-col">
        <MetaList accentFirst={project.number} items={project.meta} />
        <h3
          id={titleId}
          className="mt-5 font-display text-[length:clamp(48px,5.4vw,80px)] font-bold leading-[0.95] tracking-[-0.045em]"
        >
          {project.title}
          <span className="mt-2.5 block text-[0.42em] font-medium tracking-[-0.02em] text-muted">
            {project.subtitle}
          </span>
        </h3>
        <p className="mt-6 max-w-[44ch] text-pretty text-[16px] text-muted">{project.description}</p>
        <dl className="mt-8 text-[14px]">
          {project.details.map((detail, index) => (
            <div
              key={detail.term}
              className={cn(
                "grid grid-cols-[120px_1fr] gap-4 border-t border-line py-3",
                index === lastDetail && "border-b",
              )}
            >
              <dt className="font-mono text-[11.5px] text-muted">{detail.term}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <Button asChild variant="outline" className="mt-8 self-start">
          <Link href={{ pathname: "/projets/[slug]", params: { slug: project.slug } }}>
            {project.caseStudyCta} <span aria-hidden="true">→</span>
          </Link>
        </Button>
      </div>

      <div className="flex-[7_1_420px]">
        <MediaFrame
          media={project.media}
          sizes="(min-width: 1100px) 55vw, 100vw"
          lift
          className="aspect-[16/10] rounded-[4px]"
        />
        <div className="mt-3 flex justify-between gap-4 font-mono text-[11px] text-muted">
          <span>{project.captions[0]}</span>
          <span>{project.captions[1]}</span>
        </div>
      </div>
    </Reveal>
  );
}

function UpcomingProject({ project }: { project: Projects["upcoming"] }) {
  return (
    <div className="mt-[clamp(72px,9vw,128px)] flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-dashed border-line-strong py-6">
      <span className="font-mono text-[12px] text-muted">{project.number}</span>
      <span className="font-display text-[22px] font-semibold tracking-[-0.02em]">{project.title}</span>
      <span className="text-[15px] text-muted">{project.status}</span>
    </div>
  );
}
