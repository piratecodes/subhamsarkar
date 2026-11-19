import HeroSection from "@/components/about/HeroSection";
import QuickFacts from "@/components/about/QuickFacts";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";
import { getAboutPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/actions/settings";

export const metadata = buildMetadata({
  title: {
    absolute: "About Subham Sarkar | Software Architect in Kolkata",
  },
  description:
    "Meet Subham Sarkar — software architect and full-stack developer in Kolkata with over a decade of experience building custom ERP, CRM, secure web and mobile applications, and AI automation for businesses across India.",
  canonical: "/about",
  image: "/myimage_web.png",
  imageAlt: "Subham Sarkar - Software Architect & Full-Stack Developer in Kolkata",
  keywords: [
    "Subham Sarkar",
    "Software Architect Kolkata",
    "Full-Stack Developer Kolkata",
    "ERP Developer India",
    "CRM Developer Kolkata",
    "Application Security Audit",
  ],
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
