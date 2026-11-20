import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function escapeXmlAttr(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(str) {
  if (!str) return "";
  return `<![CDATA[${String(str).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function formatRfc822Ist(dateInput) {
  const d = new Date(dateInput);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(d);
  const partMap = {};
  parts.forEach(p => { partMap[p.type] = p.value; });

  return `${partMap.weekday}, ${partMap.day} ${partMap.month} ${partMap.year} ${partMap.hour}:${partMap.minute}:${partMap.second} +0530`;
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
        const pubDate = formatRfc822Ist(post.createdAt);
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
          
          enclosureTag = `<enclosure url="${escapeXmlAttr(imageUrl)}" length="102400" type="${mimeType}" />`;
          mediaTag = `<media:content url="${escapeXmlAttr(imageUrl)}" medium="image" type="${mimeType}" />`;
        }

        const categoryTag = post.category
          ? `<category>${cdata(post.category)}</category>`
          : "";

        return `    <item>
      <title>${cdata(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${cdata(description)}</description>
      <dc:creator>${cdata(authorName)}</dc:creator>
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
    <title>${cdata("Subham Sarkar | Industry Insights")}</title>
    <link>${baseUrl}/insights</link>
    <description>${cdata("Practical engineering guides on custom ERP, CRM, full-stack web and mobile apps, and application security for growing businesses in India by Subham Sarkar.")}</description>
    <language>en-in</language>
    <lastBuildDate>${formatRfc822Ist(new Date())}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
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

