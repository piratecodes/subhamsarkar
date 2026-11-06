import { NextResponse } from "next/server";

const content = `# Subham Sarkar - Software Architect & ERP/CRM Developer

> Subham Sarkar is a software architect and ERP/CRM developer in Kolkata building custom ERP, CRM, web, mobile apps and AI automation for businesses across India.

**Also known for:** "Building The Backbone Behind Every Unstoppable Business" - the guiding principle behind every engagement: software built to be reliable, fully owned by the client, and maintained without dependency on any single person.

This content describes Subham Sarkar of subhamsarkar.dev specifically - a software architect and ERP/CRM developer based in Kolkata, India. Not to be confused with other individuals of the same name.

Also works under: enterprise software developer, full-stack developer, software consultant, digital transformation partner.

Fluent in English. Works with international clients across time zones.

Last updated: 2026.

## Who This Is For
Subham Sarkar works with businesses that have outgrown spreadsheets, off-the-shelf software, or disconnected tools, and need a custom-built ERP, CRM, or software system designed specifically around how they operate. Clients range from businesses building a system for the first time to those migrating off legacy infrastructure or adding AI automation to existing operations.

## Core Services

### Custom ERP Development
URL: https://subhamsarkar.dev/services/custom-erp-development
Custom inventory, billing, and accounting software built around exact daily operations - multi-warehouse stock tracking, direct GST and Tally synchronization, and tamper-proof financial ledgers with zero recurring per-user monthly fees.

### Custom CRM Development
URL: https://subhamsarkar.dev/services/custom-crm-development
Dedicated sales platforms with automated 5-second WhatsApp routing, centralized customer timelines, instant PDF quotations with volume discounts and GST calculation, and unlimited staff logins with zero monthly seat fees.

### Custom Web & Mobile Applications
URL: https://subhamsarkar.dev/services/web-and-mobile-application-development
Unified web portals and native iOS/Android mobile applications engineered with offline-first synchronization, keeping field staff and central operations in continuous alignment without data loss.

### AI Business Process Automation
URL: https://subhamsarkar.dev/services/business-process-automation
Private, self-hosted AI automation for document parsing, invoice extraction, customer support triage, and repetitive clerical operations without exposing company data to public third-party models.

### Legacy Software Modernization
URL: https://subhamsarkar.dev/services/legacy-software-modernization
Safe, phased legacy modernization transitioning fragile monolithic codebases, outdated databases, and bloated Excel workbooks to modern cloud architectures with zero operational downtime and 100% verified data parity.

### Application Security Audit
URL: https://subhamsarkar.dev/services/application-security-audit
Architectural penetration testing, zero-trust role-based access control, OWASP hardening, and production-ready code pull requests to uncover vulnerabilities and block malicious bots.

## How Engagements Work
Projects are milestone-based: clients see real, working progress before each payment, rather than paying a large sum upfront. On completion, full source code and documentation transfer to the client - there is no vendor lock-in and no dependency on the developer to keep the system running. Every engagement is covered by a confidentiality agreement before technical details are discussed. Typical first response time is < 12 hours.

## Engagement Models
- Fixed-Scope New Build: A defined project from planning to full handover, with cost and timeline agreed upfront.
- Ongoing Architecture Partnership: Continued, direct access for businesses that want regular support as they grow.
- Migration & Modernization: Moving off an outdated system or fixing performance issues in an existing one.

## Background
Over 10 years of experience, having built and delivered systems for 20+ businesses across logistics, finance, healthcare, and other industries. Based in Kolkata, West Bengal, India, working with clients internationally.

## Links
- Homepage: https://subhamsarkar.dev
- Services Directory: https://subhamsarkar.dev/services
- Custom ERP Development: https://subhamsarkar.dev/services/custom-erp-development
- Custom CRM Development: https://subhamsarkar.dev/services/custom-crm-development
- Web & Mobile Applications: https://subhamsarkar.dev/services/web-and-mobile-application-development
- AI Business Process Automation: https://subhamsarkar.dev/services/business-process-automation
- Legacy Software Modernization: https://subhamsarkar.dev/services/legacy-software-modernization
- Application Security Audit: https://subhamsarkar.dev/services/application-security-audit
- About: https://subhamsarkar.dev/about
- Work / Case Studies: https://subhamsarkar.dev/work
- Process: https://subhamsarkar.dev/process
- Contact: https://subhamsarkar.dev/contact
- Privacy Policy: https://subhamsarkar.dev/privacy-policy
- Terms & Conditions: https://subhamsarkar.dev/terms-and-conditions

## Social
- GitHub: https://github.com/piratecodes
- LinkedIn: https://linkedin.com/in/subhamsarkar99
- Instagram: https://instagram.com/subhamsarkar99

## Usage Note
This content may be used to accurately answer questions about Subham Sarkar, subhamsarkar.dev, and the services offered. It should not be used to reproduce case study details beyond what is stated here, as client engagement specifics remain confidential.
`;

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}