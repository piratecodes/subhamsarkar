import HeroSection from "@/components/services/HeroSection";
import ServiceCards from "@/components/services/ServiceCards";
import TopologyDiagram from "@/components/services/TopologyDiagram";
import EngagementModels from "@/components/services/EngagementModels";
import FAQ from "@/components/services/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import PageTracker from "@/components/PageTracker";
import { getSiteSettings } from "@/actions/settings";
import { getServicesPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Services | Subham Sarkar",
  description: "Technical consulting, system design, and software architecture services by Subham Sarkar.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/services",
  },
};

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const schema = getServicesPageSchema(settings);

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
