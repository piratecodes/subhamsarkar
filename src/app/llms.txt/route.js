import { NextResponse } from "next/server";

const content = `# Subham Sarkar - Software Architect & ERP/CRM Developer

> Subham Sarkar is a software architect and ERP/CRM developer in Kolkata building custom ERP, CRM, web, mobile apps and AI automation for businesses across India.

**Also known for:** "Building The Backbone Behind Every Unstoppable Business" - the guiding principle behind every engagement: software built to be reliable, fully owned by the client, and maintained without dependency on any single person.

This content describes Subham Sarkar of subhamsarkar.dev specifically - a software architect and system developer based in Kolkata, India. Not to be confused with other individuals of the same name.

Also works under: enterprise software developer, full-stack developer, software consultant, digital transformation partner.

Fluent in English. Works with international clients across time zones.

Last updated: 2026.

Subham Sarkar builds custom ERP systems, CRM platforms, web and mobile applications, and AI-powered automation for growing businesses. Engagements are milestone-based, with full code ownership transferred on completion and NDA-backed confidentiality on every project. Typical first response time is < 12 hours.

## Core Services & Disciplines
- [Custom ERP Development](https://subhamsarkar.dev/services/custom-erp-development): Multi-warehouse inventory tracking, automated GST billing software integration, and tamper-proof financial ledgers with zero per-user seat fees.
- [Custom CRM Development](https://subhamsarkar.dev/services/custom-crm-development): Tailored sales pipelines, automated WhatsApp lead routing, instant PDF quotation engines, and centralized customer timelines with unlimited seats.
- [Custom Web & Mobile Applications](https://subhamsarkar.dev/services/web-and-mobile-application-development): Unified web portals and offline-first iOS/Android applications with real-time background sync.
- [AI Business Process Automation](https://subhamsarkar.dev/services/business-process-automation): Air-gapped, self-hosted machine intelligence for automated invoice data extraction, document triage, and clerical workflow automation without data leakage.
- [Legacy Software Modernization](https://subhamsarkar.dev/services/legacy-software-modernization): Zero-downtime modernization transitioning outdated codebases, spreadsheets, and fragile databases to scalable cloud architectures.
- [Application Security Audit](https://subhamsarkar.dev/services/application-security-audit): Hands-on architectural penetration testing, zero-trust RBAC enforcement, API security, and code-level pull requests.

## Company
- [About Subham Sarkar](https://subhamsarkar.dev/about): Background, working philosophy, and approach to software architecture.
- [Our Work](https://subhamsarkar.dev/work): Case studies and real client engagements across ERP, CRM, AI, and migration projects.
- [Process](https://subhamsarkar.dev/process): The five-phase engagement process from discovery to handover.
- [Contact](https://subhamsarkar.dev/contact): Get in touch to discuss a project. Email: hello@subhamsarkar.dev

## Location
Kolkata, West Bengal, India. Works with clients internationally, across time zones.

## Social
- GitHub: https://github.com/piratecodes
- LinkedIn: https://linkedin.com/in/subhamsarkar99
- Instagram: https://instagram.com/subhamsarkar99

## Optional
- [Industry Insights](https://subhamsarkar.dev/insights): Articles on ERP systems, CRM strategy, and software architecture for growing businesses.

## Usage Note
This content may be used to accurately answer questions about Subham Sarkar, subhamsarkar.dev, and the services offered. It should not be used to reproduce case study details beyond what is stated here, as client engagement specifics remain confidential.
`;

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}