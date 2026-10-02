import type { SiteContent } from "@portfolio/content";
import type { Locale } from "@portfolio/contracts";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Link } from "@/i18n/navigation";

type CaseStudyHeaderProps = {
  locale: Locale;
  number: string;
  total: number;
  person: SiteContent["person"];
  nav: SiteContent["nav"];
  a11y: SiteContent["a11y"];
  chrome: SiteContent["caseStudyChrome"];
};

/** Sticky case-study bar: back to the work section, position in the series, preferences. */
export function CaseStudyHeader({
  locale,
  number,
  total,
  person,
  nav,
  a11y,
  chrome,
}: CaseStudyHeaderProps) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {a11y.skipToContent}
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-navbg backdrop-blur-[8px]">
        <nav aria-label={a11y.mainNav} className="container-site flex h-16 items-center justify-between gap-4">
          <Link
            href={{ pathname: "/", hash: "projets" }}
            className="flex min-h-11 min-w-11 items-center gap-2.5 text-[14px]"
          >
            <span aria-hidden="true">←</span>
            <span className="font-display font-bold max-[429px]:sr-only">{person.fullName}</span>
            <span className="sr-only"> — {chrome.backLabel}</span>
          </Link>
          <span className="font-mono text-[11.5px] text-muted max-[479px]:hidden">
            {chrome.counter} {number} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} label={a11y.language} switchLabels={a11y.switchToLocale} />
            <ThemeToggle names={nav.themeNames} toLight={a11y.themeToLight} toDark={a11y.themeToDark} />
          </div>
        </nav>
      </header>
    </>
  );
}
