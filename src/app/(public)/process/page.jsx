import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";

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


export default function ProcessPage() {
  return (
    <main className="bg-transparent">
      <HeroSection />
      <ProcessWorkflow />
      <PostHandover />
      <ProcessFAQ />
      <ProcessCTA />
    </main>
  );
}
