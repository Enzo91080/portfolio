"use client";

import { useTheme } from "@/lib/theme";

type ThemeToggleProps = {
  names: { dark: string; light: string };
  toLight: string;
  toDark: string;
};

/** Pill showing the current theme; dark is the designed default. */
export function ThemeToggle({ names, toLight, toDark }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`${names[theme]} — ${theme === "dark" ? toLight : toDark}`}
      className="flex h-[34px] cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-transparent px-3 font-mono text-[11px] transition-colors hover:border-accent"
    >
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]"
      />
      <span>{names[theme]}</span>
    </button>
  );
}
