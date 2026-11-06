import HeroSection from "@/components/landing/HeroSection";
import ClientMarquee from "@/components/landing/ClientMarquee";
import DisciplineStrip from "@/components/landing/DisciplineStrip";
import ValueProposition from "@/components/landing/ValueProposition";
import TrustStrip from "@/components/landing/TrustStrip";
import FeaturedWork from "@/components/landing/FeaturedWork";
import ClosingCTA from "@/components/landing/ClosingCTA";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/actions/settings";
import { getHomePageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: { absolute: "Subham Sarkar | ERP & CRM Developer in Kolkata, India" },
  description: "Subham Sarkar is a software architect and ERP/CRM developer in Kolkata building custom ERP, CRM, web, mobile apps and AI automation for businesses across India.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function Home() {
  const [settings, featuredDossiers] = await Promise.all([
    getSiteSettings(),
    prisma.dossier.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  const schema = getHomePageSchema();

  return (
    <>
      <JsonLd data={schema} />
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
