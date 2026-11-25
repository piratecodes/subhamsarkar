import HeroSection from "@/components/services/HeroSection";
import ServiceCards from "@/components/services/ServiceCards";
import ChooseAService from "@/components/services/ChooseAService";
import TopologyDiagram from "@/components/services/TopologyDiagram";
import EngagementModels from "@/components/services/EngagementModels";
import FAQ from "@/components/services/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import PageTracker from "@/components/PageTracker";
import { getServicesPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { META } from "@/data/pageMeta";

export const metadata = {
  title: META.services.baseTitle,
  description: META.services.description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: META.services.title,
    description: META.services.description,
    url: "https://subhamsarkar.dev/services",
  },
  twitter: {
    title: META.services.title,
    description: META.services.description,
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
