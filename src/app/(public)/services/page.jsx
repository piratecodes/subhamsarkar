import HeroSection from "@/components/services/HeroSection";
import ServiceCards from "@/components/services/ServiceCards";
import TopologyDiagram from "@/components/services/TopologyDiagram";
import EngagementModels from "@/components/services/EngagementModels";
import FAQ from "@/components/services/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import PageTracker from "@/components/PageTracker";
import { getServicesPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Services",
  description: "Technical consulting, system design, and software architecture services by Subham Sarkar.",
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
      <TopologyDiagram />
      <EngagementModels />
      <FAQ />
      <ServicesCTA />
    </>
  );
}
