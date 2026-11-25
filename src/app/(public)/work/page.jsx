import HeroSection from "@/components/work/HeroSection";
import WorkCaseStudiesHeading from "@/components/work/WorkCaseStudiesHeading";
import DossierGrid from "@/components/work/DossierGrid";
import WorkCTA from "@/components/work/WorkCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getWorkPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { META } from "@/data/pageMeta";

export const metadata = {
  title: META.work.baseTitle,
  description: META.work.description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: META.work.title,
    description: META.work.description,
    url: "https://subhamsarkar.dev/work",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: META.work.title,
    description: META.work.description,
    images: ["/icons/icon-512x512.png"],
  },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
};

export const revalidate = 3600;

export default async function WorkPage(props) {
  const searchParams = await props?.searchParams;
  const dossiers = await prisma.dossier.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  const schema = getWorkPageSchema(dossiers);

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="work" />
      <HeroSection />
      <WorkCaseStudiesHeading />
      <DossierGrid initialDossiers={dossiers} searchParams={searchParams} />
      <WorkCTA />
    </>
  );
}
