import HeroSection from "@/components/about/HeroSection";
import QuickFacts from "@/components/about/QuickFacts";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";
import { getAboutPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/actions/settings";
import { META } from "@/data/pageMeta";

export const metadata = buildMetadata({
  title: {
    absolute: "About Subham Sarkar | Software Architect in Kolkata",
  },
  description:
    "Meet Subham Sarkar - software architect and full-stack developer in Kolkata with over a decade of experience building custom ERP, CRM, secure web and mobile applications, and AI automation for businesses across India.",
  alternates:{
    canonical: "/about",
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
  image: "/myimage_web.png",
  imageAlt: "Subham Sarkar - Software Architect & Full-Stack Developer in Kolkata",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const schema = getAboutPageSchema(settings);

  return (
    <>
      <JsonLd data={schema} />
      <HeroSection />
      <QuickFacts settings={settings} />
      <CoreTraits />
      <Philosophy />
      <TargetAudience />
      <PersonalNote />
      <AboutCTA />
    </>
  );
}
