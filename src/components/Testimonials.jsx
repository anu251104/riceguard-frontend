const testimonials = [
  {
    quote:
      "We consolidated three testing toolchains into one programmable surface and cut release verification time by half. The observability exports are audit-ready from day one.",
    name: "Jamie Ortega",
    role: "VP of Platform Engineering, MergeStack"
  },
  {
    quote:
      "Launch suites gave us deterministic, data-backed approvals across 14 regions. Our product and SRE teams finally speak the same language on API readiness.",
    name: "Priya Gupta",
    role: "Director of DevOps, HelixPulse"
  },
  {
    quote:
      "We modeled pricing instantly and shipped our own API testing tier with confidence. Customers receive validated endpoints before onboarding even begins.",
    name: "Gabe Li",
    role: "Founder, SyncForge"
  }
];

const Testimonials = () => (
  <section className="bg-[#111318] py-24 text-white">
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <div className="max-w-3xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Trusted Launches</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          DevOps leaders use Launch Suite to ship resilient APIs at top speed.
        </h2>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="h-full rounded-2xl border border-white/5 bg-[#161A20] p-8"
          >
            <blockquote className="text-sm text-white/70 sm:text-base">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 space-y-1">
              <p className="text-sm font-semibold text-white">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-wide text-white/40">
                {testimonial.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
