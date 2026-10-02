import type { SiteContent } from "@portfolio/content";
import type { ReactNode } from "react";
import { AvailabilityDot } from "@/components/primitives/availability";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroMobileProps = {
  hero: SiteContent["hero"];
  titleLines: [string, string];
  cvHref: string;
  portrait: ReactNode;
};

/** Below 1100px: static striated portrait beside the five layers. No pointer interaction. */
export function HeroMobile({ hero, titleLines, cvHref, portrait }: HeroMobileProps) {
  return (
    <div className="px-5 pb-16 pt-24 wide:hidden">
      <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11.5px] text-muted">
        {hero.mobile.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <h1 className="mt-4 font-display text-[length:clamp(48px,15vw,72px)] font-bold leading-[0.92] tracking-[-0.045em]">
        {titleLines[0]}
        <br />
        {titleLines[1]}
      </h1>

      <div className="mt-7 flex items-stretch gap-4">
        <div className="mask-strata relative aspect-[4/5] max-h-[60vh] min-w-0 flex-auto">
          <div className="absolute inset-0 [filter:var(--portrait-filter)]">{portrait}</div>
        </div>
        <ol className="grid flex-none grid-rows-5 border-l border-line-strong pl-3.5 font-mono text-[10.5px] text-muted">
          {hero.layers.map((layer, index) => (
            <li key={layer.number} className="relative self-center">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[19px] top-1.5 size-[9px] rounded-full",
                  index === 0 ? "bg-accent" : "border border-line-strong bg-bg",
                )}
              />
              <b className="block font-display text-[13px] font-semibold text-ink">
                {layer.mobileName}
              </b>
              {layer.mobileStack}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-7 text-pretty font-display text-[21px] font-medium leading-[1.3] tracking-[-0.015em]">
        {hero.lead}
      </p>
      <p className="mt-3 text-pretty text-[15px] text-muted">{hero.mobile.description}</p>
      <div className="mt-5 flex items-center gap-2.5 font-mono text-[11.5px]">
        <AvailabilityDot />
        {hero.mobile.availability}
      </div>
      <div className="mt-7 flex flex-col gap-2.5">
        <Button asChild size="block">
          <a href="#projets">{hero.ctaProjects}</a>
        </Button>
        <Button asChild size="block" variant="outline">
          <a href={cvHref} download>
            {hero.ctaCv}
          </a>
        </Button>
      </div>
    </div>
  );
}
