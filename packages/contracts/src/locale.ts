import { z } from "zod";

export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" satisfies Locale;

export const localeSchema = z.enum(locales);
export type Locale = z.infer<typeof localeSchema>;

export function isLocale(value: unknown): value is Locale {
  return localeSchema.safeParse(value).success;
}
