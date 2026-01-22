import { Boxes, ShieldCheck, Workflow, Zap } from "lucide-react";

const features = [
  {
    title: "Pipeline-aware guardrails",
    description:
      "Attach contracts to release branches, enforce schema evolution policies, and auto-block drift at merge time.",
    icon: Workflow,
  },
  {
    title: "Chaos-ready reliability",
    description:
      "Simulate load, throttle dependencies, and trigger rollback scripts with deterministic, infrastructure-as-code scenarios.",
    icon: Zap,
  },
  {
    title: "Zero-trust environments",
    description:
      "Ephemeral agents hydrate secrets via vault providers, run hardened jobs, and deliver tamper-proof execution logs.",
    icon: ShieldCheck,
  },
  {
    title: "Artifact intelligence",
    description:
      "Package evidence bundles with versioned assertions, dependency manifests, and compliance snapshots ready for auditors.",
    icon: Boxes,
  },
];

const FeatureGrid = () => {
  return (
    <section className="bg-[#111318] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Release Hardening</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Harden every launch gate with one consolidated DevOps surface.
          </h2>
          <p className="text-base text-white/60 sm:text-lg">
            Our testing mesh plugs into your existing delivery workflows, turning fragmented API coverage into a cohesive reliability posture tailored for rapid launches.
          </p>
        </header>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group h-full rounded-2xl border border-white/5 bg-[#161A20] p-8 transition hover:border-[#EF4444]/40 hover:bg-[#1B1F27]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444] shadow-[0_0_0_1px_rgba(239,68,68,0.2)] transition group-hover:bg-[#EF4444]/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm text-white/60 sm:text-base">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
