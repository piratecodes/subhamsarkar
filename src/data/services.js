import { Database, Users, Laptop, Brain, ArrowRightLeft, ShieldCheck } from "lucide-react";

export const services = [
  {
    spec: "SPEC: 01",
    slug: "custom-erp-development",
    specType: "bg-primary-container text-on-primary",
    title: "ACCURATE STOCK & ACCOUNTS",
    subtitle: "BUILT FOR HOW YOUR BUSINESS ACTUALLY RUNS",
    icon: Database,
    name: "Custom ERP Development",
    serviceType: "Custom ERP Software Engineering",
    desc: "Custom ERP software that brings inventory, billing, accounting and more into one system built around your daily operations, replacing disconnected spreadsheets.",
    for: "Growing businesses with several godowns, stores or branches that have outgrown Excel and basic tools.",
    includes: [
      "Audit-Ready Records: A permanent history of every bill, payment and adjustment.",
      "Live Multi-Godown Stock: Stock updates across stores and counters in real time.",
      "Accounting Connections: Invoices and tax entries can flow into accounting software such as Tally, where required, without double typing."
    ],
    query: '"Can this integrate with our existing accounting or GST/tax tools?"',
    verdict: "Where the other software offers a way to connect, yes. Invoices, e-way bills and journal entries can be passed to accounting software such as Tally, Zoho Books or QuickBooks, and the exact connections are agreed per project.",
    metric: "APPROACH: TAILORED WORKFLOWS, UNLIMITED STAFF LOGINS",
    linkText: "Explore custom ERP development"
  },
  {
    spec: "SPEC: 02",
    slug: "custom-crm-development",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "FAST-TRACK SALES PIPELINES",
    subtitle: "REPLY TO LEADS INSTANTLY & CLOSE MORE DEALS",
    icon: Users,
    name: "Custom CRM Development",
    serviceType: "Custom CRM Platform Development",
    desc: "Custom CRM software that captures leads from your website, ads and WhatsApp, keeps every conversation and quote in one customer timeline and gives your whole team access.",
    for: "Sales teams losing track of customer chats across personal phones, or limited by per-user pricing.",
    includes: [
      "Automatic WhatsApp Replies: Greetings and catalog links sent when a lead enquires, where set up.",
      "PDF Quotations: Branded quotes with volume discounts and GST.",
      "Complete Client History: Every message, quote revision and visit note in one searchable timeline."
    ],
    query: '"Will our sales team find custom software intuitive compared to mainstream tools?"',
    verdict: "Every screen is designed around your team's daily habits, without the extra features a generic tool carries, so reps spend less time logging and more time selling.",
    metric: "APPROACH: FAST FOLLOW-UP, UNLIMITED SEATS",
    linkText: "Explore custom CRM development"
  },
  {
    spec: "SPEC: 03",
    slug: "web-and-mobile-application-development",
    specType: "bg-primary-container text-on-primary",
    title: "ALWAYS-IN-SYNC APPS",
    subtitle: "WORKS ONLINE, OFFLINE, EVERYWHERE",
    icon: Laptop,
    name: "Web & Mobile Applications",
    serviceType: "Custom Web and Mobile Application Development",
    desc: "Web apps, installable PWAs and admin panels that keep information consistent whether your staff are in the office or in an area with no signal.",
    for: "Companies with field staff, drivers or technicians who need apps that keep working with a weak or missing signal.",
    includes: [
      "Offline-First Design: Field teams can record orders and visits with no signal, and changes sync when the connection returns (on iPhone, while the app is open).",
      "Live Updates: Changes on one device reach office screens as soon as it is online.",
      "Shared Rules: Web and installed apps use the same pricing and validation rules."
    ],
    query: '"Can staff in areas with poor cellular reception still record transactions?"',
    verdict: "Yes. Entries save on the phone and sync when the connection returns. iPhone has some limits, such as sync only while the app is open, and these are planned for at the start.",
    metric: "APPROACH: OFFLINE-FIRST BY DESIGN",
    linkText: "Explore web and mobile application development"
  },
  {
    spec: "SPEC: 04",
    slug: "business-process-automation",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "PRIVATE AI WORKFLOWS",
    subtitle: "WORKFLOWS WITH HUMAN APPROVAL",
    icon: Brain,
    name: "AI Business Process Automation",
    serviceType: "Business Process Automation & AI Integration",
    desc: "Business process automation that handles repetitive paperwork, reading messy documents, sorting invoices and routing enquiries, with private AI where your data requires it and a person approving important actions.",
    for: "Teams spending hours every week typing invoice details, checking contracts or sorting repetitive customer enquiries.",
    includes: [
      "Private AI Where Needed: Open-weight models can run in a dedicated private environment so sensitive records are not sent to public chatbots.",
      "Human Approval Gates: High-value actions pause for a manager's one-tap confirmation.",
      "Messy Document Reading: Reads receipts, phone photos and multi-page supplier bills, with unclear results flagged for review."
    ],
    query: '"Will an AI agent take unintended actions or make wrong business decisions?"',
    verdict: "It is designed not to. The AI works inside strict validation rules, unclear results go to a person for review and important financial actions need explicit human confirmation. No AI system is perfect, so wrong outputs are caught before they reach your records.",
    metric: "APPROACH: STRICT RULES, HUMAN APPROVAL",
    linkText: "Explore business process automation"
  },
  {
    spec: "SPEC: 05",
    slug: "legacy-software-modernization",
    specType: "bg-primary-container text-on-primary",
    title: "STAGED UPGRADES",
    subtitle: "MODERNIZE OLD SOFTWARE SAFELY",
    icon: ArrowRightLeft,
    name: "Legacy Software Modernization",
    serviceType: "Legacy Software Modernization & Cloud Architecture",
    desc: "Upgrading slow, outdated software and messy databases to modern systems in staged steps, with old and new compared side by side, so the business keeps running.",
    for: "Businesses running critical operations on aging software, where unexpected downtime or lost data would be costly.",
    includes: [
      "Step-by-Step Modernization: Modules are upgraded piece by piece where the system allows it.",
      "Side-by-Side Testing: Old and new systems run together so results can be compared before users switch.",
      "Rollback Plan: Each stage has a prepared way back."
    ],
    query: '"Will our customer operations or active transactions pause during migration?"',
    verdict: "The work is planned to minimize disruption. Old and new systems run in parallel, users move in stages during normal working hours, and each stage has a rollback plan. No migration can honestly promise zero risk.",
    metric: "APPROACH: STAGED, LOW-DISRUPTION MIGRATION",
    linkText: "Explore legacy software modernization"
  },
  {
    spec: "SPEC: 06",
    slug: "application-security-audit",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "REAL-WORLD APPLICATION SECURITY",
    subtitle: "PROTECT CUSTOMER DATA & BLOCK BOTS",
    icon: ShieldCheck,
    name: "Application Security Audit",
    serviceType: "Application Security Audit & Infrastructure Hardening",
    desc: "Hands-on security testing, code fixes prepared for your developers to review, and bot and rate-limit defenses to protect customer records.",
    for: "Businesses handling customer payments, sensitive private data, or preparing for enterprise client security reviews.",
    includes: [
      "Hands-On Penetration Testing: Testing your logins, APIs and databases the way an attacker would.",
      "Customer Data Access Checks: Checks that no user can view another customer's private invoices or pricing.",
      "Bot and Rate-Limit Defenses: Makes brute-force password attacks and form spam much harder."
    ],
    query: '"Can our application pass enterprise vendor security assessments?"',
    verdict: "It can help. The audit finds and fixes real weaknesses, and the written report shows what was tested and fixed. It does not replace a formal certification.",
    metric: "APPROACH: DIRECT CODE FIXES, WRITTEN REPORT",
    linkText: "Explore application security audit"
  }
];
