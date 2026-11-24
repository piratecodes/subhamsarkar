import CrmHero from "@/components/services/crm/CrmHero";
import CrmProblem from "@/components/services/crm/CrmProblem";
import CrmBuildOrBuy from "@/components/services/crm/CrmBuildOrBuy";
import CrmArchitecture from "@/components/services/crm/CrmArchitecture";
import CrmShowcase from "@/components/services/crm/CrmShowcase";
import CrmProcess from "@/components/services/crm/CrmProcess";
import CrmCostAndTimeline from "@/components/services/crm/CrmCostAndTimeline";
import CrmFAQ from "@/components/services/crm/CrmFAQ";
import CrmCTA from "@/components/services/crm/CrmCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getCrmServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Custom CRM Software Development Services",
  description:
    "Custom CRM software development services: leads, follow-ups, quotes and customer history in one system fitted to your sales process. Scoped per project.",
  keywords: [
    "custom crm development",
    "crm development company",
    "custom crm software development",
    "crm development companies in india",
    "lead management system",
    "sales lead tracking software",
    "crm for small business india",
    "lead management software"
  ],
  alternates: {
    canonical: "/services/custom-crm-development",
  },
  openGraph: {
    title: "Custom CRM Software Development Services | Subham Sarkar",
    description:
      "Custom CRM software development services: leads, follow-ups, quotes and customer history in one system fitted to your sales process. Scoped per project.",
    url: "https://subhamsarkar.dev/services/custom-crm-development",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom CRM Software Development Services | Subham Sarkar",
    description:
      "Custom CRM software development services: leads, follow-ups, quotes and customer history in one system fitted to your sales process. Scoped per project.",
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

export default async function CrmServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        assignedServices: {
          array_contains: "crm"
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
        return Array.isArray(srv) && srv.includes("crm");
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query CRM dossiers:", error);
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
        return Array.isArray(srv) && srv.includes("crm");
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getCrmServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-custom-crm-development" />
      <CrmHero />
      <CrmProblem />
      <CrmBuildOrBuy />
      <CrmArchitecture />
      <CrmShowcase projects={projects} />
      <CrmProcess />
      <CrmCostAndTimeline />
      <CrmFAQ />
      <CrmCTA />
    </>
  );
}

