"use client";

import { useEffect, useRef, type ElementType, type HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li" | "section";
};

/**
 * One-time appearance on scroll (opacity + 24px). Content renders visible on
 * the server; it is only hidden once JS confirms it sits below the fold and
 * the visitor accepts motion.
 */
export function Reveal({ as = "div", ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;
  return <Tag ref={ref} {...props} />;
}
