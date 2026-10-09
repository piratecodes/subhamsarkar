import { ArrowLeftRight, Bot, Database, Laptop, Network } from "lucide-react";
export default function Capabilities() {
  const capabilities = [
    {
      spec: "SPEC: ARCH-01",
      icon: Network,
      title: "System Architecture & Design",
      desc: "High-availability distributed schema design, database partitioning, and real-time state synchronization. Creating decoupled microservices with guaranteed consistency regimes.",
      benefit: "BENEFIT: Zero single-point failures & deterministic data sync.",
      colSpan: 1
    },
    {
      spec: "SPEC: ARCH-02",
      icon: Database,
      title: "ERP/CRM Engineering",
      desc: "Custom accounting pipelines, complex inventory engines, and role-based multi-tier administrative dashboards. Built specifically for high-frequency operations without SaaS bloat.",
      benefit: "BENEFIT: 100% tailored business rules & instant audit trails.",
      colSpan: 1
    },
    {
      spec: "SPEC: ARCH-03",
      icon: Laptop,
      title: "Web & Mobile Ecosystems",
      desc: "Offline-first synchronization, high-speed client interfaces, and fault-tolerant API gateways. Engineered for low-latency operational control in warehouse, field, or executive environments.",
      benefit: "BENEFIT: Sub-50ms local interactions with background reconciliation.",
      colSpan: 1
    },
    {
      spec: "SPEC: ARCH-04",
      icon: Bot,
      title: "AI Agent Integration",
      desc: "Contextual RAG vector search, local on-prem inference, and autonomous reconciliation bots. Connecting LLM reasoning to verified SQL data stores with absolute mathematical guardrails.",
      benefit: "BENEFIT: Zero privacy leaks, deterministic operations, automated toil reduction.",
      colSpan: 1
    },
    {
      spec: "SPEC: ARCH-05",
      icon: ArrowLeftRight,
      title: "Legacy Migration & Decoupling",
      desc: "Zero-downtime dual-write cutovers, schema refactoring, and automated data checksum validation. Transition multi-terabyte unmaintained operational databases into modern, sovereign stacks while your business keeps billing customers.",
      benefit: "BENEFIT: Zero transaction drops during transition. Guaranteed ledger integrity.",
      colSpan: 2,
      tag: "ZERO DOWNTIME CUTOVER"
    }
  ];

  return (
    <section className="w-full bg-surface-container-low/75 py-16">
      <div className="w-full container px-4 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary tracking-widest uppercase block">
              STRUCTURAL PORTFOLIO // TECHNICAL DISCIPLINES
            </span>
            <h2 className="font-display text-[36px] leading-[44px] tracking-[-0.02em] font-semibold text-on-surface tracking-tight mt-1">
              Engineered Capabilities
            </h2>
          </div>
          <p className="font-sans text-[13px] leading-5 tracking-[0em] font-normal text-secondary max-w-md">
            Targeted solutions to intractable enterprise bottlenecks. No superficial wrapper layers — deep architectural remediation from database schema to user interaction.
          </p>
        </div>
        {/* 5 Bento Categorized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className={`bg-surface-container-lowest/75 p-10 rounded-xl shadow-sm space-y-4 flex flex-col justify-between ${cap.colSpan === 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-secondary">
                  <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-bold text-primary block uppercase">{cap.spec}</span>
                  <cap.icon className="text-[20px]" />
                </div>
                <h3 className="font-display text-[18px] leading-6 tracking-[0em] font-semibold text-on-surface">
                  {cap.title}
                </h3>
                <p className="font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal text-secondary leading-relaxed">
                  {cap.desc}
                </p>
              </div>
              <div className={`pt-4 bg-surface-container-high/75 px-4 py-1 rounded flex flex-wrap items-center justify-between gap-2`}>
                <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-on-surface block">{cap.benefit}</span>
                {cap.tag && (
                  <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-bold text-primary tracking-widest uppercase block">
                    {cap.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
