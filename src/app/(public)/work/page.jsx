import HeroSection from "@/components/work/HeroSection";
import DossierGrid from "@/components/work/DossierGrid";
import WorkCTA from "@/components/work/WorkCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getWorkPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Work",
  description: "Selected software engineering, distributed systems, and architectural projects by Subham Sarkar.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/work",
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
      <DossierGrid initialDossiers={dossiers} searchParams={searchParams} />
      <WorkCTA />
    </>
  );
}
