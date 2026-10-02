"use client";

import type { HeroLayer, SiteContent } from "@portfolio/content";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AvailabilityDot } from "@/components/primitives/availability";
import { Button } from "@/components/ui/button";
import { useMediaQuery, WIDE_QUERY } from "@/hooks/use-media-query";

type HeroDesktopProps = {
  hero: SiteContent["hero"];
  titleLines: [string, string];
  cvHref: string;
  portrait: ReactNode;
};

/* ——— Choreography constants (from the Claude Design spec) ——— */

/** Where each stratum's line starts, as a % of the portrait width. */
const LINE_START = [44, 62, 50, 68, 56] as const;
/** Mouse smoothing ≈ the prototype's 6% per-frame lerp. */
const MOUSE_SPRING = { stiffness: 40, damping: 12.6, mass: 1 };
const PARALLAX = { portraitX: -7, portraitY: -6, systemX: 12, systemY: 9 };
const PULSE_DELAY_MS = 3000;
const PULSE_PERIOD_S = 4.2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
/** Normalised progress of `value` through the [from, to] window. */
const seg = (value: number, from: number, to: number) => clamp01((value - from) / (to - from));
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const introDelay = (ms: number) => ({ "--intro-delay": `${ms}ms` }) as CSSProperties;

type Metrics = {
  boxTop: MotionValue<number>;
  boxHeight: MotionValue<number>;
  viewport: MotionValue<number>;
};

/**
 * Signature hero: the portrait sliced into five strata (Frontend → DevOps),
 * pinned for 230vh. On scroll the slits open, the strata spread across the
 * screen and their lines become the grid the Projects section starts on.
 */
