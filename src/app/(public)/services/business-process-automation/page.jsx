import AiHero from "@/components/services/ai-agents/AiHero";
import AiProblem from "@/components/services/ai-agents/AiProblem";
import AiArchitecture from "@/components/services/ai-agents/AiArchitecture";
import AiShowcase from "@/components/services/ai-agents/AiShowcase";
import AiProcess from "@/components/services/ai-agents/AiProcess";
import AiFAQ from "@/components/services/ai-agents/AiFAQ";
import AiCTA from "@/components/services/ai-agents/AiCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getAiAgentsServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "AI Business Process Automation & System Integration",
  description:
    "Tailored AI business process automation and private AI agent integration services by Subham Sarkar. Eliminate repetitive clerical tasks with air-gapped machine intelligence.",
  keywords: [
    "business process automation",
    "ai business process automation",
    "ai agent development",
    "ai chatbot for business",
    "business process automation services",
    "process automation software",
    "how to automate my business",
    "whatsapp business ai",
    "enterprise process automation"
  ],
  alternates: {
    canonical: "/services/business-process-automation",
  },
  openGraph: {
    title: "AI Business Process Automation & System Integration",
    description:
      "Tailored AI business process automation and private AI agent integration services by Subham Sarkar. Eliminate repetitive clerical tasks with air-gapped machine intelligence.",
    url: "https://subhamsarkar.dev/services/business-process-automation",
    siteName: "Subham Sarkar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Process Automation & System Integration",
    description:
      "Tailored AI business process automation and private AI agent integration services by Subham Sarkar. Eliminate repetitive clerical tasks with air-gapped machine intelligence.",
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

export const revalidate = 3600;

export default async function AiAgentsServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        assignedServices: {
          array_contains: "ai-agents"
        }
      },
      orderBy: { createdAt: "desc" },
      take: 4
    });

    if (projects.length === 0) {
      const allPublished = await prisma.dossier.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 50
      });
      projects = allPublished.filter((d) => {
        const srv = Array.isArray(d.assignedServices)
          ? d.assignedServices
          : (typeof d.assignedServices === "string" ? JSON.parse(d.assignedServices || "[]") : []);
        return Array.isArray(srv) && srv.includes("ai-agents");
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query AI agent dossiers:", error);
    try {
      const allPublished = await prisma.dossier.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 50
      });
      projects = allPublished.filter((d) => {
        const srv = Array.isArray(d.assignedServices)
          ? d.assignedServices
          : (typeof d.assignedServices === "string" ? JSON.parse(d.assignedServices || "[]") : []);
        return Array.isArray(srv) && srv.includes("ai-agents");
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getAiAgentsServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-business-process-automation" />
      <AiHero />
      <AiProblem />
      <AiArchitecture />
      <AiShowcase projects={projects} />
      <AiProcess />
      <AiFAQ />
      <AiCTA />
    </>
  );
}

