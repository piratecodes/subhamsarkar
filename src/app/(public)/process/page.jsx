import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import ProcessTimelineFactors from "@/components/process/ProcessTimelineFactors";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";
import { getProcessPageSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { META } from "@/data/pageMeta";

export const metadata = {
  title: META.process.baseTitle,
  description: META.process.description,
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: META.process.title,
    description: META.process.description,
    url: "https://subhamsarkar.dev/process",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: META.process.title,
    description: META.process.description,
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
