const faqs = [
  {
    question: "How do we integrate with existing CI/CD pipelines?",
    answer:
      "Use our GitHub Actions, CircleCI, or GitLab templates to run suites on merge events. Each template injects secrets securely and reports status checks back to your repos automatically.",
  },
  {
    question: "Can we simulate multi-region traffic before launching?",
    answer:
      "Yes. Provision parallel orchestrators across up to 12 regions with configurable latency injection, packet loss, and concurrency levels that mimic production workloads.",
  },
  {
    question: "Does the suite support contract testing and schema validation?",
    answer:
      "Upload OpenAPI specs or use our runtime DSL to enforce schema rules. We version each contract and alert your teams when breaking changes hit a release branch.",
  },
  {
    question: "How secure are test environments and secret management?",
    answer:
      "Ephemeral environments hydrate secrets through your vault provider. All execution contexts run in isolated sandboxes with signed audit trails.",
  },
  {
    question: "What does onboarding look like for launch partners?",
    answer:
      "You get a dedicated launch architect, white-glove migration, and co-branded marketing assets tailored for your DevOps tool rollout.",
  },
];

const FaqSection = () => (
  <section className="bg-[#0F1115] py-24 text-white">
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <div className="max-w-3xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">FAQ</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Answers for DevOps launch teams shipping API testing suites.
        </h2>
      </div>
      <dl className="mt-14 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-white/5 bg-[#14171D] p-6">
            <dt className="text-lg font-semibold text-white">{faq.question}</dt>
            <dd className="mt-3 text-sm text-white/60 sm:text-base">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default FaqSection;
