"use client";

import { locales, type Locale } from "@portfolio/contracts";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getPathname, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  switchLabels: Record<Locale, string>;
};

const SCROLL_KEY = "locale-switch-scroll";

/**
 * FR / EN segmented pill.
 *
 * Switching language is a full document navigation: the root layout changes
 * (`<html lang>`, metadata, every string), and remounting it client-side would
 * re-create the theme <script>, which React rejects. Pages are static, so the
 * reload is cheap; the scroll position is carried over.
 */
export function LocaleSwitcher({ locale, label, switchLabels }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved === null) return;
    sessionStorage.removeItem(SCROLL_KEY);
    window.scrollTo({ top: Number(saved), behavior: "instant" });
  }, []);

  function hrefFor(target: Locale) {
    const href = { pathname, params } as Parameters<typeof getPathname>[0]["href"];
    return getPathname({ locale: target, href });
  }

  function switchTo(next: Locale) {
    if (next === locale) return;
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    window.location.assign(hrefFor(next));
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex rounded-full border border-line-strong p-0.5 font-mono text-[11px]"
    >
      {locales.map((code) => {
        const isCurrent = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={isCurrent}
            onClick={() => switchTo(code)}
            className={cn(
              "min-h-7 cursor-pointer rounded-full px-2.5 py-1.5 transition-colors",
              isCurrent ? "bg-ink text-bg" : "bg-transparent text-muted",
            )}
          >
            {code.toUpperCase()}
            <span className="sr-only"> — {switchLabels[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
