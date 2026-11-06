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
    name: "Subham Sarkar | Software Architect and System Engineer",
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
    name: "About | Subham Sarkar | Software Architect and System Engineer",
    description: "Learn about Subham Sarkar, Software Architect and System Engineer building custom software systems.",
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
    name: "Services & Capabilities | Subham Sarkar | Software Architect and System Engineer",
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
        url: svc.slug ? `${BASE_URL}/services/${svc.slug}` : `${BASE_URL}/services`
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
    name: "Architectural Work & Case Studies | Subham Sarkar | Software Architect and System Engineer",
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
    name: "Industry Insights | Subham Sarkar | Software Architect and System Engineer",
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

/**
 * 9. Web & Mobile Service Page (/services/web-and-mobile-application-development) Schema
 * Service node + WebPage + FAQPage
 */
export function getWebMobileServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/web-and-mobile-application-development#webpage",
    url: `${BASE_URL}/services/web-and-mobile-application-development`,
    name: "Custom Web Application & Mobile App Development | Subham Sarkar",
    description: "Custom web application development and mobile app development services by Subham Sarkar. Offline-first mobile apps, real-time sync, and modern cloud architecture.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/web-and-mobile-application-development#service",
    name: "Custom Web Application & Mobile App Development",
    serviceType: "Custom Web Application & Mobile App Development Services",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Custom web application development and mobile app development services by Subham Sarkar. Offline-first mobile apps, real-time sync, and modern cloud architecture.",
    url: `${BASE_URL}/services/web-and-mobile-application-development`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Web & Mobile App Development", item: `${BASE_URL}/services/web-and-mobile-application-development` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why choose unified custom web application and mobile app development over maintaining separate codebases?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We architect unified backends and shared components using modern cross-platform engineering. Your web dashboards and mobile applications share identical business rules, validation schemas, and database types. This eliminates duplicate development costs and cuts long-term maintenance overhead by more than 50%."
        }
      },
      {
        "@type": "Question",
        name: "How does offline-first mobile app development function without cellular network?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The mobile app operates offline-first. It writes orders, timestamps, and photos directly into encrypted device storage (SQLite). Field staff experience zero freezes or error screens. The moment a signal is detected, a background worker automatically syncs the queue with your central cloud database without data conflicts."
        }
      },
      {
        "@type": "Question",
        name: "Who owns the source code, database, and App Store accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You do. 100%. All code is written directly into your company's private GitHub repository from day one. Mobile apps are signed and published under your official Apple Developer and Google Play Console accounts. Subham Sarkar never retains proprietary locks on your business logic or infrastructure."
        }
      },
      {
        "@type": "Question",
        name: "Can custom web and mobile applications integrate with Tally and existing enterprise software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Invoices, receipts, inventory movements, and customer orders confirmed on a mobile screen or web portal flow straight into your existing accounting software (Tally, Zoho Books, QuickBooks) automatically via secure API bridges."
        }
      },
      {
        "@type": "Question",
        name: "What happens if a bug occurs or Apple/Google updates their mobile operating system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every project includes a 30-day post-launch support and stabilization period where I personally monitor telemetry, resolve any edge cases, and ensure flawless daily operation across devices."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}

/**
 * 10. ERP Systems Service Page (/services/custom-erp-development) Schema
 */
