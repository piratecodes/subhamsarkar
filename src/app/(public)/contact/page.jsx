import HeroSection from "@/components/contact/HeroSection";
import TransmissionPortal from "@/components/contact/TransmissionPortal";
import TransmissionPipeline from "@/components/contact/TransmissionPipeline";
import StudioElevation from "@/components/contact/StudioElevation";
import PreTransmissionFAQ from "@/components/contact/PreTransmissionFAQ";
import ConfidentialityPledge from "@/components/contact/ConfidentialityPledge";

// ==========================================
// SERVER ACTIONS IMPORTS
// Fetching the global settings (emails, links) for the contact form
// ==========================================
import { getSiteSettings } from "@/actions/settings";

export const metadata = {
  title: "Contact | Subham Sarkar — Software Architect",
  description: "Initiate a direct architectural transmission with Subham Sarkar.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/contact",
  },
};

import PageTracker from "@/components/PageTracker";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageTracker pageType="contact" />
      <HeroSection />
      <TransmissionPortal settings={settings} />
      <TransmissionPipeline />
      <StudioElevation />
      <PreTransmissionFAQ />
      <ConfidentialityPledge />
    </>
  );
}
