import { Laptop, Workflow, Brain, TrendingUp, Gauge } from "lucide-react";

export const services = [
  {
    spec: "SPEC: 01",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "ALWAYS-IN-SYNC SYSTEMS",
    subtitle: "WORKS ONLINE, OFFLINE, EVERYWHERE",
    icon: Laptop,
    name: "Unified Web + Mobile Systems",
    serviceType: "Web and mobile application development",
    desc: "One connected system for your website, app, and staff — whether they're in the office, at home, or out in the field. Everyone sees the same live information, automatically.",
    for: "Businesses running a website, an app, and field or office staff who currently rely on separate, disconnected tools.",
    includes: [
      "Offline-Ready Design: Staff can keep working even without internet — everything syncs automatically the moment they're back online.",
      "Real-Time Updates: Changes made on one device appear instantly across the whole system, with no manual refreshing.",
      "Role-Based Access: Every team member sees only what's relevant to their role, kept secure by default."
    ],
    query: '"Can this work for staff with unreliable internet in the field?"',
    verdict: "Yes. The system is built to keep working offline, then automatically sync everything the moment a connection returns — no data lost, no manual re-entry needed.",
    metric: "APPROACH: OFFLINE-FIRST BY DESIGN"
  },
  {
    spec: "SPEC: 02",
    specType: "bg-primary-container text-on-primary",
    title: "YOUR BUSINESS, YOUR SYSTEM",
    subtitle: "BUILT AROUND HOW YOU ACTUALLY WORK",
    icon: Workflow,
    name: "Custom ERP / CRM Systems",
    serviceType: "ERP and CRM software development",
    desc: "A system built specifically around how your business operates — not a generic template you have to bend your workflow around. Inventory, finances, and customer relationships, all in one place.",
    for: "Businesses that have outgrown spreadsheets or off-the-shelf software that charges per seat and doesn't fit how they actually work.",
    includes: [
      "Accurate Financial Records: A reliable, tamper-evident ledger that keeps your books consistent and easy to audit.",
      "Smart Inventory Tracking: Prevents overselling and lost orders by keeping stock levels accurate in real time.",
      "Automated Workflows: Repetitive tasks trigger automatically based on real business events, not manual follow-up."
    ],
    query: '"Can this integrate with our existing accounting or payroll tools?"',
    verdict: "Yes. We build dedicated connections to your existing tools, so financial and operational data flows automatically instead of being re-entered by hand.",
    metric: "APPROACH: BUILT TO FIT, NOT FORCED"
  },
  {
    spec: "SPEC: 03",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "AI THAT STAYS PRIVATE",
    subtitle: "YOUR DATA NEVER LEAVES YOUR SYSTEM",
    icon: Brain,
    name: "AI Agent Integration",
    serviceType: "AI agent and workflow integration",
    desc: "AI that quietly handles the repetitive parts of your operations — sorting documents, flagging exceptions, answering common questions — without your data ever leaving your own systems.",
    for: "Teams spending hours a week on manual document review, data entry, or answering the same customer questions repeatedly.",
    includes: [
      "Private, Self-Hosted AI: Runs entirely within your own systems — never sent to, or used to train, any public AI model.",
      "Smart Document Search: Instantly finds and understands relevant information across your existing records.",
      "Built-In Safeguards: Automated checks catch incorrect AI actions before they happen, keeping a human in control."
    ],
    query: '"Will proprietary company data leak to third-party AI models?"',
    verdict: "No. AI processing runs entirely within your own private infrastructure — your data is never sent to, or used to train, any public AI model.",
    metric: "APPROACH: PRIVATE BY DEFAULT"
  },
  {
    spec: "SPEC: 04",
    specType: "bg-primary-container text-on-primary",
    title: "MOVE SYSTEMS WITHOUT THE RISK",
    subtitle: "NO DOWNTIME, NO LOST DATA",
    icon: TrendingUp,
    name: "System Migration & Legacy Data Transfer",
    serviceType: "Legacy software migration and data transfer",
    desc: "Moving off an old, fragile system safely — without losing data, and without stopping your business while it happens.",
    for: "Businesses running critical operations on outdated software that's becoming risky or difficult to maintain.",
    includes: [
      "Parallel Testing: Your old and new systems run side-by-side until we confirm everything matches perfectly.",
      "Verified Data Accuracy: Every migrated record is checked and cross-verified, so nothing is lost or altered.",
      "Gradual, Safe Switchover: Traffic moves to the new system in controlled steps, with the ability to roll back instantly if needed."
    ],
    query: '"Will our customer-facing service experience downtime during migration?"',
    verdict: "We aim for zero disruption. Your old and new systems run in parallel and are fully verified to match before we switch over — with the ability to roll back instantly if anything looks off.",
    metric: "APPROACH: ZERO-DISRUPTION MIGRATION"
  },
  {
    spec: "SPEC: 05",
    specType: "bg-secondary-container text-on-secondary-fixed",
    title: "FASTER, WITHOUT A REBUILD",
    subtitle: "FIX WHAT'S SLOWING YOU DOWN",
    icon: Gauge,
    name: "Scaling & Rebuilding Existing Infrastructure",
    serviceType: "Infrastructure optimization and software modernization",
    desc: "Fixing the parts of your current system that are slowing down, breaking under load, or costing more than they should — without rebuilding everything from scratch.",
    for: "Businesses whose current software is getting slower, more expensive, or less reliable as they grow.",
    includes: [
      "Targeted Fixes: We find and fix the specific issues actually causing slowdowns, instead of guessing.",
      "Smarter Data Handling: Frequently used information loads faster, easing pressure on your systems.",
      "Reduced Cloud Costs: Optimized systems often run on less infrastructure, lowering your hosting bills."
    ],
    query: '"Can this be done incrementally, without rewriting the whole platform?"',
    verdict: "Yes. We identify and fix the specific issues causing the most slowdown first, so your system improves without a risky, ground-up rebuild.",
    metric: "APPROACH: FIX WHAT MATTERS FIRST"
  }
];
