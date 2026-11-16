import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://subhamsarkar.dev";

  try {
    const insights = await prisma.insight.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        author: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    const itemsXml = insights
      .map((post) => {
        const postUrl = `${baseUrl}/insights/${post.slug}`;
        const pubDate = new Date(post.createdAt).toUTCString();
        const description = post.excerpt || post.seoMetaDescription || "";
        const authorName = post.customAuthor || 
          (post.author ? `${post.author.firstName} ${post.author.lastName}`.trim() : "Subham Sarkar");

        let mediaTag = "";
        let enclosureTag = "";
        if (post.coverImage) {
          const rawUrl = post.coverImage;
          const imageUrl = rawUrl.startsWith("http")
            ? rawUrl
            : `${baseUrl}${rawUrl.startsWith("/") ? rawUrl : "/" + rawUrl}`;
          const mimeType = imageUrl.endsWith(".png") ? "image/png" : "image/jpeg";
          
          enclosureTag = `<enclosure url="${escapeXml(imageUrl)}" length="0" type="${mimeType}" />`;
          mediaTag = `<media:content url="${escapeXml(imageUrl)}" medium="image" type="${mimeType}" />`;
        }

        const categoryTag = post.category
          ? `<category>${escapeXml(post.category)}</category>`
          : "";

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(description)}</description>
      <dc:creator>${escapeXml(authorName)}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      ${categoryTag}
      ${enclosureTag}
      ${mediaTag}
    </item>`;
      })
      .join("\n");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Subham Sarkar | Industry Insights</title>
    <link>${baseUrl}/insights</link>
    <description>Practical engineering guides on custom ERP, CRM, full-stack web and mobile apps, and application security for growing businesses in India by Subham Sarkar.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title></channel></rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}

