import type { CreneoCaseStudy as CreneoContent } from "@portfolio/content";
import { AvailabilityDot } from "@/components/primitives/availability";
import { MediaFrame } from "@/components/primitives/media-frame";
import { MetaList } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SplitRow } from "./split-row";

const H2 = "font-display text-[length:clamp(30px,3.6vw,52px)] font-semibold leading-[1.1] tracking-[-0.035em]";
const SECTION = "container-site pt-[clamp(96px,12vw,180px)]";

/** Product case study, presented like a real SaaS rather than a school project. */
export function CreneoCaseStudy({ study }: { study: CreneoContent }) {
  return (
    <>
      <Hero study={study} />
      <Context study={study} />
      <Features features={study.features} />
      <Architecture architecture={study.architecture} />
      <Decisions decisions={study.decisions} />
      <Challenges challenges={study.challenges} />
      <Gallery gallery={study.gallery} />
      <Outcome outcome={study.outcome} />
    </>
  );
}

function Hero({ study }: { study: CreneoContent }) {
  const facts = [...study.facts, study.status];
  return (
    <>
      <section aria-labelledby="cs-title" className="container-site pt-[clamp(56px,8vw,112px)]">
        <MetaList accentFirst={study.number} items={study.meta} />
        <h1
          id="cs-title"
          className="mt-3 font-display text-[length:clamp(88px,19vw,300px)] font-extrabold leading-[0.8] tracking-[-0.06em]"
        >
          {study.title}
        </h1>
        <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-end gap-x-[clamp(32px,5vw,80px)] gap-y-8">
          <p className="max-w-[34ch] flex-[2_1_380px] text-pretty font-display text-[length:clamp(22px,2.2vw,32px)] font-medium leading-[1.3] tracking-[-0.02em]">
            {study.lead}
          </p>
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <div className="font-mono text-[12px] leading-[1.9] text-muted">{study.stack}</div>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <a href={study.demo.href}>
                  {study.demo.label} <span aria-hidden="true">↗</span>
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={study.repository.href}>
                  {study.repository.label} <span aria-hidden="true">↗</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-[clamp(48px,6vw,88px)] max-w-[1600px] px-[clamp(12px,2vw,32px)]">
        <MediaFrame
          media={study.heroMedia}
          sizes="(min-width: 1600px) 1536px, 96vw"
          className="aspect-[16/9] rounded-[12px]"
        />
      </div>

      <section className="container-site pt-10">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-6 text-[15px]">
          {facts.map((fact) => (
            <div key={fact.term} className="border-t border-line-strong pt-3">
              <dt className="font-mono text-[11px] text-muted">{fact.term}</dt>
              <dd className="mt-1 flex items-center gap-2">
                {fact === study.status ? <AvailabilityDot /> : null}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function Context({ study }: { study: CreneoContent }) {
  const { context, solution } = study;
  return (
    <section className={cn(SECTION, "grid gap-[clamp(72px,9vw,140px)]")}>
      <Reveal>
        <SplitRow label={context.label}>
          <h2 className={cn(H2, "text-balance")}>{context.title}</h2>
          <p className="mt-6 max-w-[62ch] text-pretty text-[17px] text-muted">{context.body}</p>
        </SplitRow>
      </Reveal>
      <Reveal>
        <SplitRow label={solution.label}>
          <h2 className={cn(H2, "text-balance")}>
            {solution.titleBefore}
            <span className="text-accent">{solution.titleHighlight}</span>
          </h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-12 gap-y-8">
            {solution.items.map((item) => (
              <div key={item.title} className="border-t border-line-strong pt-4">
                <h3 className="font-display text-[20px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[15.5px] text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </SplitRow>
      </Reveal>
    </section>
  );
}

function FeatureText({
  letter,
  title,
  body,
  size = "lg",
}: {
  letter: string;
  title: string;
  body: string;
  size?: "lg" | "md";
}) {
  return (
    <>
      <div className="font-mono text-[11.5px] text-accent">{letter}</div>
      <h3
        className={cn(
          "mt-2 font-display font-semibold",
          size === "lg" ? "text-[28px] leading-[1.15] tracking-[-0.025em]" : "text-[22px] tracking-[-0.02em]",
        )}
      >
        {title}
      </h3>
      <p className={cn("text-muted", size === "lg" ? "mt-3 text-[15.5px]" : "mt-1.5 text-[15px]")}>
        {body}
      </p>
    </>
  );
}

const PHONE_OFFSETS = ["mt-0", "mt-12", "mt-24"];

function Features({ features }: { features: CreneoContent["features"] }) {
  const { agenda, booking, services, clients } = features;
  return (
    <section aria-labelledby="cs-features" className={SECTION}>
      <div className="flex justify-between gap-4 border-t border-line-strong pt-4 font-mono text-[12px] text-muted">
        <h2 id="cs-features" className="font-normal">
          {features.label}
        </h2>
        <span>4</span>
      </div>

      <Reveal className="mt-14 flex flex-wrap items-end gap-x-[clamp(32px,5vw,72px)] gap-y-8">
        <MediaFrame
          media={agenda.media}
          sizes="(min-width: 1100px) 66vw, 100vw"
          className="aspect-[16/10] flex-[8_1_480px] rounded-[10px]"
        />
        <div className="flex-[3_1_240px] pb-2">
          <FeatureText letter="a" title={agenda.title} body={agenda.body} />
        </div>
      </Reveal>

      <Reveal className="mt-[clamp(72px,9vw,128px)] flex flex-wrap-reverse items-end gap-x-[clamp(32px,5vw,72px)] gap-y-8">
        <div className="flex-[3_1_240px] pb-2">
          <FeatureText letter="b" title={booking.title} body={booking.body} />
        </div>
        <div className="flex flex-[8_1_480px] gap-[clamp(12px,2vw,24px)]">
          {booking.media.map((media, index) => (
            <MediaFrame
              key={media.placeholder}
              media={media}
              sizes="(min-width: 1100px) 20vw, 30vw"
              className={cn("aspect-[9/19] flex-1 rounded-[18px]", PHONE_OFFSETS[index])}
            />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-[clamp(72px,9vw,128px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-[clamp(32px,5vw,72px)] gap-y-12">
        {[
          { letter: "c", item: services },
          { letter: "d", item: clients },
        ].map(({ letter, item }) => (
          <div key={letter}>
            <MediaFrame
              media={item.media}
              sizes="(min-width: 1100px) 45vw, 100vw"
              className="aspect-[4/3] rounded-[10px]"
            />
            <div className="mt-5 flex gap-4">
              <span className="pt-1.5 font-mono text-[11.5px] text-accent">{letter}</span>
              <div>
                <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Architecture({ architecture }: { architecture: CreneoContent["architecture"] }) {
  const lastLayer = architecture.layers.length - 1;
  const lastStep = architecture.pipeline.length - 1;
  return (
    <section
      aria-labelledby="cs-architecture"
      className="mt-[clamp(96px,12vw,180px)] border-y border-line bg-surface"
    >
      <div className="container-site flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-12 py-[clamp(72px,9vw,128px)]">
        <div className="flex-[1_1_260px]">
          <div className="font-mono text-[12px] text-muted">{architecture.label}</div>
          <h2
            id="cs-architecture"
            className="mt-4 font-display text-[length:clamp(30px,3.4vw,48px)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            {architecture.title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-[15.5px] text-muted">{architecture.body}</p>
        </div>

        <div className="min-w-0 flex-[2_1_520px]">
          <div className="relative rounded-[12px] border border-dashed border-line-strong px-[clamp(16px,3vw,40px)] pb-8 pt-14">
            <span className="absolute -top-2.5 left-6 bg-surface px-2.5 font-mono text-[11.5px] text-muted">
              {architecture.runtimeTag}
            </span>
            <span className="absolute -top-2.5 right-6 bg-surface px-2.5 font-mono text-[11.5px] text-accent">
              {architecture.proxyTag}
            </span>
            <div className="relative pl-9">
              <span aria-hidden="true" className="absolute bottom-3.5 left-1 top-3.5 w-px bg-accent" />
              <ol>
                {architecture.layers.map((layer, index) => (
                  <li
                    key={layer.name}
                    className={cn(
                      "relative flex flex-wrap justify-between gap-x-6 gap-y-1 py-3.5",
                      index < lastLayer && "border-b border-line",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-9 top-[21px] size-[9px] rounded-full",
                        index === 0 ? "bg-accent" : "border border-accent bg-surface",
                      )}
                    />
                    <span className="font-display text-[20px] font-semibold">{layer.name}</span>
                    <span className="pt-[5px] font-mono text-[12px] text-muted">{layer.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-7 font-mono text-[11.5px] text-muted">{architecture.pipelineLabel}</div>
          <ol className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[12px]">
            {architecture.pipeline.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3.5 py-2",
                    index === lastStep ? "bg-accent text-white" : "border border-line-strong",
                  )}
                >
                  {step}
                </span>
                {index < lastStep ? (
                  <span aria-hidden="true" className="text-muted">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Decisions({ decisions }: { decisions: CreneoContent["decisions"] }) {
  const last = decisions.items.length - 1;
  return (
    <section aria-labelledby="cs-decisions" className={SECTION}>
      <Reveal>
        <SplitRow label={<h2 id="cs-decisions" className="font-normal">{decisions.label}</h2>}>
          <dl>
            {decisions.items.map((item, index) => (
              <div
                key={item.term}
                className={cn(
                  "flex flex-wrap gap-x-8 gap-y-2 border-t py-6",
                  index === 0 ? "border-line-strong" : "border-line",
                  index === last && "border-b border-b-line",
                )}
              >
                <dt className="flex-[1_1_200px] font-display text-[20px] font-semibold">{item.term}</dt>
                <dd className="flex-[2_1_300px] text-muted">{item.value}</dd>
              </div>
            ))}
          </dl>
        </SplitRow>
      </Reveal>
    </section>
  );
}

function Challenges({ challenges }: { challenges: CreneoContent["challenges"] }) {
  return (
    <section aria-labelledby="cs-challenges" className={SECTION}>
      <div className="font-mono text-[12px] text-muted">{challenges.label}</div>
      <h2 id="cs-challenges" className={cn(H2, "mt-4 max-w-[20ch]")}>
        {challenges.title}
      </h2>
      <ol className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12">
        {challenges.items.map((item, index) => (
          <Reveal as="li" key={item.title} className="border-t border-line-strong pb-8 pt-6">
            <span className="font-mono text-[11.5px] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-1.5 font-display text-[21px] font-semibold">{item.title}</h3>
            <p className="mt-2 text-[15px] text-muted">{item.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Gallery({ gallery }: { gallery: CreneoContent["gallery"] }) {
  return (
    <section
      aria-labelledby="cs-gallery"
      className="mx-auto max-w-[1600px] px-[clamp(12px,2vw,32px)] pt-[clamp(96px,12vw,180px)]"
    >
      <h2 id="cs-gallery" className="px-[clamp(8px,3vw,48px)] font-mono text-[12px] font-normal text-muted">
        {gallery.label}
      </h2>
      <Reveal className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(12px,1.6vw,24px)]">
        <MediaFrame
          media={gallery.wide}
          sizes="(min-width: 1600px) 1536px, 96vw"
          className="col-span-full aspect-[21/9] rounded-[10px]"
        />
        {gallery.items.map((media) => (
          <MediaFrame
            key={media.placeholder}
            media={media}
            sizes="(min-width: 1100px) 33vw, 100vw"
            className="aspect-[4/5] rounded-[10px]"
          />
        ))}
      </Reveal>
    </section>
  );
}

function Outcome({ outcome }: { outcome: CreneoContent["outcome"] }) {
  const last = outcome.items.length - 1;
  return (
    <section aria-labelledby="cs-outcome" className={SECTION}>
      <h2 id="cs-outcome" className="font-mono text-[12px] font-normal text-muted">
        {outcome.label}
      </h2>
      <Reveal className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-12 gap-y-10">
        {outcome.items.map((item, index) => (
          <div
            key={item.title}
            className={cn("border-t pt-5", index === last ? "border-accent" : "border-line-strong")}
          >
            <h3 className="font-display text-[24px] font-semibold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-3 text-muted">{item.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
