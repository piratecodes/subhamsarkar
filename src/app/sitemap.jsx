import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

// Update these date constants whenever a static page's content changes
const PAGE_LASTMOD = {
  "/": "2026-11-01",
  "/about": "2026-11-01",
  "/services": "2026-11-01",
  "/services/custom-erp-development": "2026-11-07",
  "/services/custom-crm-development": "2026-11-07",
  "/services/web-and-mobile-application-development": "2026-11-07",
  "/services/business-process-automation": "2026-11-07",
  "/services/legacy-software-modernization": "2026-11-07",
  "/services/application-security-audit": "2026-11-07",
  "/work": "2026-11-01",
  "/process": "2026-11-01",
  "/contact": "2026-11-01",
  "/insights": "2026-11-01",
  "/privacy-policy": "2026-11-01",
  "/terms-and-conditions": "2026-11-01",
};

export default async function sitemap() {
  const baseUrl = "https://subhamsarkar.dev";

  const insights = await prisma.insight.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  const insightUrls = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: insight.updatedAt,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: PAGE_LASTMOD["/"] },
    { url: `${baseUrl}/about`, lastModified: PAGE_LASTMOD["/about"] },
    { url: `${baseUrl}/services`, lastModified: PAGE_LASTMOD["/services"] },
    { url: `${baseUrl}/services/custom-erp-development`, lastModified: PAGE_LASTMOD["/services/custom-erp-development"] },
    { url: `${baseUrl}/services/custom-crm-development`, lastModified: PAGE_LASTMOD["/services/custom-crm-development"] },
    { url: `${baseUrl}/services/web-and-mobile-application-development`, lastModified: PAGE_LASTMOD["/services/web-and-mobile-application-development"] },
    { url: `${baseUrl}/services/business-process-automation`, lastModified: PAGE_LASTMOD["/services/business-process-automation"] },
    { url: `${baseUrl}/services/legacy-software-modernization`, lastModified: PAGE_LASTMOD["/services/legacy-software-modernization"] },
    { url: `${baseUrl}/services/application-security-audit`, lastModified: PAGE_LASTMOD["/services/application-security-audit"] },
    { url: `${baseUrl}/work`, lastModified: PAGE_LASTMOD["/work"] },
    { url: `${baseUrl}/process`, lastModified: PAGE_LASTMOD["/process"] },
    { url: `${baseUrl}/contact`, lastModified: PAGE_LASTMOD["/contact"] },
    { url: `${baseUrl}/insights`, lastModified: PAGE_LASTMOD["/insights"] },
    { url: `${baseUrl}/privacy-policy`, lastModified: PAGE_LASTMOD["/privacy-policy"] },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: PAGE_LASTMOD["/terms-and-conditions"] },
  ];

  return [...staticRoutes, ...insightUrls];
}
