import type { SiteContent } from "@portfolio/content";
import { Reveal } from "@/components/primitives/reveal";

type AboutSectionProps = {
  about: SiteContent["about"];
  skills: SiteContent["skills"];
  cvHref: string;
};

/** Short professional statement, then skills grouped by the hero's layers — no gauges. */
export function AboutSection({ about, skills, cvHref }: AboutSectionProps) {
  return (
    <section
      id="apropos"
      aria-labelledby="apropos-title"
      className="container-site py-[clamp(48px,8vw,120px)]"
    >
      <Reveal className="flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-8">
        <h2 id="apropos-title" className="flex-[1_1_200px] font-mono text-[12px] font-normal text-muted">
          {about.label}
        </h2>
        <div className="flex-[3_1_480px]">
          <p className="text-pretty font-display text-[length:clamp(26px,3.2vw,46px)] font-medium leading-[1.18] tracking-[-0.03em]">
            {about.text.before}
            <span className="text-accent">{about.text.highlight}</span>
            {about.text.after}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[12.5px] text-muted">
            {about.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
            <a href={cvHref} download className="border-b border-line-strong text-ink">
              {about.cvLink} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-[clamp(80px,10vw,160px)] flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-8">
        <div className="flex-[1_1_200px]">
          <h3 className="font-mono text-[12px] font-normal text-muted">{skills.label}</h3>
          <p className="mt-3 max-w-[28ch] text-[14px] text-muted">{skills.intro}</p>
        </div>
        <ul className="grid flex-[3_1_480px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] content-start gap-x-12">
          {skills.groups.map((group) => (
            <li key={group.number} className="flex items-baseline gap-5 border-t border-line-strong py-5">
              <span className="font-mono text-[11px] text-muted">{group.number}</span>
              <div>
                <div className="font-display text-[22px] font-semibold tracking-[-0.02em]">
                  {group.name}
                </div>
                <div className="mt-1.5 text-[15px] text-muted">{group.items}</div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
