import HeroSection from "@/components/work/HeroSection";
import DossierGrid from "@/components/work/DossierGrid";
import { Suspense } from "react";
import WorkCTA from "@/components/work/WorkCTA";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Work",
  description: "Selected software engineering projects.",
};

export const revalidate = 3600;

import PageTracker from "@/components/PageTracker";

export default async function WorkPage() {
  const dossiers = await prisma.dossier.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <PageTracker pageType="work" />
      <HeroSection />
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-secondary font-display uppercase tracking-widest text-[11px] animate-pulse">Initializing Data...</div>}>
        <DossierGrid initialDossiers={dossiers} />
      </Suspense>
      <WorkCTA />
    </>
  );
}
