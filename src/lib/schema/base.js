/**
 * Base Schema.org entities and constants for subhamsarkar.dev
 * Person and WebSite are defined once in the root layout.
 * AREA_SERVED is defined once and reused in Service nodes and ContactPoint.
 */

export const BASE_URL = "https://subhamsarkar.dev";

export const AREA_SERVED = [
  { "@type": "Country", name: "India" },
  { "@type": "State", name: "West Bengal" },
  { "@type": "State", name: "Chhattisgarh" },
  { "@type": "State", name: "Maharashtra" },
  // Priority (listed first)
  { "@type": "City", name: "Kolkata" },
  { "@type": "City", name: "Pune" },
  { "@type": "City", name: "Raipur" },
  // Tier 1
  { "@type": "City", name: "Mumbai" },
  { "@type": "City", name: "Delhi" },
  { "@type": "City", name: "Bengaluru" },
  { "@type": "City", name: "Hyderabad" },
  { "@type": "City", name: "Chennai" },
  { "@type": "City", name: "Ahmedabad" },
  // Tier 2
  { "@type": "City", name: "Jaipur" },
  { "@type": "City", name: "Lucknow" },
  { "@type": "City", name: "Chandigarh" },
  { "@type": "City", name: "Indore" },
  { "@type": "City", name: "Bhopal" },
  { "@type": "City", name: "Nagpur" },
  { "@type": "City", name: "Surat" },
  { "@type": "City", name: "Vadodara" },
  { "@type": "City", name: "Kochi" },
  { "@type": "City", name: "Coimbatore" },
  { "@type": "City", name: "Visakhapatnam" },
  { "@type": "City", name: "Patna" },
  { "@type": "City", name: "Bhubaneswar" },
  { "@type": "City", name: "Ranchi" },
  { "@type": "City", name: "Guwahati" },
  { "@type": "City", name: "Dehradun" },
  { "@type": "City", name: "Noida" },
  { "@type": "City", name: "Gurugram" },
  // Tier 3
  { "@type": "City", name: "Siliguri" },
  { "@type": "City", name: "Durgapur" },
  { "@type": "City", name: "Asansol" },
  { "@type": "City", name: "Howrah" },
  { "@type": "City", name: "Bhilai" },
  { "@type": "City", name: "Bilaspur" },
  { "@type": "City", name: "Jamshedpur" },
  { "@type": "City", name: "Kanpur" },
  { "@type": "City", name: "Varanasi" },
  { "@type": "City", name: "Agra" },
  { "@type": "City", name: "Ludhiana" },
  { "@type": "City", name: "Nashik" },
  { "@type": "City", name: "Rajkot" },
  { "@type": "City", name: "Cuttack" }
];

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
    "@id": "/#person",
    name: "Subham Sarkar",
    jobTitle: "Software Architect & Developer",
    url: BASE_URL,
    image: `${BASE_URL}/icons/icon-512x512.png`,
    description: "Software architect and developer with over a decade of experience designing and building custom ERP, CRM, web and mobile systems that businesses run on.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN"
    },
    sameAs,
    knowsAbout: [
      "Enterprise Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "Software Architecture",
      "Custom Software Development",
      "Web and Mobile App Development",
      "AI Agent Integration",
      "Legacy System Migration"
    ]
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": "/#website",
    name: "Subham Sarkar",
    alternateName: "SubhamSarkar.Dev",
    url: BASE_URL,
    publisher: {
      "@id": "/#person"
    },
    inLanguage: "en-IN"
  };
}
