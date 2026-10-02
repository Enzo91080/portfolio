import { getContent, isProjectSlug, projectSlugs } from "@portfolio/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyHeader } from "@/components/case-study/case-study-header";
import { CreneoCaseStudy } from "@/components/case-study/creneo-case-study";
import { NextProject } from "@/components/case-study/next-project";
import { WebcmsCaseStudy } from "@/components/case-study/webcms-case-study";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Only the known case studies exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projets/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isProjectSlug(slug)) return {};
  const { seo } = getContent(locale).caseStudies[slug];
  const pathFor = (target: (typeof routing.locales)[number]) =>
    getPathname({ locale: target, href: { pathname: "/projets/[slug]", params: { slug } } });

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: pathFor(locale),
      languages: { fr: pathFor("fr"), en: pathFor("en"), "x-default": pathFor("fr") },
    },
    openGraph: { type: "article", title: seo.title, description: seo.description, url: pathFor(locale) },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/projets/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isProjectSlug(slug)) notFound();
  setRequestLocale(locale);

  const content = getContent(locale);
  const study = content.caseStudies[slug];

  return (
    <>
      <CaseStudyHeader
        locale={locale}
        number={study.number}
        total={projectSlugs.length}
        person={content.person}
        nav={content.nav}
        a11y={content.a11y}
        chrome={content.caseStudyChrome}
      />
      <main id="contenu">
        {study.kind === "product" ? (
          <CreneoCaseStudy study={study} />
        ) : (
          <WebcmsCaseStudy study={study} tocLabel={content.caseStudyChrome.tocLabel} />
        )}
        <NextProject label={content.caseStudyChrome.nextLabel} next={study.next} />
      </main>
    </>
  );
}
