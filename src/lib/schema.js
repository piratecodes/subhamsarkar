/**
 * Centralized Schema.org Structured Data Generators for subhamsarkar.dev
 * Compliant with Google Search Rich Results and Schema.org standards.
 */

const BASE_URL = "https://subhamsarkar.dev";

/**
 * Primary Person entity (Subham Sarkar) referenced across all pages via @id
 */
export function getPersonSchema(settings) {
  const email = settings?.email || "hello@subhamsarkar.dev";
  const address = settings?.address || "Kolkata, West Bengal, INDIA";
  const whatsapp = settings?.whatsapp || "+919051779053";

  const sameAs = [
    settings?.github || "https://github.com/piratecodes",
    settings?.linkedin || "https://linkedin.com/in/subhamsarkar99",
    settings?.instagram || "https://instagram.com/subhamsarkar99",
  ];

  if (settings?.twitter) {
    sameAs.push(
      settings.twitter.startsWith("http")
        ? settings.twitter
        : `https://x.com/${settings.twitter.replace("@", "")}`
    );
  }

  return {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Subham Sarkar",
    jobTitle: "Software Architect & Systems Engineer",
    alternateName: ["Subham Sarkar", "piratecodes"],
    description:
      "Software architect and ERP/CRM developer based in Kolkata, India, specializing in custom enterprise software, unified web and mobile ecosystems, AI agent integration, and legacy system migration.",
    url: BASE_URL,
    image: `${BASE_URL}/icons/icon-512x512.png`,
    email: `mailto:${email}`,
    telephone: whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700122",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Enterprise Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "Software Architecture",
      "Distributed Systems",
      "AI Agent Integration",
      "Legacy System Migration",
      "Database Systems & Query Optimization",
      "Next.js & Full-Stack System Design",
    ],
    sameAs: sameAs.filter(Boolean),
  };
}

/**
 * WebSite Schema for site identity & search indexing
 */
export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Subham Sarkar | Software Architect & Systems Engineer",
    description:
      "Portfolio of Subham Sarkar, Software Architect & Systems Engineer building robust, scalable applications.",
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Homepage Schema (WebSite + Person + ProfilePage + ItemList of Featured Dossiers)
 */
export function getHomePageSchema(settings, featuredDossiers = []) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/#profilepage`,
    url: BASE_URL,
    name: "Subham Sarkar | Software Architect & Systems Engineer",
    description:
      "Flagship engineering portfolio of Subham Sarkar, Software Architect building custom ERP, CRM, and distributed software systems.",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    mainEntity: {
      "@id": `${BASE_URL}/#person`,
    },
  };

  const graph = [person, website, profilePage];

  if (featuredDossiers && featuredDossiers.length > 0) {
    graph.push({
      "@type": "ItemList",
      name: "Featured Engineering Dossiers & Case Studies",
      itemListElement: featuredDossiers.map((dossier, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: dossier.title,
          description: dossier.summary || dossier.bottleneck,
          genre: dossier.category || dossier.industry,
          author: { "@id": `${BASE_URL}/#person` },
          url: `${BASE_URL}/work#${dossier.ref || dossier.id}`,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * About Page Schema
 */
export function getAboutPageSchema(settings) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "AboutPage",
        "@id": `${BASE_URL}/about#webpage`,
        url: `${BASE_URL}/about`,
        name: "About Subham Sarkar | Software Architect & Systems Engineer",
        description:
          "Background, philosophy, and engineering approach of Subham Sarkar — building custom software with client ownership and zero vendor lock-in.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${BASE_URL}/#person` },
      },
    ],
  };
}

/**
 * Services Page Schema (Services ItemList + FAQPage)
 */
export function getServicesPageSchema(settings) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  const servicesList = [
    {
      "@type": "Service",
      name: "Custom ERP & CRM Systems",
      serviceType: "Enterprise Software Engineering",
      description:
        "Bespoke enterprise resource planning and customer relationship management systems built from scratch or migrated from legacy platforms, featuring reliable financial ledgers and automated workflows.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      url: `${BASE_URL}/services`,
    },
    {
      "@type": "Service",
      name: "Web & Mobile Ecosystems",
      serviceType: "Full-Stack Application Development",
      description:
        "Unified web and mobile applications synchronized through a single centralized admin system, designed offline-first for field resilience.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      url: `${BASE_URL}/services`,
    },
    {
      "@type": "Service",
      name: "AI Agent Integration",
      serviceType: "Artificial Intelligence & Workflow Automation",
      description:
        "Private, self-hosted AI automation for document processing, customer triage, and repetitive operational tasks without third-party data leakage.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      url: `${BASE_URL}/services`,
    },
    {
      "@type": "Service",
      name: "System Migration & Legacy Data Transfer",
      serviceType: "Database & Infrastructure Migration",
      description:
        "Safe, zero-downtime transition from fragile outdated software to modern high-availability infrastructure using parallel dual-write verification.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      url: `${BASE_URL}/services`,
    },
    {
      "@type": "Service",
      name: "Scaling & Infrastructure Optimization",
      serviceType: "Performance Triage & Cloud Architecture",
      description:
        "Performance optimization, database indexing, and query bottleneck resolution for high-traffic systems without demanding a costly full rebuild.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      url: `${BASE_URL}/services`,
    },
  ];

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you work with an existing tech setup or only from scratch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. A large share of the work I do involves existing systems that have become slow, outdated, or difficult to maintain — not just new builds. Where possible, we improve and modernize what you already have step by step, rather than forcing a risky full rebuild.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle confidentiality and proprietary business logic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every engagement is covered by a confidentiality agreement before any technical details are discussed. Code is written directly into your own private repository, not mine — and business logic built for one client is never reused or shared with another.",
        },
      },
      {
        "@type": "Question",
        name: "What is a typical project timeline and deployment milestone schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Work is broken into short, clearly defined milestones, so you always know what's being delivered and when. A focused fix or migration typically takes a few weeks; a full custom ERP/CRM build usually takes a few months, depending on scope — we'll give you a realistic estimate before anything begins.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer post-launch maintenance and emergency support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every build includes a stabilization period after launch to catch and fix any issues, at no extra cost. After that, ongoing support and maintenance are available if you want them — but they're never a requirement to keep your system running.",
        },
      },
      {
        "@type": "Question",
        name: "Can systems be handed off fully to our internal engineering team without vendor lock-in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — this is a core principle of how I build. Every solution is built using common, widely-supported technologies, not proprietary tools only I can maintain. You receive full documentation and a proper handoff, so your own team can maintain and extend the system independently, with or without me.",
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services#webpage`,
        url: `${BASE_URL}/services`,
        name: "Services & Capabilities | Subham Sarkar",
        description:
          "Custom ERP & CRM systems, unified web/mobile apps, AI agent integration, and legacy modernization services.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
      },
      ...servicesList,
      faqPage,
    ],
  };
}