export function getErpServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/custom-erp-development#webpage",
    url: `${BASE_URL}/services/custom-erp-development`,
    name: "Custom ERP Development & Inventory Software | Subham Sarkar",
    description: "Custom ERP software development company services by Subham Sarkar. Scalable multi-warehouse inventory management, GST billing, and zero per-user fees.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/custom-erp-development#service",
    name: "Custom ERP Development & Inventory Software",
    serviceType: "Custom ERP Software Development & Operations Engineering",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Custom ERP software development company services by Subham Sarkar. Scalable multi-warehouse inventory management, GST billing, and zero per-user fees.",
    url: `${BASE_URL}/services/custom-erp-development`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Custom ERP Development", item: `${BASE_URL}/services/custom-erp-development` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do companies choose custom ERP development over readymade software like SAP, NetSuite, or Odoo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Readymade ERP platforms charge steep per-user monthly licenses (often ₹10,000 to ₹25,000+ per user every month) and force your business to change how you work just to fit generic templates. Custom ERP software development gives you 100% intellectual property ownership, zero recurring seat fees, and is built specifically around how your team actually operates - from warehouse logistics to billing."
        }
      },
      {
        "@type": "Question",
        name: "How does custom ERP software manage inventory and stock across multiple godowns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every time goods move, an order is placed, or a shipment is dispatched, the system updates stock counts across all locations immediately. Billing counter staff, warehouse pickers, and mobile reps all see the exact same numbers in real time, preventing double-bookings, stockouts, and phantom inventory errors."
        }
      },
      {
        "@type": "Question",
        name: "Can custom ERP software integrate directly with Tally and GST billing software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Invoices, payment receipts, and e-way bills are pushed directly into Tally, Zoho Books, or government GST portals automatically. Your accounts team doesn't have to re-type a single bill, completely eliminating human copy-paste errors and double entries."
        }
      },
      {
        "@type": "Question",
        name: "What is the cost of custom ERP software development compared to SAP in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Commercial ERPs like SAP Business One require steep implementation fees plus recurring per-user licenses that balloon as you hire. Custom ERP software engineering is a one-time fixed investment where you retain full database and code ownership, allowing you to add hundreds of staff members with zero additional licensing fees."
        }
      },
      {
        "@type": "Question",
        name: "Who owns the database, server infrastructure, and source code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You own 100% of everything. All code is written into your company's private GitHub repository from day one, and database clusters reside on your own cloud servers (AWS, DigitalOcean, or private servers). Subham Sarkar provides direct architectural consulting with zero vendor lock-in."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}

/**
 * 11. Enterprise CRM Service Page (/services/custom-crm-development) Schema
 */
export function getCrmServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/custom-crm-development#webpage",
    url: `${BASE_URL}/services/custom-crm-development`,
    name: "Custom CRM Development & Lead Management Systems | Subham Sarkar",
    description: "Custom CRM software development company services by Subham Sarkar. Automated WhatsApp lead management systems, sales pipelines, and zero per-seat fees.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/custom-crm-development#service",
    name: "Custom CRM Development & Lead Management Systems",
    serviceType: "Custom CRM Software Development & Lead Management Platforms",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Custom CRM software development company services by Subham Sarkar. Automated WhatsApp lead management systems, sales pipelines, and zero per-seat fees.",
    url: `${BASE_URL}/services/custom-crm-development`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Custom CRM Development", item: `${BASE_URL}/services/custom-crm-development` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why choose custom CRM development over Salesforce, HubSpot, or Zoho for growing businesses in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mainstream SaaS CRMs charge ₹8,000 to ₹25,000+ per user every month. For a team of 25 sales reps, managers, and support staff, that amounts to ₹25 to ₹50 lakhs every year in recurring software bills. Custom CRM development gives your entire company unlimited user logins with zero recurring monthly seat fees."
        }
      },
      {
        "@type": "Question",
        name: "How does an automated lead management system trigger instant WhatsApp and email follow-ups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We connect directly to the official WhatsApp Business Cloud API, transactional email services (SendGrid, Postmark), and SMS gateways. New lead greetings, automated follow-up sequences, and quotation PDF links are sent automatically within 5 seconds of inquiry receipt."
        }
      },
      {
        "@type": "Question",
        name: "Can custom CRM software generate automated GST quotations and track custom sales pipelines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Generic CRMs struggle with custom pricing formulas and state-specific taxes. We build a dedicated quotation engine that calculates your exact discount slabs, state GST, and bundle pricing, outputting a professional branded PDF in under 30 seconds."
        }
      },
      {
        "@type": "Question",
        name: "How does role-based access control prevent sales reps from exporting customer lists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We enforce strict role-based access rules (RBAC). Sales reps only see the specific leads assigned to their area or route, and bulk export features can be completely disabled for non-admin accounts. Every customer view, note, and edit is permanently logged."
        }
      },
      {
        "@type": "Question",
        name: "How do we move our existing contacts and deal history from spreadsheets or old software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We run automated data migration pipelines from your legacy CRM, spreadsheets, or Google Contacts. We clean up duplicates, format phone numbers, and import all existing interactions so you don't lose a single contact or pending deal."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}

