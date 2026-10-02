"use client";

import type { SiteContent } from "@portfolio/content";
import type { Locale } from "@portfolio/contracts";
import { useMemo } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  locale: Locale;
  person: SiteContent["person"];
  nav: SiteContent["nav"];
  a11y: SiteContent["a11y"];
};

/** Fixed, quiet navigation: 64px, blurred background, hairline bottom border. */
export function SiteHeader({ locale, person, nav, a11y }: SiteHeaderProps) {
  const ids = useMemo(() => nav.items.map((item) => item.id), [nav.items]);
  const active = useActiveSection(ids);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {a11y.skipToContent}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-navbg backdrop-blur-[8px]">
        <nav
          aria-label={a11y.mainNav}
          className="container-site flex h-16 items-center justify-between gap-6"
        >
          <a
            href="#accueil"
            className="flex items-center gap-3 font-display text-[15px] font-bold tracking-[-0.01em]"
          >
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-full border border-line-strong font-mono text-[10px] font-medium"
            >
              {person.initials}
            </span>
            {/* Below 430px the monogram stands alone so FR/EN, theme and Menu fit. */}
            <span className="whitespace-nowrap max-[429px]:sr-only">{person.fullName}</span>
          </a>

          <ul className="hidden items-center gap-7 whitespace-nowrap text-[14px] text-muted wide:flex">
            {nav.items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(isActive && "text-ink")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleSwitcher
              locale={locale}
              label={a11y.language}
              switchLabels={a11y.switchToLocale}
            />
            <ThemeToggle names={nav.themeNames} toLight={a11y.themeToLight} toDark={a11y.themeToDark} />
            <MobileMenu nav={nav} label={a11y.mainNav} />
          </div>
        </nav>
      </header>
    </>
  );
}
