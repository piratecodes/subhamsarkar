import AiHero from "@/components/services/ai-agents/AiHero";
import AiProblem from "@/components/services/ai-agents/AiProblem";
import AiArchitecture from "@/components/services/ai-agents/AiArchitecture";
import AiShowcase from "@/components/services/ai-agents/AiShowcase";
import AutomationUseCases from "@/components/services/ai-agents/AutomationUseCases";
import AiProcess from "@/components/services/ai-agents/AiProcess";
import AutomationCostAndTimeline from "@/components/services/ai-agents/AutomationCostAndTimeline";
import AiFAQ from "@/components/services/ai-agents/AiFAQ";
import AiCTA from "@/components/services/ai-agents/AiCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getAiAgentsServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Business Process Automation with AI",
  description:
    "Business process automation with AI: document reading, workflow automation and human approval gates, built around your data privacy. Scoped per project.",
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
    title: "Business Process Automation with AI | Subham Sarkar",
    description:
      "Business process automation with AI: document reading, workflow automation and human approval gates, built around your data privacy. Scoped per project.",
    url: "https://subhamsarkar.dev/services/business-process-automation",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Process Automation with AI | Subham Sarkar",
    description:
      "Business process automation with AI: document reading, workflow automation and human approval gates, built around your data privacy. Scoped per project.",
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
      <AutomationUseCases />
      <AiProcess />
      <AutomationCostAndTimeline />
      <AiFAQ />
      <AiCTA />
    </>
  );
}

