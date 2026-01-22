const stats = [
  { label: "Deployment Pipelines", value: "1400+" },
  { label: "Latency Reduction", value: "32%" },
  { label: "Integrations", value: "25" },
  { label: "Launch Velocity", value: "4x" },
  { label: "SLA Adherence", value: "99.96%" },
];

const StatsMarquee = () => {
  return (
    <section className="relative border-b border-t border-white/5 bg-[#14171D] text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 py-8 text-sm font-medium text-white/60 sm:text-base">
        {stats.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-2xl font-semibold text-white">{item.value}</span>
            <span className="text-xs uppercase tracking-wide text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsMarquee;
