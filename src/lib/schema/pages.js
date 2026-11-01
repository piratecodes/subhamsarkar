/**
 * Page-specific Schema.org generators for subhamsarkar.dev
 * Each function returns ONLY that page's nodes.
 * Person and WebSite are referenced strictly via @id (/#person, /#website).
 */

import { BASE_URL, AREA_SERVED } from "./base";
import { services } from "@/data/services";
import { servicesFaqs, processFaqs, contactFaqs } from "@/data/faqs";
import { processPhases } from "@/data/processPhases";

/**
 * 1. Home (/) Schema
 * One ProfilePage, @id /#profilepage, isPartOf #website, mainEntity #person, dateModified.
 * NO FAQPage and NO case-study ItemList.
 */
export function getHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "/#profilepage",
    url: BASE_URL,
    name: "Subham Sarkar | Software Architect and Business Developer",
    description: "Software architect and developer portfolio building custom ERP, CRM, and distributed systems.",
    isPartOf: {
      "@id": "/#website"
    },
    mainEntity: {
      "@id": "/#person"
    },
    dateModified: "2026-11-01"
  };
}

/**
 * 2. About (/about) Schema
 * One AboutPage, @id /about#webpage, isPartOf #website, mainEntity #person.
 */
export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "/about#webpage",
    url: `${BASE_URL}/about`,
    name: "About | Subham Sarkar | Software Architect and Business Developer",
    description: "Learn about Subham Sarkar, Software Architect and Business Developer building custom software systems.",
    isPartOf: {
      "@id": "/#website"
    },
    mainEntity: {
      "@id": "/#person"
    }
  };
}

/**
 * 3. Services (/services) Schema
 * WebPage @id /services#webpage, plus an ItemList of 5 Service nodes,
 * plus FAQPage with 5 visible questions from /data/faqs.js.
 */
export function getServicesPageSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services#webpage",
    url: `${BASE_URL}/services`,
    name: "Services & Capabilities | Subham Sarkar | Software Architect and Business Developer",
    description: "Custom ERP & CRM systems, unified web and mobile applications, AI agent integration, and legacy system modernization.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const itemList = {
    "@type": "ItemList",
    name: "Engineered Architectural Disciplines",
    numberOfItems: services.length,
    itemListElement: services.map((svc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: svc.name,
        description: svc.desc,
        provider: {
          "@id": "/#person"
        },
        areaServed: AREA_SERVED,
        serviceType: svc.serviceType,
        url: `${BASE_URL}/services`
      }
    }))
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: servicesFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, itemList, faqPage]
  };
}

/**
 * 4. Work (/work) Schema
 * CollectionPage @id /work#webpage plus ItemList of published case studies from the database.
 * Each ListItem: position, url (use slug or id, never "ref"), name = title, description = summary.
 * NEVER output industryNiche, ref, client names, approach or outcome text.
 */
export function getWorkPageSchema(dossiers = []) {
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": "/work#webpage",
    url: `${BASE_URL}/work`,
    name: "Architectural Work & Case Studies | Subham Sarkar | Software Architect and Business Developer",
    description: "Enterprise engineering case studies and systems architecture portfolio.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const itemList = {
    "@type": "ItemList",
    name: "Engineering Case Studies",
    numberOfItems: dossiers.length,
    itemListElement: dossiers.map((dossier, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${BASE_URL}/work#${dossier.slug || dossier.id}`,
      name: dossier.title,
      description: dossier.summary
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, itemList]
  };
}

/**
 * 5. Process (/process) Schema
 * WebPage @id /process#webpage, plus an ItemList of the 5 phases
 * (Discovery, Planning, Building, Testing & Migration, Handover) using names and descriptions
 * from the same data the tabs use, plus FAQPage with 6 visible questions from /data/faqs.js.
 * HowTo node is deleted.
 */
export function getProcessPageSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/process#webpage",
    url: `${BASE_URL}/process`,
    name: "Engineering Methodology & Delivery Process | Subham Sarkar",
    description: "The 5-phase software delivery and architecture methodology by Subham Sarkar.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const itemList = {
    "@type": "ItemList",
    name: "5-Phase Software Architecture & Delivery Process",
    numberOfItems: processPhases.length,
    itemListElement: processPhases.map((phase, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: phase.phaseName || phase.name.replace(/^0\d\s*/, ""),
      description: phase.narrative
    }))
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: processFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, itemList, faqPage]
  };
}

/**
 * 6. Contact (/contact) Schema
 * ContactPage @id /contact#webpage; mainEntity -> {"@id": "/#person"} with a contactPoint.
 * No telephone. Plus FAQPage with 4 visible questions from /data/faqs.js.
 */
export function getContactPageSchema(settings) {
  const emailRaw = settings?.email || "hello@subhamsarkar.dev";
  const plainEmail = emailRaw.replace(/^mailto:/, "").trim();

  const contactPage = {
    "@type": "ContactPage",
    "@id": "/contact#webpage",
    url: `${BASE_URL}/contact`,
    name: "Contact Subham Sarkar",
    description: "Initiate direct architectural consultation with Subham Sarkar for custom ERP, CRM, and software systems.",
    isPartOf: {
      "@id": "/#website"
    },
    mainEntity: {
      "@id": "/#person",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: plainEmail,
        availableLanguage: ["English", "Bengali", "Hindi"],
        areaServed: AREA_SERVED
      }
    }
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [contactPage, faqPage]
  };
}

/**
 * 7. Insights (/insights) Schema
 * CollectionPage @id /insights#webpage plus ItemList of published articles
 * with ONLY position, url and name per item.
 */
export function getInsightsPageSchema(insights = []) {
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": "/insights#webpage",
    url: `${BASE_URL}/insights`,
    name: "Industry Insights | Subham Sarkar | Software Architect and Business Developer",
    description: "Thoughts, blueprints, and technical deep dives into software architecture, robust custom ERPs, and resilient business systems.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const itemList = {
    "@type": "ItemList",
    name: "Published Articles",
    numberOfItems: insights.length,
    itemListElement: insights.map((insight, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${BASE_URL}/insights/${insight.slug}`,
      name: insight.title
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, itemList]
  };
}

/**
 * 8. Legal Pages (/privacy-policy, /terms-and-conditions) Schema
 * One WebPage each, @id <path>#webpage, with name, description, url,
 * inLanguage "en-IN", dateModified and isPartOf #website.
 * Removed the "about" field.
 */
export function getLegalPageSchema({ title, description, path, dateModified = "2026-11-01" }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${path}#webpage`,
    url: `${BASE_URL}${path}`,
    name: title,
    description: description,
    inLanguage: "en-IN",
    dateModified: dateModified,
    isPartOf: {
      "@id": "/#website"
    }
  };
}
