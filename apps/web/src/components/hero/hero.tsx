import type { SiteContent } from "@portfolio/content";
import { HeroDesktop } from "./hero-desktop";
import { HeroMobile } from "./hero-mobile";
import { Portrait } from "./portrait";

type HeroProps = {
  hero: SiteContent["hero"];
  person: SiteContent["person"];
  links: SiteContent["links"];
};

/**
 * Both compositions are server-rendered and swapped by CSS at 1100px, so the
 * right one paints immediately with no layout shift.
 */
export function Hero({ hero, person, links }: HeroProps) {
  return (
    <section id="accueil" aria-label={hero.ariaLabel}>
      <HeroDesktop
        hero={hero}
        titleLines={person.titleLines}
        cvHref={links.cv}
        portrait={<Portrait media={hero.portrait} variant="desktop" />}
      />
      <HeroMobile
        hero={hero}
        titleLines={person.titleLines}
        cvHref={links.cv}
        portrait={<Portrait media={hero.portrait} variant="mobile" />}
      />
    </section>
  );
}
