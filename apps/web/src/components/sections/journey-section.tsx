import type { SiteContent } from "@portfolio/content";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";
import { JourneyTimeline } from "./journey-timeline";

type JourneySectionProps = {
  journey: SiteContent["journey"];
  certifications: SiteContent["certifications"];
};

export function JourneySection({ journey, certifications }: JourneySectionProps) {
  return (
    <section
      id="parcours"
      aria-labelledby="parcours-title"
      className="container-site py-[clamp(48px,8vw,120px)]"
    >
      <div className="flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-8">
        <div className="flex-[1_1_200px]">
          <div className="sticky top-[120px]">
            <div className="font-mono text-[12px] text-muted">{journey.label}</div>
            <h2
              id="parcours-title"
              className="mt-4 font-display text-[length:clamp(36px,4vw,56px)] font-bold leading-none tracking-[-0.04em]"
            >
              {journey.titleLines[0]}
              <br />
              {journey.titleLines[1]}
            </h2>
          </div>
        </div>
        <JourneyTimeline steps={journey.steps} className="flex-[3_1_480px]" />
      </div>

      {/* Built as a list so further certifications slot in without layout work. */}
      <Reveal className="mt-[clamp(80px,10vw,140px)] flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-6">
        <h3 className="flex-[1_1_200px] font-mono text-[12px] font-normal text-muted">
          {certifications.label}
        </h3>
        <ul className="flex-[3_1_480px]">
          {certifications.items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-line py-[22px]",
                index === 0 && "border-t border-t-line-strong",
              )}
            >
              <span className="flex-[1_1_300px] font-display text-[20px] font-semibold tracking-[-0.015em]">
                {item.title}
              </span>
              <span className="flex-none text-[15px] text-muted">{item.issuer}</span>
              <span className="flex-none font-mono text-[12.5px] text-muted">{item.period}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
