import SecurityHero from "@/components/services/security-audit/SecurityHero";
import SecurityProblem from "@/components/services/security-audit/SecurityProblem";
import SecurityArchitecture from "@/components/services/security-audit/SecurityArchitecture";
import SecurityShowcase from "@/components/services/security-audit/SecurityShowcase";
import SecurityProcess from "@/components/services/security-audit/SecurityProcess";
import SecurityFAQ from "@/components/services/security-audit/SecurityFAQ";
import SecurityCTA from "@/components/services/security-audit/SecurityCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getSecurityAuditServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Application Security Audit & Infrastructure Hardening",
  description:
    "Comprehensive architectural penetration testing, OWASP hardening, zero-trust RBAC, and threat mitigation by Subham Sarkar with direct code remediations.",
  keywords: [
    "Application security audit",
    "API penetration testing",
    "zero-trust RBAC hardening",
    "Subham Sarkar",
    "OWASP Top 10 remediation",
    "rate limiting bot protection",
    "cloud security engineer",
    "cybersecurity architect"
  ],
  alternates: {
    canonical: "/services/application-security-audit",
  },
  openGraph: {
    title: "Application Security Audit & Infrastructure Hardening",
    description:
      "Comprehensive architectural penetration testing, OWASP hardening, zero-trust RBAC, and threat mitigation by Subham Sarkar.",
    url: "https://subhamsarkar.dev/services/application-security-audit",
    siteName: "Subham Sarkar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Application Security Audit & Infrastructure Hardening",
    description:
      "Comprehensive architectural penetration testing, OWASP hardening, zero-trust RBAC, and threat mitigation by Subham Sarkar.",
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
      <SecurityArchitecture />
      <SecurityShowcase projects={projects} />
      <SecurityProcess />
      <SecurityFAQ />
      <SecurityCTA />
    </>
  );
}

