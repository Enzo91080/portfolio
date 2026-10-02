import type { WebcmsCaseStudy as WebcmsContent } from "@portfolio/content";
import { Fragment, type CSSProperties } from "react";
import { MediaFrame } from "@/components/primitives/media-frame";
import { MetaList } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

const LABEL = "font-mono text-[12px] font-normal text-muted";
const AUTO_GRID = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--min)),1fr))]";

/**
 * Professional case study: more institutional (4px radii, tables, index),
 * presentable without access to the private repository.
 */
export function WebcmsCaseStudy({ study, tocLabel }: { study: WebcmsContent; tocLabel: string }) {
  const sections = [
    { id: "w1", navLabel: study.context.navLabel },
    { id: "w2", navLabel: study.role.navLabel },
    { id: "w3", navLabel: study.features.navLabel },
    { id: "w4", navLabel: study.architecture.navLabel },
    { id: "w5", navLabel: study.problems.navLabel },
    { id: "w6", navLabel: study.environment.navLabel },
    { id: "w7", navLabel: study.learnings.navLabel },
  ];

  return (
    <>
      <Hero study={study} />

      <div className="container-site flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-12 pt-[clamp(80px,10vw,150px)]">
        <nav aria-label={tocLabel} className="hidden flex-[1_1_200px] min-[860px]:block">
          <ol className="sticky top-28 text-[14px] text-muted">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="flex gap-3.5 py-[7px]">
                  <span className="font-mono text-[11px]">{String(index + 1).padStart(2, "0")}</span>
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid min-w-0 flex-[4_1_560px] gap-[clamp(80px,10vw,140px)]">
          <Context context={study.context} />
          <Role role={study.role} />
          <Features features={study.features} />
          <Architecture architecture={study.architecture} />
          <Problems problems={study.problems} />
          <Environment environment={study.environment} />
          <Learnings learnings={study.learnings} />
        </div>
      </div>
    </>
  );
}

