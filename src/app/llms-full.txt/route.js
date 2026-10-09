import { NextResponse } from "next/server";

const content = `# Subham Sarkar - Software Architect & ERP/CRM Developer

> Subham Sarkar is a software architect and ERP/CRM developer based in Kolkata, India, with over a decade of experience building custom enterprise software for growing businesses worldwide.

**Also known for:** "Building The Backbone Behind Every Unstoppable Business" - the guiding principle behind every engagement: software built to be reliable, fully owned by the client, and maintained without dependency on any single person.

This content describes Subham Sarkar of subhamsarkar.dev specifically - a software architect and ERP/CRM developer based in Kolkata, India. Not to be confused with other individuals of the same name.

Also works under: enterprise software developer, full-stack developer, software consultant, digital transformation partner.

Fluent in English. Works with international clients across time zones.

Last updated: 2026.

## Who This Is For
Subham Sarkar works with businesses that have outgrown spreadsheets, off-the-shelf software, or disconnected tools, and need a custom-built ERP, CRM, or software system designed specifically around how they operate. Clients range from businesses building a system for the first time to those migrating off legacy infrastructure or adding AI automation to existing operations.

## Core Services

### Custom ERP & CRM Systems
Bespoke enterprise resource planning and customer relationship management platforms, built either fully isolated and from scratch, or integrated with existing tools. Includes accurate financial ledgers, inventory tracking, and workflow automation tailored to the business.

### Web & Mobile Ecosystems
Unified web and mobile applications that stay synchronized automatically, managed through a single super-admin system. Designed to work offline-first for field staff with unreliable connectivity.

### AI Agent Integration
Private, self-hosted AI automation layered into existing business systems - document classification, customer support triage, and repetitive task automation - without sending data to third-party AI models.

### System Migration & Legacy Data Transfer
Safe transition from outdated, fragile systems to modern infrastructure, using parallel verification and gradual cutover to avoid downtime or data loss.

### Scaling & Infrastructure Optimization
Performance triage and targeted fixes for existing systems suffering from slowdowns, bottlenecks, or rising infrastructure costs - without a full rebuild.

## How Engagements Work
Projects are milestone-based: clients see real, working progress before each payment, rather than paying a large sum upfront. On completion, full source code and documentation transfer to the client - there is no vendor lock-in and no dependency on the developer to keep the system running. Every engagement is covered by a confidentiality agreement before technical details are discussed. Typical first response time is 6–8 hours.

## Engagement Models
- Fixed-Scope New Build: A defined project from planning to full handover, with cost and timeline agreed upfront.
- Ongoing Architecture Partnership: Continued, direct access for businesses that want regular support as they grow.
- Migration & Modernization: Moving off an outdated system or fixing performance issues in an existing one.

## Background
Over 10 years of experience, having built and delivered systems for 20+ businesses across logistics, finance, healthcare, and other industries. Based in Kolkata, West Bengal, India, working with clients internationally.

## Links
- Homepage: https://subhamsarkar.dev
- Services: https://subhamsarkar.dev/services
- About: https://subhamsarkar.dev/about
- Work / Case Studies: https://subhamsarkar.dev/work
- Process: https://subhamsarkar.dev/process
- Contact: https://subhamsarkar.dev/contact

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