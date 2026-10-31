import HeroSection from "@/components/work/HeroSection";
import DossierGrid from "@/components/work/DossierGrid";
import { Suspense } from "react";
import WorkCTA from "@/components/work/WorkCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getSiteSettings } from "@/actions/settings";
import { getWorkPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Work | Subham Sarkar",
  description: "Selected software engineering, distributed systems, and architectural projects by Subham Sarkar.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/work",
  },
};

export const revalidate = 3600;

export default async function WorkPage() {
  const [settings, dossiers] = await Promise.all([
    getSiteSettings(),
    prisma.dossier.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const schema = getWorkPageSchema(settings, dossiers);

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="work" />
      <HeroSection />
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-secondary font-display uppercase tracking-widest text-[11px] animate-pulse">Initializing Data...</div>}>
        <DossierGrid initialDossiers={dossiers} />
      </Suspense>
      <WorkCTA />
    </>
  );
}
