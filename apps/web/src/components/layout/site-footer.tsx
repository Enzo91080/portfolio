import type { SiteContent } from "@portfolio/content";

/** Continues the contact surface; the hairline separates it from the form. */
export function SiteFooter({ footer }: { footer: SiteContent["footer"] }) {
  return (
    <footer className="bg-surface">
      <div className="container-site pb-10 pt-[clamp(80px,10vw,140px)]">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-[11.5px] text-muted">
          <span>{footer.copyright}</span>
          <span>{footer.credit}</span>
          <a href="#accueil">
            {footer.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
