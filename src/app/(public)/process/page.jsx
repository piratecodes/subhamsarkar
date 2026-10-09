import HeroSection from "@/components/process/HeroSection";
import ProcessWorkflow from "@/components/process/ProcessWorkflow";
import PostHandover from "@/components/process/PostHandover";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessCTA from "@/components/process/ProcessCTA";

export const metadata = {
  title: "Process",
  description: "Software engineering and architecture process.",
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
