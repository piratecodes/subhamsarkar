import SecurityHero from "@/components/services/security-audit/SecurityHero";
import SecurityProblem from "@/components/services/security-audit/SecurityProblem";
import SecurityAuditOptions from "@/components/services/security-audit/SecurityAuditOptions";
import SecurityArchitecture from "@/components/services/security-audit/SecurityArchitecture";
import SecurityShowcase from "@/components/services/security-audit/SecurityShowcase";
import SecurityProcess from "@/components/services/security-audit/SecurityProcess";
import SecurityCostAndTimeline from "@/components/services/security-audit/SecurityCostAndTimeline";
import SecurityFAQ from "@/components/services/security-audit/SecurityFAQ";
import SecurityCTA from "@/components/services/security-audit/SecurityCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getSecurityAuditServiceSchema } from "@/lib/schema/page";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES } from "@/data/pageMeta";

const svc = SERVICES.find((s) => s.slug === "application-security-audit");

export const metadata = {
  title: svc.baseTitle,
  description: svc.description,
  alternates: {
    canonical: `/services/${svc.slug}`,
  },
  openGraph: {
    title: svc.title,
    description: svc.description,
    url: `https://subhamsarkar.dev/services/${svc.slug}`,
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: svc.title,
    description: svc.description,
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

export default async function SecurityAuditServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        assignedServices: {
          array_contains: "security-audit"
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
        return Array.isArray(srv) && srv.includes("security-audit");
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query security dossiers:", error);
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
        return Array.isArray(srv) && srv.includes("security-audit");
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getSecurityAuditServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-application-security-audit" />
      <SecurityHero />
      <SecurityProblem />
      <SecurityAuditOptions />
      <SecurityArchitecture />
      <SecurityShowcase projects={projects} />
      <SecurityProcess />
      <SecurityCostAndTimeline />
      <SecurityFAQ />
      <SecurityCTA />
    </>
  );
}

