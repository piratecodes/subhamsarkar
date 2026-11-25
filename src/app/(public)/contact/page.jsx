import HeroSection from "@/components/contact/HeroSection";
import TransmissionPortal from "@/components/contact/TransmissionPortal";
import TransmissionPipeline from "@/components/contact/TransmissionPipeline";
import StudioElevation from "@/components/contact/StudioElevation";
import PreTransmissionFAQ from "@/components/contact/PreTransmissionFAQ";
import ConfidentialityPledge from "@/components/contact/ConfidentialityPledge";
import { getSiteSettings } from "@/actions/settings";
import PageTracker from "@/components/PageTracker";
import { getContactPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { META } from "@/data/pageMeta";

export const metadata = {
  title: { absolute: META.contact.title },
  description: META.contact.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: META.contact.title,
    description: META.contact.description,
    url: "https://subhamsarkar.dev/contact",
  },
  twitter: {
    title: META.contact.title,
    description: META.contact.description,
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
