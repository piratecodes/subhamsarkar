import HeroSection from "@/components/about/HeroSection";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";

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
  return (
    <>
      <HeroSection />
      <CoreTraits />
      <Philosophy />
      <TargetAudience />
      <PersonalNote />
      <AboutCTA />
    </>
  );
}
