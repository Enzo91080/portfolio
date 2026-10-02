import { defaultLocale, locales } from "@portfolio/contracts";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/projets/[slug]": {
      fr: "/projets/[slug]",
      en: "/projects/[slug]",
    },
  },
});
