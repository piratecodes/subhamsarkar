import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";
import { getSiteSettings } from "@/actions/settings";
import { getProcessPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Process | Subham Sarkar",
  description: "End-to-end software engineering and system architecture delivery methodology.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/process",
  },
};

export default async function ProcessPage() {
  const settings = await getSiteSettings();
  const schema = getProcessPageSchema(settings);

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