function Hero({ study }: { study: WebcmsContent }) {
  const rows = [...study.facts, study.confidentiality];
  const last = rows.length - 1;
  return (
    <section aria-labelledby="cs-title" className="container-site pt-[clamp(56px,8vw,112px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[clamp(32px,5vw,80px)] gap-y-12">
        <div>
          <MetaList accentFirst={study.number} items={study.meta} />
          <h1
            id="cs-title"
            className="mt-5 font-display text-[length:clamp(64px,9vw,144px)] font-bold leading-[0.88] tracking-[-0.05em]"
          >
            {study.title}
            <span className="mt-3.5 block text-[0.36em] font-medium tracking-[-0.025em] text-muted">
              {study.subtitle}
            </span>
          </h1>
          <p className="mt-8 max-w-[30ch] text-pretty font-display text-[length:clamp(20px,2vw,28px)] font-medium leading-[1.3] tracking-[-0.02em]">
            {study.lead}
          </p>
        </div>
        <dl className="text-[15px]">
          {rows.map((row, index) => (
            <div
              key={row.term}
              className={cn(
                "grid grid-cols-[130px_1fr] gap-4 border-t py-3.5",
                index === 0 ? "border-line-strong" : "border-line",
                index === last && "border-b border-b-line",
              )}
            >
              <dt className="pt-[3px] font-mono text-[11.5px] text-muted">{row.term}</dt>
              <dd className="flex items-center gap-2">
                {row === study.confidentiality ? (
                  <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full border border-accent" />
                ) : null}
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <MediaFrame
        media={study.heroMedia}
        sizes="(min-width: 1440px) 1280px, 92vw"
        className="mt-[clamp(56px,7vw,96px)] aspect-[16/8] rounded-[4px]"
      />
    </section>
  );
}

function Context({ context }: { context: WebcmsContent["context"] }) {
  return (
    <Reveal as="section" id="w1" aria-labelledby="w1-title" className="scroll-mt-24">
      <div className={LABEL}>{context.label}</div>
      <h2
        id="w1-title"
        className="mt-3.5 max-w-[24ch] text-balance font-display text-[length:clamp(28px,3.2vw,44px)] font-semibold leading-[1.12] tracking-[-0.035em]"
      >
        {context.title}
      </h2>
      <ul
        className={cn(AUTO_GRID, "mt-9 gap-x-10 text-[15.5px]")}
        style={{ "--min": "240px" } as CSSProperties}
      >
        {context.points.map((point) => (
          <li key={point} className="border-t border-line py-3.5">
            {point}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Role({ role }: { role: WebcmsContent["role"] }) {
  return (
    <Reveal as="section" id="w2" aria-labelledby="w2-title" className="scroll-mt-24">
      <h2 id="w2-title" className={LABEL}>
        {role.label}
      </h2>
      <ul
        className={cn(AUTO_GRID, "mt-6 gap-px border border-line bg-line")}
        style={{ "--min": "160px" } as CSSProperties}
      >
        {role.items.map((item) => (
          <li key={item.title} className="bg-bg p-5">
            <div className="font-mono text-[11px] text-accent">{item.tag}</div>
            <div className="mt-2 font-display text-[17px] font-semibold">{item.title}</div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Features({ features }: { features: WebcmsContent["features"] }) {
  return (
    <Reveal as="section" id="w3" aria-labelledby="w3-title" className="scroll-mt-24">
      <h2 id="w3-title" className={LABEL}>
        {features.label}
      </h2>
      <ol className="mt-6 columns-[2_260px] gap-x-10 font-display text-[length:clamp(20px,1.8vw,24px)] font-medium tracking-[-0.015em]">
        {features.items.map((item, index) => (
          <li key={item} className="flex break-inside-avoid items-baseline gap-4 border-t border-line py-3">
            <span className="font-mono text-[11px] text-muted">{String.fromCharCode(97 + index)}</span>
            {item}
          </li>
        ))}
      </ol>
      <div
        className={cn(AUTO_GRID, "mt-10 gap-5")}
        style={{ "--min": "280px" } as CSSProperties}
      >
        {features.figures.map((figure) => (
          <figure key={figure.caption}>
            <MediaFrame
              media={figure.media}
              sizes="(min-width: 1100px) 33vw, 100vw"
              className="aspect-[4/3] rounded-[4px]"
            />
            <figcaption className="mt-2.5 font-mono text-[11px] text-muted">{figure.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

function Architecture({ architecture }: { architecture: WebcmsContent["architecture"] }) {
  return (
    <Reveal as="section" id="w4" aria-labelledby="w4-title" className="scroll-mt-24">
      <h2 id="w4-title" className={LABEL}>
        {architecture.label}
      </h2>
      <div className="mt-6 rounded-[4px] border border-line bg-surface p-[clamp(24px,4vw,48px)]">
        <ol
          className={cn(AUTO_GRID, "gap-3 text-[14px]")}
          style={{ "--min": "120px" } as CSSProperties}
        >
          {architecture.nodes.map((node, index) => {
            const highlighted = index === architecture.highlighted;
            return (
              <li
                key={node}
                className={cn(
                  "rounded-[4px] border p-4",
                  highlighted ? "border-accent" : "border-line-strong",
                )}
              >
                <div className={cn("font-mono text-[10.5px]", highlighted ? "text-accent" : "text-muted")}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-1.5 font-display font-semibold">{node}</div>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 max-w-[60ch] text-[14px] text-muted">{architecture.note}</p>
      </div>
    </Reveal>
  );
}

function Problems({ problems }: { problems: WebcmsContent["problems"] }) {
  const columns = { "--min": "220px" } as CSSProperties;
  return (
    <Reveal as="section" id="w5" aria-labelledby="w5-title" className="scroll-mt-24">
      <h2 id="w5-title" className={LABEL}>
        {problems.label}
      </h2>
      <div role="table" aria-labelledby="w5-title" className="mt-6">
        <div role="rowgroup">
          <div
            role="row"
            className={cn(AUTO_GRID, "gap-x-8 gap-y-1 border-b border-line-strong py-2.5 font-mono text-[11px] text-muted")}
            style={columns}
          >
            {problems.headers.map((header) => (
              <span key={header} role="columnheader">
                {header}
              </span>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {problems.rows.map((row) => (
            <div
              key={row.problem}
              role="row"
              className={cn(AUTO_GRID, "gap-x-8 gap-y-2 border-b border-line py-5 text-[15px]")}
              style={columns}
            >
              <span role="rowheader" className="font-display text-[17px] font-semibold">
                {row.problem}
              </span>
              <span role="cell" className="text-muted">
                {row.analysis}
              </span>
              <span role="cell">{row.solution}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Environment({ environment }: { environment: WebcmsContent["environment"] }) {
  return (
    <Reveal as="section" id="w6" aria-labelledby="w6-title" className="scroll-mt-24">
      <h2 id="w6-title" className={LABEL}>
        {environment.label}
      </h2>
      <p className="mt-5 font-display text-[length:clamp(22px,2.4vw,32px)] font-medium leading-[1.5] tracking-[-0.02em]">
        {environment.items.map((item, index) => (
          <Fragment key={item}>
            {index > 0 ? <span className="text-muted"> / </span> : null}
            {item}
          </Fragment>
        ))}
      </p>
    </Reveal>
  );
}

function Learnings({ learnings }: { learnings: WebcmsContent["learnings"] }) {
  return (
    <Reveal as="section" id="w7" aria-labelledby="w7-title" className="scroll-mt-24">
      <h2 id="w7-title" className={LABEL}>
        {learnings.label}
      </h2>
      <div
        className={cn(AUTO_GRID, "mt-6 gap-x-10")}
        style={{ "--min": "240px" } as CSSProperties}
      >
        {learnings.items.map((item) => (
          <div key={item.title} className="border-t border-line-strong py-[18px]">
            <h3 className="font-display text-[19px] font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
