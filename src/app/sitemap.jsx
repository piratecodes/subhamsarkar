import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

// Update these date constants whenever a static page's content changes
const PAGE_LASTMOD = {
  "/": "2026-11-01",
  "/about": "2026-11-01",
  "/services": "2026-11-01",
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
    { url: `${baseUrl}/work`, lastModified: PAGE_LASTMOD["/work"] },
    { url: `${baseUrl}/process`, lastModified: PAGE_LASTMOD["/process"] },
    { url: `${baseUrl}/contact`, lastModified: PAGE_LASTMOD["/contact"] },
    { url: `${baseUrl}/insights`, lastModified: PAGE_LASTMOD["/insights"] },
    { url: `${baseUrl}/privacy-policy`, lastModified: PAGE_LASTMOD["/privacy-policy"] },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: PAGE_LASTMOD["/terms-and-conditions"] },
  ];

  return [...staticRoutes, ...insightUrls];
}
