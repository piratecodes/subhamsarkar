import HeroSection from "@/components/landing/HeroSection";
import ClientMarquee from "@/components/landing/ClientMarquee";
import DisciplineStrip from "@/components/landing/DisciplineStrip";
import ValueProposition from "@/components/landing/ValueProposition";
import TrustStrip from "@/components/landing/TrustStrip";
import FeaturedWork from "@/components/landing/FeaturedWork";
import ClosingCTA from "@/components/landing/ClosingCTA";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Subham Sarkar | Software Architect & Systems Engineer",
  description: "Portfolio of Subham Sarkar, Software Architect & Systems Engineer building robust, scalable applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://subhamsarkar.dev",
  },
};


export const revalidate = 3600;

export default async function Home() {
  const featuredDossiers = await prisma.dossier.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <>
      <HeroSection />
      <ClientMarquee />
      <DisciplineStrip />
      <ValueProposition />
      <TrustStrip />
      <FeaturedWork featuredDossiers={featuredDossiers} />
      <ClosingCTA />
    </>
  );
}
