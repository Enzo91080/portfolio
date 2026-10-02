"use client";

import type { SiteContent } from "@portfolio/content";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type JourneyTimelineProps = {
  steps: SiteContent["journey"]["steps"];
  className?: string;
};

/** Vertical timeline whose blue rule fills as the reading line (62% of the viewport) moves down. */
export function JourneyTimeline({ steps, className }: JourneyTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.62", "end 0.62"] });

  return (
    <div ref={ref} className={cn("relative pl-10", className)}>
      <span aria-hidden="true" className="absolute bottom-2.5 left-1 top-2.5 w-px bg-line-strong" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2.5 left-1 top-2.5 w-px origin-top bg-accent"
        style={{ scaleY: scrollYProgress }}
      />
      <ol>
        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.period}
            className={cn("relative", index < steps.length - 1 && "pb-14")}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-10 top-[9px] size-[9px] rounded-full",
                step.current
                  ? "bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                  : "border border-line-strong bg-bg",
              )}
            />
            <div className={cn("font-mono text-[13px]", step.current ? "text-accent" : "text-muted")}>
              {step.period}
            </div>
            <div className="mt-1.5 font-display text-[length:clamp(22px,2vw,28px)] font-semibold tracking-[-0.02em]">
              {step.title}
            </div>
            {step.caseStudy ? (
              <Link
                href={{ pathname: "/projets/[slug]", params: { slug: step.caseStudy.slug } }}
                className="mt-2 inline-block text-[14px] text-muted"
              >
                {step.caseStudy.label} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