/**
 * 12. Autonomous AI Agents Service Page (/services/business-process-automation) Schema
 */
export function getAiAgentsServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/business-process-automation#webpage",
    url: `${BASE_URL}/services/business-process-automation`,
    name: "AI Agent Development & Business Process Automation | Subham Sarkar",
    description: "Private AI agent development and business process automation services by Subham Sarkar. Self-hosted AI chatbots, document parsing, and zero data leaks.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/business-process-automation#service",
    name: "AI Agent Development & Business Process Automation",
    serviceType: "AI Agent Development & Business Process Automation Services",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Private AI agent development and business process automation services by Subham Sarkar. Self-hosted AI chatbots, document parsing, and zero data leaks.",
    url: `${BASE_URL}/services/business-process-automation`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "AI Agent Development", item: `${BASE_URL}/services/business-process-automation` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I automate my business operations using private AI agent development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We identify repetitive clerical tasks - such as invoice data extraction, customer inquiry triage, and multi-system data entry. We then deploy private AI agents that execute these tasks reliably behind strict validation rules, reducing manual processing time by up to 80%."
        }
      },
      {
        "@type": "Question",
        name: "How does an enterprise AI chatbot for business prevent sensitive data leaks to public models?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We deploy self-hosted open-weight models (like Llama 3 or Mistral) on your company's own private cloud servers, or connect through enterprise zero-retention private endpoints. Your customer lists, profit margins, and financial records never leave your secure infrastructure or get used to train public models."
        }
      },
      {
        "@type": "Question",
        name: "How do you eliminate AI hallucinations in business process automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We never allow raw AI outputs to write to your database directly. Every response is validated against strict JSON schemas. If an extracted invoice amount or vendor ID falls below confidence thresholds, the system routes it to a human-in-the-loop review queue instead of guessing."
        }
      },
      {
        "@type": "Question",
        name: "What workflows and clerical tasks are best suited for process automation software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "High-volume, rule-based operations: parsing scanned PDF invoices and matching them against purchase orders, categorizing incoming customer tickets, auditing vendor contracts, and reconciling bank statements with accounting ledgers."
        }
      },
      {
        "@type": "Question",
        name: "Can private AI agents connect directly to our existing databases and WhatsApp Business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We build secure tool interfaces and Model Context Protocol (MCP) bridges so agents can query database records, verify active order numbers, draft customer updates, and send alerts to WhatsApp Business or Slack within strict permission boundaries."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}

/**
 * 13. Legacy Software Modernization Service Page (/services/legacy-software-modernization) Schema
 */
