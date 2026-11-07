import MigrationHero from "@/components/services/migration/MigrationHero";
import MigrationProblem from "@/components/services/migration/MigrationProblem";
import MigrationArchitecture from "@/components/services/migration/MigrationArchitecture";
import MigrationShowcase from "@/components/services/migration/MigrationShowcase";
import MigrationProcess from "@/components/services/migration/MigrationProcess";
import MigrationFAQ from "@/components/services/migration/MigrationFAQ";
import MigrationCTA from "@/components/services/migration/MigrationCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getSoftwareModernizationServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Legacy Software Modernization & Cloud Architecture",
  description:
    "Zero-downtime legacy software modernization and automated database migration services by Subham Sarkar. Migrate fragile databases, old monoliths, and Excel ledgers to scalable cloud architectures.",
  keywords: [
    "software modernization",
    "legacy software modernization",
    "legacy system migration",
    "migrating legacy applications to the cloud",
    "data migration from legacy systems to modern database",
    "application modernization software"
  ],
  alternates: {
    canonical: "/services/legacy-software-modernization",
  },
  openGraph: {
    title: "Legacy Software Modernization & Cloud Architecture",
    description:
      "Zero-downtime legacy software modernization and automated database migration services by Subham Sarkar. Migrate fragile databases, old monoliths, and Excel ledgers to scalable cloud architectures.",
    url: "https://subhamsarkar.dev/services/legacy-software-modernization",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy Software Modernization & Cloud Architecture",
    description:
      "Zero-downtime legacy software modernization and automated database migration services by Subham Sarkar. Migrate fragile databases, old monoliths, and Excel ledgers to scalable cloud architectures.",
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

export default async function SoftwareModernizationServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        OR: [
          { assignedServices: { array_contains: "software-modernization" } },
          { assignedServices: { array_contains: "legacy-migration" } }
        ]
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
        return Array.isArray(srv) && (srv.includes("software-modernization") || srv.includes("legacy-migration"));
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query modernization dossiers:", error);
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
        return Array.isArray(srv) && (srv.includes("software-modernization") || srv.includes("legacy-migration"));
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getSoftwareModernizationServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-legacy-software-modernization" />
      <MigrationHero />
      <MigrationProblem />
      <MigrationArchitecture />
      <MigrationShowcase projects={projects} />
      <MigrationProcess />
      <MigrationFAQ />
      <MigrationCTA />
    </>
  );
}

