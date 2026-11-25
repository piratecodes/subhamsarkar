/**
 * Centralized metadata and service definitions.
 * Single source of truth for both Next.js page metadata and schema.org JSON-LD.
 *
 * Notes on Titles:
 * - root layout defines template: "%s | Subham Sarkar"
 * - baseTitle is passed to child page metadata title so Next.js renders: `${baseTitle} | Subham Sarkar`
 * - title is the full rendered title (and schema WebPage name)
 */

export const META = {
  home: {
    title: "Subham Sarkar | ERP & CRM Developer in Kolkata, India",
    description:
      "Subham Sarkar is a software architect and ERP/CRM developer in Kolkata building custom ERP, CRM, web, mobile apps and AI automation for businesses across India.",
  },
  about: {
    title: "About Subham Sarkar | Software Architect in Kolkata",
    description:
      "Meet Subham Sarkar - software architect and full-stack developer in Kolkata with over a decade of experience building custom ERP, CRM, secure web and mobile applications, and AI automation for businesses across India.",
  },
  work: {
    baseTitle: "Custom Software Case Studies",
    title: "Custom Software Case Studies | Subham Sarkar",
    description:
      "Custom software case studies by Subham Sarkar: a CRM and customer tracking platform and a lead generation website, with problem, approach and outcome.",
  },
  services: {
    baseTitle: "Custom Software Development Services",
    title: "Custom Software Development Services | Subham Sarkar",
    description:
      "Custom software development in Kolkata and worldwide: ERP, CRM, web and mobile apps, AI automation, modernization and security audits by Subham Sarkar.",
  },
  process: {
    baseTitle: "Custom Software Development Process",
    title: "Custom Software Development Process | Subham Sarkar",
    description:
      "How a custom software project runs, step by step: discovery, planning, building, testing and launch, with clear milestones and support after launch.",
  },
  contact: {
    baseTitle: "Contact Subham Sarkar | Software Architect in Kolkata",
    title: "Contact Subham Sarkar | Software Architect in Kolkata",
    description:
      "Contact Subham Sarkar, a software architect in Kolkata, to discuss a custom ERP, CRM, web or mobile app, AI automation or software modernization project.",
  },
};

export const SERVICES = [
  {
    slug: "custom-erp-development",
    baseTitle: "Custom ERP Software Development Services",
    title: "Custom ERP Software Development Services | Subham Sarkar",
    description:
      "Custom ERP software development services for businesses outgrowing basic tools: stock, billing, payroll and branches in one system. Scoped per project.",
    name: "Custom ERP Software Development",
    serviceType: "Custom ERP software development",
    breadcrumbName: "Custom ERP Development",
  },
  {
    slug: "custom-crm-development",
    baseTitle: "Custom CRM Software Development Services",
    title: "Custom CRM Software Development Services | Subham Sarkar",
    description:
      "Custom CRM software development services: leads, follow-ups, quotes and customer history in one system fitted to your sales process. Scoped per project.",
    name: "Custom CRM Software Development",
    serviceType: "Custom CRM software development",
    breadcrumbName: "Custom CRM Development",
  },
  {
    slug: "web-and-mobile-application-development",
    baseTitle: "Web and Mobile Application Development",
    title: "Web and Mobile Application Development | Subham Sarkar",
    description:
      "Web and mobile application development for businesses: installable PWAs, offline sync, and web apps linked to your ERP or CRM. Scoped per project.",
    name: "Web and Mobile Application Development",
    serviceType: "Web and mobile application development",
    breadcrumbName: "Web & Mobile App Development",
  },
  {
    slug: "business-process-automation",
    baseTitle: "Business Process Automation with AI",
    title: "Business Process Automation with AI | Subham Sarkar",
    description:
      "Business process automation with AI: document reading, workflow automation and human approval gates, built around your data privacy. Scoped per project.",
    name: "Business Process Automation with AI",
    serviceType: "Business process automation and AI workflow automation",
    breadcrumbName: "AI Business Process Automation",
  },
  {
    slug: "legacy-software-modernization",
    baseTitle: "Legacy Software Modernization Services",
    title: "Legacy Software Modernization Services | Subham Sarkar",
    description:
      "Legacy software modernization services: assess your old software, then keep, improve or rebuild it in safe stages. Scoped per project after a short call.",
    name: "Legacy Software Modernization",
    serviceType: "Legacy software modernization",
    breadcrumbName: "Legacy Software Modernization",
  },
  {
    slug: "application-security-audit",
    baseTitle: "Web App Security Audit & Penetration Testing",
    title: "Web App Security Audit & Penetration Testing | Subham Sarkar",
    description:
      "Web application security audit and penetration testing for your app, APIs and logins, with a written report, fixes and a retest. Scoped per project.",
    name: "Web Application Security Audit and Penetration Testing",
    serviceType: "Application security audit and penetration testing",
    breadcrumbName: "Application Security Audit",
  },
];