export function HeroDesktop({ hero, titleLines, cvHref, portrait }: HeroDesktopProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isWide = useMediaQuery(WIDE_QUERY);
  const inView = useInView(rootRef);

  const { scrollYProgress: progress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  // 1 when the visitor accepts motion, 0 under prefers-reduced-motion: the
  // scroll transition then collapses to plain fades.
  const motionOn = useMotionValue(1);
  useEffect(() => motionOn.set(reduced ? 0 : 1), [reduced, motionOn]);

  /* Layout metrics, read inside transforms without re-rendering. */
  const boxTop = useMotionValue(0);
  const boxHeight = useMotionValue(600);
  const viewport = useMotionValue(900);
  const metrics: Metrics = { boxTop, boxHeight, viewport };

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      boxTop.set(box.offsetTop);
      boxHeight.set(box.offsetHeight);
      viewport.set(window.innerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [boxTop, boxHeight, viewport]);

  /* Pointer: two planes moving in opposite directions → depth without 3D. */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, MOUSE_SPRING);
  const smoothY = useSpring(mouseY, MOUSE_SPRING);
  const [activeLayer, setActiveLayer] = useState(-1);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((event.clientY / window.innerHeight) * 2 - 1);

    const box = boxRef.current;
    if (!box || progress.get() >= 0.1) {
      setActiveLayer(-1);
      return;
    }
    const rect = box.getBoundingClientRect();
    const relative = (event.clientY - rect.top) / rect.height;
    const overStrata = event.clientX > rect.left - 160 && relative >= 0 && relative <= 1;
    setActiveLayer(overStrata ? Math.min(4, Math.floor(relative * 5)) : -1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setActiveLayer(-1);
  }

  useMotionValueEvent(progress, "change", (value) => {
    if (value >= 0.1) setActiveLayer(-1);
  });

  /* Scroll choreography. */
  const textOpacity = useTransform(progress, [0, 0.35], [1, 0]);
  const textTransform = useTransform(
    () =>
      `translate3d(0, calc(-50% - ${(seg(progress.get(), 0, 0.35) * 90 * motionOn.get()).toFixed(1)}px), 0)`,
  );
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  const strataGap = useTransform(
    () =>
      `${(2 + seg(progress.get(), 0.12, 0.7) * boxHeight.get() * 0.17 * motionOn.get()).toFixed(1)}px`,
  );
  const portraitX = useTransform(
    () =>
      (smoothX.get() * PARALLAX.portraitX + seg(progress.get(), 0.12, 0.7) * -40) * motionOn.get(),
  );
  const portraitY = useTransform(() => smoothY.get() * PARALLAX.portraitY * motionOn.get());
  const portraitScale = useTransform(
    () => 1 + seg(progress.get(), 0.12, 0.7) * 0.05 * motionOn.get(),
  );
  const portraitOpacity = useTransform(progress, [0.35, 0.82], [1, 0]);

  const systemX = useTransform(() => smoothX.get() * PARALLAX.systemX * motionOn.get());
  const systemY = useTransform(() => smoothY.get() * PARALLAX.systemY * motionOn.get());
  const layersOpacity = useTransform(progress, [0.15, 0.4], [1, 0]);

  const transitionOpacity = useTransform(progress, [0.55, 0.85], [0, 1]);
  const transitionY = useTransform(
    () => (1 - seg(progress.get(), 0.55, 0.85)) * 30 * motionOn.get(),
  );

  /* Blue pulse travelling Frontend → DevOps, only while the hero is on screen. */
  const pulseT = useMotionValue(0);
  const pulseOn = useMotionValue(0);
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);
  useEffect(() => {
    if (reduced || !isWide || !inView) return;
    let controls: ReturnType<typeof animate> | undefined;
    const wait = Math.max(0, PULSE_DELAY_MS - (performance.now() - mountedAt.current));
    const timer = window.setTimeout(() => {
      pulseOn.set(1);
      controls = animate(pulseT, [0, 1], {
        duration: PULSE_PERIOD_S,
        ease: "linear",
        repeat: Infinity,
      });
    }, wait);
    return () => {
      window.clearTimeout(timer);
      controls?.stop();
      pulseOn.set(0);
    };
  }, [reduced, isWide, inView, pulseOn, pulseT]);

  const pulseTop = useTransform(() => `${10 + 80 * easeInOutQuad(pulseT.get())}%`);
  const pulseOpacity = useTransform(() => {
    const p = progress.get();
    if (p > 0.12) return 0;
    return pulseOn.get() * Math.sin(pulseT.get() * Math.PI) * (1 - seg(p, 0.15, 0.4));
  });

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative hidden h-[230vh] wide:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 mx-auto max-w-[1440px]">
          {/* Portrait + architecture */}
          <div
            ref={boxRef}
            className="absolute right-[max(290px,21vw)] top-[calc(50%_+_32px_-_min(54vh,30vw)*0.55)] aspect-[4/5] w-[min(54vh,30vw)]"
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ x: portraitX, y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            >
              <div className="intro-portrait absolute inset-0">
                <div
                  aria-hidden="true"
                  className="absolute -right-7 -top-7 bottom-[18%] left-[18%] border border-plate-line bg-plate"
                />
                <motion.div
                  className="mask-strata absolute inset-0"
                  style={{ "--strata-gap": strataGap } as MotionStyle}
                >
                  <div className="absolute inset-0 [filter:var(--portrait-filter)]">{portrait}</div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-linear-to-b from-transparent to-bg"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 will-change-transform"
              style={{ x: systemX, y: systemY }}
            >
              <motion.div
                aria-hidden="true"
                className="intro-draw-y absolute left-[calc(100%_+_28px)] top-[10%] h-[80%] w-px origin-top bg-line-strong"
                style={{ opacity: layersOpacity, ...introDelay(1500) } as MotionStyle}
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-[calc(100%_+_25px)] size-[7px] rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                style={{ top: pulseTop, opacity: pulseOpacity }}
              />
              <ul className="absolute inset-0">
                {hero.layers.map((layer, index) => (
                  <Stratum
                    key={layer.number}
                    index={index}
                    layer={layer}
                    active={activeLayer === index}
                    progress={progress}
                    metrics={metrics}
                    motionOn={motionOn}
                    layersOpacity={layersOpacity}
                  />
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            className="absolute left-[clamp(20px,5vw,80px)] top-[calc(50%_+_32px)] z-[2] w-[min(560px,38vw)]"
            style={{ transform: textTransform, opacity: textOpacity }}
          >
            <div
              className="intro-rise mb-[min(28px,3vh)] flex flex-wrap gap-x-[18px] gap-y-2 font-mono text-[12px] text-muted"
              style={introDelay(500)}
            >
              {hero.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h1
              className="intro-rise font-display text-[length:clamp(44px,min(7.2vw,11vh),116px)] font-bold leading-[0.92] tracking-[-0.045em]"
              style={introDelay(590)}
            >
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h1>
            <p
              className="intro-rise mt-[min(32px,3.5vh)] max-w-[30ch] text-pretty font-display text-[length:clamp(19px,min(1.9vw,3.4vh),27px)] font-medium leading-[1.3] tracking-[-0.015em]"
              style={introDelay(680)}
            >
              {hero.lead}
            </p>
            <p
              className="intro-rise mt-4 max-w-[46ch] text-pretty text-[15.5px] text-muted [@media(max-height:699px)]:hidden"
              style={introDelay(770)}
            >
              {hero.description}
            </p>
            <div
              className="intro-rise mt-[min(36px,4vh)] flex flex-wrap items-center gap-3"
              style={introDelay(860)}
            >
              <Button asChild>
                <a href="#projets">
                  {hero.ctaProjects} <span aria-hidden="true">↓</span>
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={cvHref} download>
                  {hero.ctaCv}
                </a>
              </Button>
              <a href="#contact" className="px-2 py-3 text-[15px] text-muted">
                {hero.ctaContact} <span aria-hidden="true">→</span>
              </a>
            </div>
            <div
              className="intro-rise mt-[min(32px,3.5vh)] flex items-center gap-2.5 font-mono text-[12px]"
              style={introDelay(950)}
            >
              <AvailabilityDot ring />
              {hero.availability}
            </div>
          </motion.div>

          {/* Transition title, revealed on the spread-out strata */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[clamp(20px,5vw,80px)] top-[31vh]"
            style={{ y: transitionY, opacity: transitionOpacity }}
          >
            <div className="mb-5 font-mono text-[12px] text-accent">{hero.transitionLabel}</div>
            <div className="font-display text-[length:clamp(44px,5.6vw,88px)] font-bold leading-[0.98] tracking-[-0.04em]">
              {hero.transitionTitle[0]}
              <br />
              {hero.transitionTitle[1]}
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute bottom-6 right-[clamp(20px,5vw,80px)] flex items-center gap-3 whitespace-nowrap font-mono text-[11px] text-muted"
            style={{ opacity: hintOpacity }}
          >
            <span className="h-px w-8 bg-current" />
            {hero.scrollHint}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type StratumProps = {
  index: number;
  layer: HeroLayer;
  active: boolean;
  progress: MotionValue<number>;
  metrics: Metrics;
  motionOn: MotionValue<number>;
  layersOpacity: MotionValue<number>;
};

/** One stratum: its full-width field line, its connector, node and label. */
function Stratum({ index, layer, active, progress, metrics, motionOn, layersOpacity }: StratumProps) {
  const lineStart = LINE_START[index] ?? 50;
  const stagger = 140 * index;

  // Spread the five strata from the portrait over the whole viewport height.
  const y = useTransform(() => {
    const anchor = metrics.boxTop.get() + metrics.boxHeight.get() * (0.1 + 0.2 * index);
    const target = metrics.viewport.get() * (0.12 + 0.19 * index);
    return (target - anchor) * seg(progress.get(), 0.18, 0.75) * motionOn.get();
  });
  const fieldScale = useTransform(
    () => seg(progress.get(), 0.12 + index * 0.04, 0.6 + index * 0.04) * motionOn.get(),
  );
  const fieldOpacity = useTransform(progress, [0.9, 1], [1, 0.6]);
  const lineOpacity = useTransform(progress, [0.3, 0.6], [1, 0]);

  return (
    <motion.li className="absolute inset-x-0 h-0" style={{ top: `${10 + 20 * index}%`, y }}>
      <motion.div
        aria-hidden="true"
        className="absolute -left-[110vw] top-0 h-px w-[220vw] bg-line"
        style={{ scaleX: fieldScale, opacity: fieldOpacity }}
      />
      <motion.div
        aria-hidden="true"
        data-active={active}
        className="intro-draw-x absolute top-0 h-px origin-left bg-line-strong transition-colors duration-300 data-[active=true]:bg-accent"
        style={
          {
            left: `${lineStart}%`,
            width: `calc(${100 - lineStart}% + 28px)`,
            opacity: lineOpacity,
            ...introDelay(1400 + stagger),
          } as MotionStyle
        }
      />
      <motion.div className="absolute -top-1 left-[calc(100%_+_24px)]" style={{ opacity: layersOpacity }}>
        <span
          aria-hidden="true"
          data-active={active}
          className="intro-pop block size-[9px] rounded-full border border-line-strong bg-bg transition-all duration-300 data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:shadow-[0_0_0_5px_var(--accent-soft)]"
          style={introDelay(1900 + stagger)}
        />
      </motion.div>
      <motion.div
        className="absolute -top-[11px] left-[calc(100%_+_52px)] whitespace-nowrap"
        style={{ opacity: layersOpacity }}
      >
        <div className="intro-slide" style={introDelay(1950 + stagger)}>
          <div className="flex items-baseline gap-2.5 font-display text-[15px] font-semibold leading-[1.2]">
            <span className="font-mono text-[11px] font-normal text-muted">{layer.number}</span>
            {layer.name}
          </div>
          <div className="ml-7 mt-1 font-mono text-[11.5px] text-muted">{layer.stack}</div>
        </div>
      </motion.div>
    </motion.li>
  );
}
