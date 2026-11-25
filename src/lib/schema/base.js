/**
 * Base Schema.org entities and constants for subhamsarkar.dev
 * Person and WebSite are defined once in the root layout.
 * AREA_SERVED is defined once and reused in Service nodes and ContactPoint.
 */

export const BASE_URL = "https://subhamsarkar.dev";

export const AREA_SERVED = [ { "@type": "Country", name: "India" }, "Worldwide" ];

export function getPersonSchema(settings) {
  const sameAs = [
    "https://github.com/piratecodes",
    "https://linkedin.com/in/subhamsarkar99",
    "https://instagram.com/subhamsarkar99"
  ];

  const xCandidate = settings?.twitter || settings?.x;
  if (xCandidate && typeof xCandidate === "string" && xCandidate.trim()) {
    const trimmed = xCandidate.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      sameAs.push(trimmed);
    } else if (trimmed.startsWith("x.com/") || trimmed.startsWith("twitter.com/")) {
      sameAs.push(`https://${trimmed}`);
    } else {
      const handle = trimmed.replace(/^@/, "");
      if (handle) {
        sameAs.push(`https://x.com/${handle}`);
      }
    }
  }

  return {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Subham Sarkar",
    jobTitle: "Software Architect and Full-Stack Developer",
    url: BASE_URL,
    image: `${BASE_URL}/myimage_web.png`,
    description: "Software Architect and Full-Stack Developer with over a decade of experience designing and building custom ERP, CRM, web and mobile application systems that businesses run on.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: settings?.email || "hello@subhamsarkar.dev",
      availableLanguage: ["en", "hi", "bn"],
      areaServed: AREA_SERVED
    },
    sameAs,
    knowsAbout: [
      "Enterprise Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "Software Architecture",
      "Custom Software Development",
      "Web and Mobile App Development",
      "Application Security Audit",
      "Application Security & Vulnerability Assessment",
      "AI Agent Integration",
      "Legacy System Migration",
      "Full-Stack Development",
      "System Engineering"
    ]
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Subham Sarkar",
    alternateName: [
      "SubhamSarkar.dev",
      "subhamsarkar.dev",
      "Subham Sarkar Portfolio"
    ],
    url: BASE_URL,
    image: `${BASE_URL}/myimage_web.png`,
    publisher: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Subham Sarkar",
      url: BASE_URL
    },
    inLanguage: "en-IN"
  };
}
