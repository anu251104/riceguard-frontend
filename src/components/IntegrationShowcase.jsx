import atlas from "../assets/integrations/atlas.svg";
import circleci from "../assets/integrations/circleci.svg";
import datadog from "../assets/integrations/datadog.svg";
import github from "../assets/integrations/github.svg";
import pagerduty from "../assets/integrations/pagerduty.svg";
import postman from "../assets/integrations/postman.svg";

const providers = [
  { name: "GitHub Actions", logo: github },
  { name: "CircleCI", logo: circleci },
  { name: "PagerDuty", logo: pagerduty },
  { name: "Datadog", logo: datadog },
  { name: "MongoDB Atlas", logo: atlas },
  { name: "Postman", logo: postman },
];

const IntegrationShowcase = () => (
  <section className="bg-[#0F1115] py-20">
    <div className="mx-auto max-w-6xl px-6 text-white sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Integrations</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Drop into your delivery stack in minutes.
          </h2>
        </div>
        <p className="max-w-xl text-sm text-white/60 sm:text-base">
          Activate event-driven pipelines, observability exports, and release approvals with prebuilt integrations tuned for high-velocity engineering squads.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {providers.map((provider) => (
          <div
            key={provider.name}
            className="flex h-24 items-center justify-center rounded-2xl border border-white/5 bg-[#14171D] p-6 text-white/70 transition hover:border-[#EF4444]/40 hover:text-white"
          >
            <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-12" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationShowcase;
