import type { Media } from "@portfolio/content";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  media: Media;
  sizes: string;
  className?: string;
  /** Lift on hover (−6px), the only hover motion allowed on project visuals. */
  lift?: boolean;
};

/**
 * Screenshot frame: surface background, 1px hairline, radius set by caller
 * (10–12 product, 18 phone, 4 institutional).
 */
export function MediaFrame({ media, sizes, className, lift = false }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line bg-surface",
        lift && "transition-transform duration-[600ms] ease-soft hover:-translate-y-1.5",
        className,
      )}
    >
      {media.image ? (
        <Image
          src={media.image.src}
          alt={media.image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <MediaPlaceholder label={media.placeholder} />
      )}
    </div>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 grid place-items-center p-4 text-center font-mono text-[11px] leading-snug text-muted"
    >
      <span aria-hidden="true" className="max-w-[32ch]">
        {label}
      </span>
    </div>
  );
}