export function getSoftwareModernizationServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/legacy-software-modernization#webpage",
    url: `${BASE_URL}/services/legacy-software-modernization`,
    name: "Legacy Software Modernization & Cloud Architecture | Subham Sarkar",
    description: "Zero-downtime legacy software modernization and automated database migration services by Subham Sarkar. Migrate fragile databases, old monoliths, and Excel ledgers to scalable cloud architectures.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/legacy-software-modernization#service",
    name: "Legacy Software Modernization",
    serviceType: "Legacy Software Modernization & Cloud Architecture Services",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Zero-downtime legacy software modernization and automated database migration services by Subham Sarkar. Migrate fragile databases, old monoliths, and Excel ledgers to scalable cloud architectures.",
    url: `${BASE_URL}/services/legacy-software-modernization`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Software Modernization", item: `${BASE_URL}/services/legacy-software-modernization` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you guarantee zero business downtime during legacy system migration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We run your legacy software and the modern cloud system in parallel using dual-writing architecture. Orders, payments, and inventory adjustments are saved to both systems concurrently. We verify that all numbers match 100% before gradually shifting users over, ensuring zero operational downtime."
        }
      },
      {
        "@type": "Question",
        name: "What safety rollbacks exist during software modernization if an unexpected issue arises?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because live traffic is shifted progressively (5%, 25%, 50%, 100%) and both databases stay continuously synchronized in real time, we maintain an instant fallback mechanism. If an edge case appears, traffic can be diverted back to the legacy system in under 10 milliseconds with zero lost records."
        }
      },
      {
        "@type": "Question",
        name: "How do you handle data migration from legacy systems and Excel sheets to a modern cloud database?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We engineer automated, idempotent ETL (Extract, Transform, Load) pipelines that sanitize, deduplicate, and validate historical records against strict modern database schemas before insertion, eliminating corrupted or missing legacy entries."
        }
      },
      {
        "@type": "Question",
        name: "Can you modernize legacy software without rewriting the entire codebase from scratch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Using the industry-standard Strangler-Fig pattern, we extract and replace outdated modules one by one. Your business experiences immediate performance gains and new capabilities without waiting months for a risky, ground-up rewrite."
        }
      },
      {
        "@type": "Question",
        name: "How do you verify that the new software calculates identically to the old one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We run automated shadow-testing on live requests. Both systems process identical inputs in the background, and outputs are diff-checked in real time to guarantee that complex tax logic, pricing tiers, and ledger balances match perfectly."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}

export const getLegacyMigrationServiceSchema = getSoftwareModernizationServiceSchema;

/**
 * 14. Security Audit Service Page (/services/application-security-audit) Schema
 */
export function getSecurityAuditServiceSchema() {
  const webPage = {
    "@type": "WebPage",
    "@id": "/services/application-security-audit#webpage",
    url: `${BASE_URL}/services/application-security-audit`,
    name: "Application Security Audit & Infrastructure Hardening | Subham Sarkar",
    description: "Comprehensive architectural penetration testing, OWASP hardening, zero-trust RBAC, and threat mitigation by Subham Sarkar.",
    isPartOf: {
      "@id": "/#website"
    }
  };

  const service = {
    "@type": "Service",
    "@id": "/services/application-security-audit#service",
    name: "Application Security Audit & Hardening",
    serviceType: "Cybersecurity Architecture & Vulnerability Mitigation",
    provider: {
      "@id": "/#person"
    },
    areaServed: AREA_SERVED,
    description: "Delivering hands-on architectural security penetration testing, zero-trust RBAC design, rate-limiting, and code-level vulnerability remediations.",
    url: `${BASE_URL}/services/application-security-audit`
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Security Audit & Enhancements", item: `${BASE_URL}/services/application-security-audit` }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does a comprehensive architectural security audit cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We examine the entire application lifecycle: authentication flows, session handling, SQL/NoSQL injection vulnerabilities, authorization bypass risks, API rate-limiting, server-side request forgery (SSRF), and cloud infrastructure IAM policies."
        }
      },
      {
        "@type": "Question",
        name: "Do you provide actionable remediation code or just a generic report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike automated scanners that produce hundreds of false-positive PDFs, Subham Sarkar delivers direct, hands-on architectural code remediations, configuration patches, and verification tests."
        }
      },
      {
        "@type": "Question",
        name: "How do you protect applications against DDoS and automated credential stuffing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We implement multi-layered defense-in-depth: edge firewall rate-limiting, automated IP reputation filtering, progressive proof-of-work challenges, and cryptographically signed session tokens."
        }
      },
      {
        "@type": "Question",
        name: "Can you help our platform satisfy enterprise client compliance audits (e.g., SOC 2, ISO 27001 readiness)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We harden data encryption in transit and at rest, configure tamper-evident audit logging pipelines, enforce least-privilege RBAC, and provide signed architectural attestation documentation."
        }
      },
      {
        "@type": "Question",
        name: "Will security testing disrupt our active production systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Audits are performed against isolated staging environments or during controlled maintenance windows with zero operational risk to your active customers."
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, faqPage]
  };
}
