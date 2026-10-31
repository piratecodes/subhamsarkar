import HeroSection from "@/components/about/HeroSection";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";
import { getSiteSettings } from "@/actions/settings";
import { getAboutPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "About | Subham Sarkar",
  description: "Learn about Subham Sarkar, Software Architect & Systems Engineer building scalable distributed applications.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/about",
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const schema = getAboutPageSchema(settings);

  return (
    <>
      <JsonLd data={schema} />
      <HeroSection />
      <CoreTraits />
      <Philosophy />
      <TargetAudience />
      <PersonalNote />
      <AboutCTA />
    </>
  );
}
