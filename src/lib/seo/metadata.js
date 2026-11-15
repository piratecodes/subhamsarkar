/**
 * Centralized SEO & Social Metadata Builder for Subham Sarkar
 * Produces fully-compliant Next.js Metadata objects with OpenGraph and Twitter card specs.
 * Guarantees absolute URLs, 1200x630 dimensions, and seamless fallbacks for WhatsApp and social scrapers.
 */

export const SITE_URL = "https://subhamsarkar.dev";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const DEFAULT_META = {
  title: "Subham Sarkar | ERP & CRM Developer in Kolkata, India",
  description:
    "Subham Sarkar is a software architect and ERP/CRM developer in Kolkata building custom ERP, CRM, web, mobile apps and AI automation for businesses across India.",
  siteName: "Subham Sarkar",
  locale: "en_IN",
};

/**
 * Resolves any image URL to a fully-qualified, absolute HTTPS URL.
 */
export function resolveImageUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Builds a bulletproof Next.js metadata object.
 *
 * @param {Object} options
 * @param {string} [options.title] - Page title (or fallback to default)
 * @param {string} [options.description] - Page description / excerpt
 * @param {string} [options.canonical] - Canonical path or full URL
 * @param {string|null} [options.image] - Custom featured/cover image URL
 * @param {string} [options.imageAlt] - Alt text for custom image
 * @param {'website'|'article'} [options.type='website'] - OpenGraph type
 * @param {string} [options.publishedTime] - ISO date string for articles
 * @param {string} [options.modifiedTime] - ISO date string for articles
 * @param {string|string[]} [options.authors] - Author name(s)
 * @param {string} [options.section] - Category/section name
 * @param {string|string[]} [options.keywords] - Target keywords
 * @param {boolean} [options.noIndex=false] - Robots noindex flag
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  title,
  description,
  canonical,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  keywords,
  noIndex = false,
} = {}) {
  const metaTitle = title || DEFAULT_META.title;
  const metaDescription = description || DEFAULT_META.description;

  // Resolve canonical URL
  let canonicalUrl = SITE_URL;
  if (canonical) {
    if (canonical.startsWith("http://") || canonical.startsWith("https://")) {
      canonicalUrl = canonical;
    } else {
      canonicalUrl = `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
    }
  }

  // Resolve Images: primary custom image + guaranteed fallback
  const customImageUrl = resolveImageUrl(image);
  const images = [];

  if (customImageUrl) {
    images.push({
      url: customImageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt || metaTitle,
      type: customImageUrl.endsWith(".png") ? "image/png" : "image/jpeg",
    });
  }

  // Always supply the high-resolution site banner as backup
  images.push({
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "Subham Sarkar - Custom ERP & CRM Developer in Kolkata",
    type: "image/jpeg",
  });

  // Normalize keywords
  let normalizedKeywords = [];
  if (Array.isArray(keywords)) {
    normalizedKeywords = keywords;
  } else if (typeof keywords === "string" && keywords.trim()) {
    normalizedKeywords = keywords.split(",").map((k) => k.trim()).filter(Boolean);
  }

  // Build OpenGraph Object
  const openGraph = {
    title: metaTitle,
    description: metaDescription,
    url: canonicalUrl,
    siteName: DEFAULT_META.siteName,
    locale: DEFAULT_META.locale,
    type,
    images,
  };

  if (type === "article") {
    if (publishedTime) openGraph.publishedTime = publishedTime;
    if (modifiedTime) openGraph.modifiedTime = modifiedTime;
    if (authors) {
      openGraph.authors = Array.isArray(authors) ? authors : [authors];
    }
    if (section) openGraph.section = section;
  }

  // Build Twitter Object
  const twitter = {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    images: [images[0].url], // Twitter uses the primary image
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: metaTitle,
    description: metaDescription,
    ...(normalizedKeywords.length > 0 && { keywords: normalizedKeywords }),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph,
    twitter,
  };
}

