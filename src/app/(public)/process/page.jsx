import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";
import { getProcessPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Process",
  description: "End-to-end software engineering and system architecture delivery methodology.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/process",
  },
};

export default function ProcessPage() {
  const schema = getProcessPageSchema();

  return (
    <main className="bg-transparent">
      <JsonLd data={schema} />
      <HeroSection />
      <ProcessWorkflow />
      <PostHandover />
      <ProcessFAQ />
      <ProcessCTA />
    </main>
  );
}
