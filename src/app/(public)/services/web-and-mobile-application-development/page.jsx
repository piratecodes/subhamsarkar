import WebMobileHero from "@/components/services/web-mobile/WebMobileHero";
import WebMobileProblem from "@/components/services/web-mobile/WebMobileProblem";
import WebMobileArchitecture from "@/components/services/web-mobile/WebMobileArchitecture";
import WebMobileShowcase from "@/components/services/web-mobile/WebMobileShowcase";
import WebMobileProcess from "@/components/services/web-mobile/WebMobileProcess";
import WebMobileFAQ from "@/components/services/web-mobile/WebMobileFAQ";
import WebMobileCTA from "@/components/services/web-mobile/WebMobileCTA";
import { prisma } from "@/lib/prisma";
import PageTracker from "@/components/PageTracker";
import { getWebMobileServiceSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Custom Web Application & Mobile App Development",
  description:
    "Custom web application development and mobile app development services by Subham Sarkar. Offline-first mobile apps, real-time sync, and modern cloud architecture.",
  keywords: [
    "custom web application development",
    "web and mobile app development services",
    "custom web app development company",
    "app development company in kolkata",
    "software development company in kolkata",
    "custom ecommerce app development"
  ],
  alternates: {
    canonical: "/services/web-and-mobile-application-development",
  },
  openGraph: {
    title: "Custom Web Application & Mobile App Development",
    description:
      "Custom web application development and mobile app development services by Subham Sarkar. Offline-first mobile apps, real-time sync, and modern cloud architecture.",
    url: "https://subhamsarkar.dev/services/web-and-mobile-application-development",
    siteName: "Subham Sarkar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Subham Sarkar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web Application & Mobile App Development",
    description:
      "Custom web application development and mobile app development services by Subham Sarkar. Offline-first mobile apps, real-time sync, and modern cloud architecture.",
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

export default async function WebMobileServicePage() {
  let projects = [];
  try {
    projects = await prisma.dossier.findMany({
      where: {
        isPublished: true,
        assignedServices: {
          array_contains: "web-mobile"
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
        return Array.isArray(srv) && srv.includes("web-mobile");
      }).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to query web-mobile dossiers:", error);
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
        return Array.isArray(srv) && srv.includes("web-mobile");
      }).slice(0, 4);
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
    }
  }

  const schema = getWebMobileServiceSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageTracker pageType="service-web-and-mobile-application-development" />
      <WebMobileHero />
      <WebMobileProblem />
      <WebMobileArchitecture />
      <WebMobileShowcase projects={projects} />
      <WebMobileProcess />
      <WebMobileFAQ />
      <WebMobileCTA />
    </>
  );
}
