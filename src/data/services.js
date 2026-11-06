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
    desc: "Custom inventory, billing, and accounting software built around your exact daily operations—eliminating messy spreadsheets and per-user monthly bills.",
    for: "Growing businesses managing multiple godowns or stores that have outgrown Excel and want an integrated system.",
    includes: [
      "Tamper-Proof Records: Clear permanent history of every bill, payment, and adjustment with zero missing numbers.",
      "Live Multi-Godown Stock: Stock levels update instantly across all stores and counters with zero overselling.",
      "Direct Tally & GST Sync: Invoices and tax entries push directly to your accounting software without double typing."
    ],
    query: '"Can this integrate seamlessly with our existing accounting or GST/tax tools?"',
    verdict: "Yes. Invoices, e-way bills, and journal entries sync directly into Tally, Zoho Books, or QuickBooks with zero duplicate data entry.",
    metric: "APPROACH: TAILORED WORKFLOWS, NO PER-USER FEES"
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
    desc: "Dedicated sales platforms with automated 5-second WhatsApp replies, centralized customer timelines, instant PDF quotes, and unlimited staff logins.",
    for: "Sales teams losing track of customer chats across personal phones or tired of paying ₹15,000/seat every month.",
    includes: [
      "5-Second WhatsApp Replies: Automated greetings and catalog links sent the moment a lead inquires.",
      "Instant PDF Quotations: Generates professional branded quotes with volume discounts and GST in 30 seconds.",
      "Complete Client History: Every call, message, and quote revision organized in one searchable timeline."
    ],
    query: '"Will our sales team find custom software intuitive compared to mainstream tools?"',
    verdict: "Every screen is co-designed around your team's exact daily habits, stripping away irrelevant SaaS clutter so reps close deals faster.",
    metric: "APPROACH: SPEED TO LEAD, UNLIMITED SEATS"
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
    desc: "One connected system for your website, staff apps, and customer portals—keeping information identical whether staff are in the office or in a basement with no signal.",
    for: "Companies with field staff, drivers, or technicians who need mobile apps that keep working even without internet.",
    includes: [
      "Works 100% Offline: Field teams can take orders and record visits without signal; uploads automatically when online.",
      "Instant Live Updates: Changes made on one phone appear on office desktop screens in under a second.",
      "Identical Rules: Website, Android, and iPhone apps share the same pricing and validation rules without discrepancy."
    ],
    query: '"Can staff in areas with poor cellular reception still record transactions?"',
    verdict: "Yes. Offline entries save directly to the phone and queue up for automatic sync the moment reception is regained.",
    metric: "APPROACH: OFFLINE-FIRST BY DESIGN"
  },
  {
    spec: "SPEC: 04",
    slug: "business-process-automation",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "PRIVATE ENTERPRISE AI",
    subtitle: "YOUR COMPANY DATA NEVER LEAVES YOUR SERVERS",
    icon: Brain,
    name: "AI Business Process Automation",
    serviceType: "Business Process Automation & AI Integration",
    desc: "Private AI that handles repetitive paperwork—extracting tables from messy PDFs, sorting invoices, and answering questions—without your data leaking to public chatbots.",
    for: "Teams spending hours every week manually typing invoice details, checking contracts, or sorting repetitive customer inquiries.",
    includes: [
      "100% Private Cloud: AI models run on your own private cloud servers—data is never used to train public models.",
      "Human Approval Gates: High-value payments and approvals require a manager's one-click confirmation before executing.",
      "Messy Document Parsing: Reads crumpled receipts, skewed phone photos, and multi-page supplier bills accurately."
    ],
    query: '"Will an AI agent take unintended actions or hallucinate business decisions?"',
    verdict: "No. The AI is bound by strict validation rules, and any significant financial action requires explicit human confirmation.",
    metric: "APPROACH: STRICT RULES, ZERO DATA LEAKAGE"
  },
  {
    spec: "SPEC: 05",
    slug: "legacy-software-modernization",
    specType: "bg-primary-container text-on-primary",
    title: "ZERO-DOWNTIME UPGRADES",
    subtitle: "MODERNIZE OLD SOFTWARE SAFELY",
    icon: ArrowRightLeft,
    name: "Legacy Software Modernization",
    serviceType: "Legacy Software Modernization & Cloud Architecture",
    desc: "Safely upgrading slow, outdated software and messy databases to fast modern cloud systems without a single minute of customer downtime.",
    for: "Businesses running critical operations on aging software where unexpected downtime or lost data would cost lakhs.",
    includes: [
      "Step-by-Step Modernization: We upgrade modules piece by piece so you get speed improvements right away.",
      "Live Side-by-Side Testing: Old and new systems run together to verify that 100% of data matches before switching.",
      "1-Click Instant Rollback: Switchover happens in controlled stages with an instant fallback safety net."
    ],
    query: '"Will our customer operations or active transactions pause during migration?"',
    verdict: "Zero planned downtime. Old and new systems run in parallel until 100% parity is mathematically verified.",
    metric: "APPROACH: ZERO-DOWNTIME PARALLEL MIGRATION"
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
    desc: "Thorough hands-on security inspection, direct code patches in your repository, and automated defenses to protect customer records from hackers and bots.",
    for: "Businesses handling customer payments, sensitive private data, or preparing for enterprise client security reviews.",
    includes: [
      "Hands-On Penetration Audit: Testing your login, APIs, and databases like an ethical hacker to find real weaknesses.",
      "Lock Down Customer Data: Ensures no user or competitor can view other customers' private invoices or pricing.",
      "Smart Bot & Rate-Limit Defenses: Automatically blocks brute-force password attacks and form spam without slowing real users."
    ],
    query: '"Can our application pass enterprise vendor security assessments?"',
    verdict: "Yes. We deliver direct code pull requests, configuration patches, and signed architectural attestation reports.",
    metric: "APPROACH: DIRECT CODE FIXES, PROVEN RESILIENCE"
  }
];
