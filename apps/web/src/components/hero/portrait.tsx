import type { Media } from "@portfolio/content";
import Image from "next/image";

/**
 * Identical `sizes` on the desktop and mobile copies so the browser resolves
 * the same candidate and downloads the portrait once.
 */
const PORTRAIT_SIZES = "(min-width: 1100px) 30vw, 70vw";

type PortraitProps = {
  media: Media;
  /** Disambiguates SVG gradient ids between the desktop and mobile copies. */
  variant: "desktop" | "mobile";
};

export function Portrait({ media, variant }: PortraitProps) {
  if (media.image) {
    return (
      <Image
        src={media.image.src}
        alt={media.image.alt}
        fill
        preload
        sizes={PORTRAIT_SIZES}
        className="object-cover"
      />
    );
  }
  return <PortraitPlaceholder label={media.placeholder} variant={variant} />;
}

/** Neutral bust lit from the side, until the real photo is provided. */
function PortraitPlaceholder({ label, variant }: { label: string; variant: string }) {
  const bg = `portrait-bg-${variant}`;
  const figure = `portrait-figure-${variant}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--portrait-from)" }} />
          <stop offset="1" style={{ stopColor: "var(--portrait-to)" }} />
        </linearGradient>
        <linearGradient id={figure} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--ink)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--ink)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--ink)", stopOpacity: 0.05 }} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${bg})`} />
      <path
        d="M52 500 C 62 404, 128 362, 200 354 C 272 362, 338 404, 348 500 Z"
        fill={`url(#${figure})`}
      />
      <rect x="170" y="276" width="60" height="92" rx="24" fill={`url(#${figure})`} />
      <ellipse cx="200" cy="206" rx="76" ry="94" fill={`url(#${figure})`} />
    </svg>
  );
}