/**
 * Work / Case Studies Page Schema (CollectionPage + ItemList of real database Dossiers)
 */
export function getWorkPageSchema(settings, dossiers = []) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/work#webpage`,
    url: `${BASE_URL}/work`,
    name: "Architectural Work & Case Studies | Subham Sarkar",
    description:
      "Real-world enterprise system case studies, database refactoring initiatives, and ERP/CRM deployments by Subham Sarkar.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      name: "Engineering Dossiers",
      numberOfItems: dossiers.length,
      itemListElement: dossiers.map((dossier, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: dossier.title,
          description: dossier.summary || dossier.approach,
          genre: dossier.category || dossier.industry,
          keywords: dossier.industryNiche || dossier.discipline,
          creator: { "@id": `${BASE_URL}/#person` },
          url: `${BASE_URL}/work#${dossier.ref || dossier.id}`,
        },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, collectionPage],
  };
}

/**
 * Process Page Schema (HowTo + FAQPage)
 */
export function getProcessPageSchema(settings) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  const howTo = {
    "@type": "HowTo",
    name: "The 5-Phase Software Architecture & Delivery Methodology",
    description:
      "A structured, milestone-based engineering process from technical discovery to complete production handover with zero vendor lock-in.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Phase 01: Deep Discovery & Workflow Modeling",
        text: "Analyze operational bottlenecks, data relationships, and business logic before proposing code or committing to timelines.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Phase 02: Architectural Blueprint & Technical Spec",
        text: "Design database schemas, component topologies, and security boundaries with complete technical transparency.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Phase 03: Milestone-Based Engineering & Parallel Testing",
        text: "Iterative sprints delivered into your private repository with verifiable progress before each milestone approval.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Phase 04: Zero-Downtime Deployment & Data Cutover",
        text: "Dual-write validation and phased parallel execution to guarantee zero data loss during the final transition.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Phase 05: Complete Handover, Documentation & Training",
        text: "Full transfer of codebases, documentation, deployment scripts, and team onboarding so your internal team is self-sufficient.",
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How involved do I need to be during the build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As much or as little as makes sense for you. At minimum, you'll be involved at the start (explaining your business) and at key checkpoints (reviewing progress and approving each phase). You won't be asked to sit through daily updates, but you'll never be left wondering what's happening either.",
        },
      },
      {
        "@type": "Question",
        name: "What if I don't know exactly what I want yet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That's normal, and it's actually where the process starts. The first phase exists specifically to figure that out together — most clients arrive with a problem, not a finished spec, and that's enough to begin.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if requirements change partway through?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They often do, and that's expected. Because work is broken into phases and milestones rather than delivered all at once, changes can be discussed and adjusted for at the next checkpoint — not treated as a crisis or a reason to start over.",
        },
      },
      {
        "@type": "Question",
        name: "How will I know if the project is on track?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll have visibility at every phase, not just a single update at the end. If something is taking longer than expected or a decision needs your input, you'll hear about it as it happens, not after the fact.",
        },
      },
      {
        "@type": "Question",
        name: "Do I get documentation, or does only you understand the system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You get full documentation, always — this isn't optional or something reserved for larger clients. It's part of what makes it possible to hand the system over completely at the end.",
        },
      },
      {
        "@type": "Question",
        name: "What if I'm not happy with the direction partway through?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because the work is milestone-based, you're never looking at a finished product for the first time at the very end. If something isn't right, it gets caught and corrected at the next checkpoint, not discovered too late to fix easily.",
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/process#webpage`,
        url: `${BASE_URL}/process`,
        name: "Engineering Methodology & Delivery Process | Subham Sarkar",
        description: "The 5-phase software delivery and architecture methodology by Subham Sarkar.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
      },
      howTo,
      faqPage,
    ],
  };
}

