import HeroSection from "@/components/services/HeroSection";
import ServiceCards from "@/components/services/ServiceCards";
import ChooseAService from "@/components/services/ChooseAService";
import TopologyDiagram from "@/components/services/TopologyDiagram";
import EngagementModels from "@/components/services/EngagementModels";
import FAQ from "@/components/services/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import PageTracker from "@/components/PageTracker";
import { getServicesPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Custom Software Development Services",
  description: "Custom software development in Kolkata and worldwide: ERP, CRM, web and mobile apps, AI automation, modernization and security audits by Subham Sarkar.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/services",
  },
};

export default function ServicesPage() {
  const schema = getServicesPageSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="services" />
      <HeroSection />
      <ServiceCards />
      <ChooseAService />
      <TopologyDiagram />
      <EngagementModels />
      <FAQ />
      <ServicesCTA />
    </>
  );
}
