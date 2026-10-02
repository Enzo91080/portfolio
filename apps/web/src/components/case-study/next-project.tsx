import type { ProjectSlug } from "@portfolio/content";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NextProjectProps = {
  label: string;
  next: { slug: ProjectSlug; title: string };
};

/** Full-width hand-off to the next case study. Créneo keeps its display weight everywhere. */
export function NextProject({ label, next }: NextProjectProps) {
  return (
    <Link
      href={{ pathname: "/projets/[slug]", params: { slug: next.slug } }}
      className="mt-[clamp(96px,12vw,180px)] block border-t border-line-strong transition-colors hover:bg-surface"
    >
      <div className="container-site flex flex-wrap items-end justify-between gap-4 py-[clamp(48px,6vw,88px)]">
        <div>
          <div className="font-mono text-[12px] text-muted">{label}</div>
          <div
            className={cn(
              "mt-3 font-display text-[length:clamp(48px,8vw,128px)] leading-[0.9]",
              next.slug === "creneo" ? "font-extrabold tracking-[-0.06em]" : "font-bold tracking-[-0.05em]",
            )}
          >
            {next.title}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="font-display text-[length:clamp(40px,6vw,96px)] leading-none text-accent"
        >
          →
        </span>
      </div>
    </Link>
  );
}
