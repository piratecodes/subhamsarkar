import HeroSection from "@/components/services/HeroSection";
import ServiceCards from "@/components/services/ServiceCards";
import TopologyDiagram from "@/components/services/TopologyDiagram";
import EngagementModels from "@/components/services/EngagementModels";
import FAQ from "@/components/services/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata = {
  title: "Services",
  description: "Technical consulting and engineering services.",
};


import PageTracker from "@/components/PageTracker";

export default function ServicesPage() {
  return (
    <>
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
