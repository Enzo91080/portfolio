import { getContent } from "@portfolio/content";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getContent(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        person={content.person}
        nav={content.nav}
        a11y={content.a11y}
      />
      <main id="contenu">
        <Hero hero={content.hero} person={content.person} links={content.links} />
        <ProjectsSection projects={content.projects} />
        <AboutSection about={content.about} skills={content.skills} cvHref={content.links.cv} />
        <JourneySection journey={content.journey} certifications={content.certifications} />
        <ContactSection contact={content.contact} email={content.person.email} locale={locale} />
      </main>
      <SiteFooter footer={content.footer} />
    </>
  );
}
