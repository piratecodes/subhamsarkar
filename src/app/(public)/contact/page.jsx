import HeroSection from "@/components/contact/HeroSection";
import TransmissionPortal from "@/components/contact/TransmissionPortal";
import TransmissionPipeline from "@/components/contact/TransmissionPipeline";
import StudioElevation from "@/components/contact/StudioElevation";
import PreTransmissionFAQ from "@/components/contact/PreTransmissionFAQ";
import ConfidentialityPledge from "@/components/contact/ConfidentialityPledge";
import { getSiteSettings } from "@/actions/settings";
import PageTracker from "@/components/PageTracker";
import { getContactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

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

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const schema = getContactPageSchema(settings);

  return (
    <>
      <JsonLd data={schema} />
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
