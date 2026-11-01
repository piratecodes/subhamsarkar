import HeroSection from "@/components/about/HeroSection";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";
import { getAboutPageSchema } from "@/lib/schema/pages";
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

export default function AboutPage() {
  const schema = getAboutPageSchema();

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
