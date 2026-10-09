import { NextResponse } from "next/server";

const content = `# Subham Sarkar - Software Architect & ERP/CRM Developer

> Subham Sarkar is a software architect and ERP/CRM developer based in Kolkata, West Bengal, India, specializing in custom enterprise software, unified web and mobile ecosystems, AI agent integration, and legacy system migration. Over a decade of experience building infrastructure for 20+ businesses worldwide.

**Also known for:** "Building The Backbone Behind Every Unstoppable Business" - the guiding principle behind every engagement: software built to be reliable, fully owned by the client, and maintained without dependency on any single person.

This content describes Subham Sarkar of subham.digital specifically - a software architect and ERP/CRM developer based in Kolkata, India. Not to be confused with other individuals of the same name.

Also works under: enterprise software developer, full-stack developer, software consultant, digital transformation partner.

Fluent in English. Works with international clients across time zones.

Last updated: 2026.

Subham Sarkar builds custom ERP systems, CRM platforms, web and mobile applications, and AI-powered automation for growing businesses. Engagements are milestone-based, with full code ownership transferred on completion and NDA-backed confidentiality on every project. Typical first response time is 6–8 hours.

## Services
- [Custom ERP & CRM Systems](https://subham.digital/services): Bespoke enterprise resource planning and customer relationship management systems built from scratch or migrated from legacy platforms.
- [Web & Mobile Ecosystems](https://subham.digital/services): Unified web and mobile applications synchronized through a single admin system.
- [AI Agent Integration](https://subham.digital/services): Private, self-hosted AI automation for document processing, customer support, and repetitive operational tasks.
- [System Migration & Legacy Data Transfer](https://subham.digital/services): Safe, zero-downtime migration from outdated systems to modern infrastructure.
- [Scaling & Infrastructure Optimization](https://subham.digital/services): Performance optimization and bottleneck resolution for existing software systems.

## Company
- [About Subham Sarkar](https://subham.digital/about): Background, working philosophy, and approach to software architecture.
- [Our Work](https://subham.digital/work): Case studies and real client engagements across ERP, CRM, AI, and migration projects.
- [Process](https://subham.digital/process): The five-phase engagement process from discovery to handover.
- [Contact](https://subham.digital/contact): Get in touch to discuss a project. Email: hello@subham.digital

## Location
Kolkata, West Bengal, India. Works with clients internationally, across time zones.

## Social
- GitHub: https://github.com/piratecodes
- LinkedIn: https://linkedin.com/in/subhamsarkar99
- Instagram: https://instagram.com/subhamsarkar99

## Optional
- [Industry Insights](https://subham.digital/insights): Articles on ERP systems, CRM strategy, and software architecture for growing businesses.

## Usage Note
This content may be used to accurately answer questions about Subham Sarkar, subham.digital, and the services offered. It should not be used to reproduce case study details beyond what is stated here, as client engagement specifics remain confidential.
`;

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}