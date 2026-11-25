import HeroSection from "@/components/about/HeroSection";
import QuickFacts from "@/components/about/QuickFacts";
import CoreTraits from "@/components/about/CoreTraits";
import Philosophy from "@/components/about/Philosophy";
import TargetAudience from "@/components/about/TargetAudience";
import PersonalNote from "@/components/about/PersonalNote";
import AboutCTA from "@/components/about/AboutCTA";
import { getAboutPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/actions/settings";
import { META } from "@/data/pageMeta";

export const metadata = {
  title: { absolute: META.about.title },
  description: META.about.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: META.about.title,
    description: META.about.description,
    url: "https://subhamsarkar.dev/about",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/myimage_web.png",
        width: 1024,
        height: 1287,
        alt: "Subham Sarkar - Software Architect & Full-Stack Developer in Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META.about.title,
    description: META.about.description,
    images: ["/myimage_web.png"],
  },
};

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