/**
 * Contact Page Schema (ContactPage + ContactPoint + FAQPage)
 */
export function getContactPageSchema(settings) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();
  const email = settings?.email || "hello@subhamsarkar.dev";
  const whatsapp = settings?.whatsapp || "+919051779053";

  const contactPage = {
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: "Contact Subham Sarkar — Architectural Consultation",
    description: "Initiate direct architectural consultation with Subham Sarkar for custom ERP, CRM, and software systems.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "technical consulting and project scoping",
      email: `mailto:${email}`,
      telephone: whatsapp,
      availableLanguage: ["English", "Bengali", "Hindi"],
      areaServed: "Worldwide",
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is there a minimum project size or budget threshold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Engagements typically start for comprehensive architecture audits, high-volume decoupling initiatives, or full-scope module builds where resilience is paramount. I typically do not take on ad-hoc frontend patching or template modifications.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international or remote clients across different time zones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Currently supporting enterprise clients across North America, Europe, and Southeast Asia. I operate on rigorous asynchronous documentation, daily sprint journals, and predictable synchronous overlap windows for architectural checkpoints.",
        },
      },
      {
        "@type": "Question",
        name: "What information should I include in my initial message?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A concise summary of your current technology stack, the primary bottleneck or transactional load profile, expected delivery constraints, and whether you possess architectural documentation or require ground-up systems modeling.",
        },
      },
      {
        "@type": "Question",
        name: "Do you sign NDAs before discussing proprietary business workflows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, routinely. Bilateral mutual non-disclosure agreements are dispatched and executed within 24 hours of receiving your transmission, safeguarding all trade secrets, IP, database schema plans, and commercial algorithms prior to technical scoping.",
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, contactPage, faqPage],
  };
}

/**
 * Legal Page Schema (Privacy Policy & Terms and Conditions)
 */
export function getLegalPageSchema({ title, description, path, type = "PrivacyPolicy" }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}#webpage`,
    url: `${BASE_URL}${path}`,
    name: title,
    description: description,
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: type,
    },
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
  };
}

/**
 * Industry Insights Index Page Schema (CollectionPage + ItemList from backend Insights)
 */
export function getInsightsPageSchema(settings, insights = []) {
  const person = getPersonSchema(settings);
  const website = getWebSiteSchema();

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/insights#webpage`,
    url: `${BASE_URL}/insights`,
    name: "Industry Insights | Subham Sarkar",
    description:
      "Thoughts, blueprints, and technical deep dives into software architecture, robust custom ERPs, and resilient business systems.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      name: "Industry Insights",
      numberOfItems: insights.length,
      itemListElement: insights.map((insight, idx) => {
        const authorName =
          insight.customAuthor ||
          (insight.author
            ? `${insight.author.firstName} ${insight.author.lastName || ""}`.trim()
            : "Subham Sarkar");

        return {
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Article",
            headline: insight.seoMetaTitle || insight.title,
            description: insight.seoMetaDescription || insight.excerpt || "",
            url: insight.seoCanonicalUrl || `${BASE_URL}/insights/${insight.slug}`,
            mainEntityOfPage: `${BASE_URL}/insights/${insight.slug}`,
            image: insight.coverImage ? [insight.coverImage] : [],
            articleSection: insight.category || undefined,
            keywords: insight.seoMetaKeywords || undefined,
            datePublished: insight.createdAt ? new Date(insight.createdAt).toISOString() : undefined,
            dateModified: (insight.updatedAt || insight.createdAt)
              ? new Date(insight.updatedAt || insight.createdAt).toISOString()
              : undefined,
            author: {
              "@type": "Person",
              name: authorName,
              ...(authorName === "Subham Sarkar" ? { "@id": `${BASE_URL}/#person` } : {}),
            },
            publisher: {
              "@id": `${BASE_URL}/#person`,
            },
          },
        };
      }),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, collectionPage],
  };
}


