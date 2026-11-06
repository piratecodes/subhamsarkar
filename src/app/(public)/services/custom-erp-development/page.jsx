import ErpHero from "@/components/services/erp/ErpHero";
import ErpProblem from "@/components/services/erp/ErpProblem";
import ErpArchitecture from "@/components/services/erp/ErpArchitecture";
import ErpShowcase from "@/components/services/erp/ErpShowcase";
import ErpProcess from "@/components/services/erp/ErpProcess";
import ErpFAQ from "@/components/services/erp/ErpFAQ";
import ErpCTA from "@/components/services/erp/ErpCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getErpServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Custom ERP Development & Inventory Software",
  description:
    "Custom ERP software development company services by Subham Sarkar. Scalable multi-warehouse inventory management, GST billing, and zero per-user fees.",
  keywords: [
    "custom erp development",
    "erp software development company",
    "custom erp software development",
    "custom erp system",
    "inventory management software india",
    "custom software vs readymade software",
    "gst billing software for small business",
    "stock management software india"
  ],
  alternates: {
    canonical: "/services/custom-erp-development",
  },
  openGraph: {
    title: "Custom ERP Development & Inventory Software",
    description:
      "Custom ERP software development company services by Subham Sarkar. Scalable multi-warehouse inventory management, GST billing, and zero per-user fees.",
    url: "https://subhamsarkar.dev/services/custom-erp-development",
    siteName: "Subham Sarkar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom ERP Development & Inventory Software",
    description:
      "Custom ERP software development company services by Subham Sarkar. Scalable multi-warehouse inventory management, GST billing, and zero per-user fees.",
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

export default async function ErpServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        assignedServices: {
          array_contains: "erp"
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
        return Array.isArray(srv) && srv.includes("erp");
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query ERP dossiers:", error);
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
        return Array.isArray(srv) && srv.includes("erp");
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getErpServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-custom-erp-development" />
      <ErpHero />
      <ErpProblem />
      <ErpArchitecture />
      <ErpShowcase projects={projects} />
      <ErpProcess />
      <ErpFAQ />
      <ErpCTA />
    </>
  );
}

