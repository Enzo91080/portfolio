"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "./theme-script";

export type Theme = "dark" | "light";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  listeners.forEach((notify) => notify());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) applyTheme(event.newValue === "light" ? "light" : "dark");
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page only.
  }
}

/** Current theme; "dark" on the server and during hydration, then the real value. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
  return { theme, setTheme };
}
