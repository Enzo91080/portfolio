import type { Locale } from "@portfolio/contracts";
import { en } from "./en.js";
import { fr } from "./fr.js";
import type { ProjectSlug, SiteContent } from "./types.js";

export type * from "./types.js";

const content: Record<Locale, SiteContent> = { fr, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export const projectSlugs = ["creneo", "webcms"] as const satisfies readonly ProjectSlug[];

export function isProjectSlug(value: unknown): value is ProjectSlug {
  return (projectSlugs as readonly unknown[]).includes(value);
}
