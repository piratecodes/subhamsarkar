import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import ProcessTimelineFactors from "@/components/process/ProcessTimelineFactors";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";
import { getProcessPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Custom Software Development Process",
  description: "How a custom software project runs, step by step: discovery, planning, building, testing and launch, with clear milestones and support after launch.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/process",
  },
  openGraph: {
    title: "Custom Software Development Process | Subham Sarkar",
    description:
      "How a custom software project runs, step by step: discovery, planning, building, testing and launch, with clear milestones and support after launch.",
    url: "https://subhamsarkar.dev/services/application-security-audit",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Process | Subham Sarkar",
    description:
      "How a custom software project runs, step by step: discovery, planning, building, testing and launch, with clear milestones and support after launch.",
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ProcessPage() {
  const schema = getProcessPageSchema();

  return (
    <main className="bg-transparent">
      <JsonLd data={schema} />
      <HeroSection />
      <ProcessWorkflow />
      <ProcessTimelineFactors />
      <PostHandover />
      <ProcessFAQ />
      <ProcessCTA />
    </main>
  );
}
