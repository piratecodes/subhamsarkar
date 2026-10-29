import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = 'https://subhamsarkar.dev';

  const insights = await prisma.insight.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true }
  });

  const insightUrls = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: insight.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/process`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }
  ];

  return [...staticRoutes, ...insightUrls];
}
