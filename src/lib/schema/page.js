/**
 * Page-specific Schema.org generators for subhamsarkar.dev
 * Each function returns ONLY that page's nodes.
 * Person and WebSite are defined once in the root layout.
 * No FAQPage schema is used anywhere.
 */

import { BASE_URL, AREA_SERVED } from "./base";
import { PAGE_LASTMOD, toIsoKolkata } from "@/lib/constants/dates";
import { META, SERVICES } from "@/data/pageMeta";
import * as processData from "@/data/processPhases";

const websiteRef = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Subham Sarkar",
  url: BASE_URL,
};

const personRef = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Subham Sarkar",
  url: BASE_URL,
  image: `${BASE_URL}/myimage_web.png`,
};

/**
 * Shared builder for the six service pages: WebPage + Service + Breadcrumb.
 */
function buildServicePageSchema(svc) {
  const url = `${BASE_URL}/services/${svc.slug}`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: svc.title,
    description: svc.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD[`/services/${svc.slug}`]),
    isPartOf: websiteRef,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: { "@id": `${url}#service` },
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.description,
    url,
    provider: personRef,
    areaServed: AREA_SERVED,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: svc.breadcrumbName, item: url },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb],
  };
}

/**
 * 1. Home (/)
 */
export function getHomePageSchema(settings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/#profilepage`,
    url: BASE_URL,
    name: META.home.title,
    description: META.home.description,
    inLanguage: "en-IN",
    dateCreated: "2026-10-10T00:00:00+05:30",
    datePublished: "2026-10-10T00:00:00+05:30",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/"]),
    isPartOf: websiteRef,
    mainEntity: personRef,
  };
}

/**
 * 2. About (/about)
 */
export function getAboutPageSchema(settings) {
  const aboutPage = {
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#webpage`,
    url: `${BASE_URL}/about`,
    name: META.about.title,
    description: META.about.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/about"]),
    isPartOf: websiteRef,
    breadcrumb: { "@id": `${BASE_URL}/about#breadcrumb` },
    mainEntity: personRef,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/about#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [aboutPage, breadcrumb],
  };
}

/**
 * 3. Services hub (/services)
 */
export function getServicesPageSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": `${BASE_URL}/services#webpage`,
    url: `${BASE_URL}/services`,
    name: META.services.title,
    description: META.services.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/services"]),
    isPartOf: websiteRef,
    breadcrumb: { "@id": `${BASE_URL}/services#breadcrumb` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/services#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
    ],
  };

  const itemList = {
    "@type": "ItemList",
    name: "Software development services",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((svc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: svc.name,
      url: `${BASE_URL}/services/${svc.slug}`,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, itemList, breadcrumb],
  };
}

/**
 * 4. Work (/work) - unchanged until the Work page is finished
 */
export function getWorkPageSchema(dossiers = []) {
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/work#webpage`,
    url: `${BASE_URL}/work`,
    name: META.work.title,
    description: META.work.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/work"]),
    isPartOf: websiteRef,
    breadcrumb: {
      "@id": `${BASE_URL}/work#breadcrumb`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/work#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${BASE_URL}/work` },
    ],
  };

  const itemList = {
    "@type": "ItemList",
    name: "Custom Software Case Studies",
    numberOfItems: dossiers.length,
    itemListElement: dossiers.map((dossier) => {
      const ref = dossier.ref ? dossier.ref.toLowerCase() : "";
      return {
        "@type": "CreativeWork",
        "@id": `${BASE_URL}/work#${ref}`,
        name: dossier.title,
        description: dossier.summary || dossier.outcome || "",
        url: `${BASE_URL}/work#${ref}`,
        creator: personRef,
      };
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, itemList, breadcrumb],
  };
}

/**
 * 5. Process (/process)
 */
export function getProcessPageSchema() {
  const phases = processData.phaseData || processData.processPhases || [];

  const webPage = {
    "@type": "WebPage",
    "@id": `${BASE_URL}/process#webpage`,
    url: `${BASE_URL}/process`,
    name: META.process.title,
    description: META.process.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/process"]),
    isPartOf: websiteRef,
    breadcrumb: { "@id": `${BASE_URL}/process#breadcrumb` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/process#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Process", item: `${BASE_URL}/process` },
    ],
  };

  const itemList = {
    "@type": "ItemList",
    name: "Five-phase custom software development process",
    numberOfItems: phases.length,
    itemListElement: phases.map((phase, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${phase.name}: ${phase.headline}`,
      description: phase.narrative,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, itemList, breadcrumb],
  };
}

/**
 * 6. Contact (/contact)
 */
export function getContactPageSchema(settings) {
  const contactPage = {
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: META.contact.title,
    description: META.contact.description,
    inLanguage: "en-IN",
    dateModified: toIsoKolkata(PAGE_LASTMOD["/contact"]),
    isPartOf: websiteRef,
    breadcrumb: { "@id": `${BASE_URL}/contact#breadcrumb` },
    mainEntity: { "@id": `${BASE_URL}/#person` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/contact#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [contactPage, breadcrumb],
  };
}

/**
 * 7. Insights (/insights) - unchanged
 */
export function getInsightsPageSchema(insights = []) {
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/insights#webpage`,
    url: `${BASE_URL}/insights`,
    name: "Industry Insights | Subham Sarkar | Software Architect and ERP & CRM Developer",
    description: "Practical engineering guides on custom ERP, CRM, full-stack web and mobile apps, and application security for growing businesses in India by Subham Sarkar.",
    isPartOf: websiteRef,
    breadcrumb: {
      "@id": `${BASE_URL}/insights#breadcrumb`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/insights#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${BASE_URL}/insights` },
    ],
  };

  const itemList = {
    "@type": "ItemList",
    name: "Software Architecture Articles & Blueprints",
    numberOfItems: insights.length,
    itemListElement: insights.map((insight, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${BASE_URL}/insights/${insight.slug}`,
      name: insight.title,
      description: insight.excerpt || insight.summary || "",
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, itemList, breadcrumb],
  };
}

/**
 * 8. Legal pages
 */
export function getLegalPageSchema({ title, description, path, dateModified }) {
  const modDate = dateModified || toIsoKolkata(PAGE_LASTMOD[path]) || "2026-11-01T00:00:00+05:30";
  const webPage = {
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}#webpage`,
    url: `${BASE_URL}${path}`,
    name: title,
    description: description,
    inLanguage: "en-IN",
    dateModified: modDate,
    isPartOf: websiteRef,
    breadcrumb: {
      "@id": `${BASE_URL}${path}#breadcrumb`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}${path}#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: title, item: `${BASE_URL}${path}` },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb],
  };
}

/**
 * 9 to 14. Service pages (built from SERVICES)
 */
const bySlug = (slug) => SERVICES.find((s) => s.slug === slug);

export function getWebMobileServiceSchema() {
  return buildServicePageSchema(bySlug("web-and-mobile-application-development"));
}

export function getErpServiceSchema() {
  return buildServicePageSchema(bySlug("custom-erp-development"));
}

export function getCrmServiceSchema() {
  return buildServicePageSchema(bySlug("custom-crm-development"));
}

export function getAiAgentsServiceSchema() {
  return buildServicePageSchema(bySlug("business-process-automation"));
}

export function getSoftwareModernizationServiceSchema() {
  return buildServicePageSchema(bySlug("legacy-software-modernization"));
}

export function getSecurityAuditServiceSchema() {
  return buildServicePageSchema(bySlug("application-security-audit"));
}

export const getLegacyMigrationServiceSchema = getSoftwareModernizationServiceSchema;
