import { useMemo, useState } from "react";
import { Slider } from "./ui/Slider";

const PricingCalculator = () => {
  const [environments, setEnvironments] = useState(3);
  const [tests, setTests] = useState(250);
  const [regions, setRegions] = useState(4);

  const price = useMemo(() => {
    const base = 399;
    const environmentMultiplier = environments * 120;
    const testMultiplier = Math.ceil(tests / 50) * 35;
    const regionMultiplier = regions * 45;
    return base + environmentMultiplier + testMultiplier + regionMultiplier;
  }, [environments, tests, regions]);

  const estimatedSavings = useMemo(() => {
    const manualHours = tests * 0.6;
    const hourlyRate = 75;
    return Math.round(manualHours * hourlyRate * 0.65);
  }, [tests]);

  return (
    <section className="bg-[#0F1115] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,_1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Pricing Calculator</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Project your launch economics before you commit.
            </h2>
            <p className="text-base text-white/60">
              Model environments, concurrent tests, and regions to preview how our API testing suite scales with your DevOps rollout.
            </p>
            <div className="rounded-2xl border border-white/10 bg-[#14171D]/80 p-8">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Environments</span>
                    <span className="text-white/60">{environments}</span>
                  </div>
                  <Slider
                    min={1}
                    max={8}
                    step={1}
                    value={environments}
                    onChange={setEnvironments}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Automated tests per month</span>
                    <span className="text-white/60">{tests}</span>
                  </div>
                  <Slider
                    min={50}
                    max={1000}
                    step={50}
                    value={tests}
                    onChange={setTests}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Regions</span>
                    <span className="text-white/60">{regions}</span>
                  </div>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={regions}
                    onChange={setRegions}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-[#EF4444]/40 bg-[#181C22] p-8 shadow-[0_0_35px_rgba(239,68,68,0.15)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Projected Investment</p>
              <p className="mt-4 text-4xl font-semibold">${price.toLocaleString()}</p>
              <p className="mt-2 text-sm text-white/60">per month, cancel anytime</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#EF4444] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f25555]">
                Book launch architect
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#14171D] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                Estimated manual QA savings
              </p>
              <p className="mt-4 text-3xl font-semibold text-white">
                ${estimatedSavings.toLocaleString()}/yr
              </p>
              <p className="mt-2 text-sm text-white/60">
                Redeploy teams toward release engineering while suites run autonomously with actionable analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
