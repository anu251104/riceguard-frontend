import { useState } from "react";
import { Copy, Play, Terminal, Check } from "lucide-react";

const snippets = {
  "Node.js": `import { defineSuite } from "@launch/api";
import { expect } from "@launch/assert";

export default defineSuite(({ http, secrets }) => {
  const token = secrets.get("STAGING_TOKEN");

  http.get("/health", { headers: { Authorization: token } })
    .expectStatus(200)
    .expectJson((body) => {
      expect(body.status).toEqual("ok");
      expect(body.version).toMatch(/v[0-9]+\\.[0-9]+/);
    });

  http.post("/billing/quote", {
    payload: { plan: "scale", seats: 120 }
  })
    .expectStatus(202)
    .expectHeader("x-release-id");
});`,
  "Python": `from launch.suite import define_suite

@define_suite
def test_release_gate(http, secrets):
    token = secrets.get("STAGING_TOKEN")

    http.get("/health", headers={"Authorization": token}) \
        .expect_status(200) \
        .expect_json(lambda body: (
            body["status"] == "ok" and
            body["version"].startswith("v")
        ))

    http.post("/billing/quote", json={"plan": "scale", "seats": 120}) \
        .expect_status(202) \
        .expect_header("x-release-id")`,
  "Go": `package suite

import (
    "testing"
    launch "github.com/launch/api"
)

func TestReleaseGate(t *testing.T) {
    suite := launch.NewSuite(t)
    token := suite.Secrets.Get("STAGING_TOKEN")

    suite.HTTP.Get("/health",
        launch.WithHeader("Authorization", token),
    ).ExpectStatus(200).ExpectJSON(func(body launch.JSON) {
        body.ExpectString("status").ToEqual("ok")
        body.ExpectString("version").ToMatch("^v\\d+\\.\\d+$")
    })

    suite.HTTP.Post("/billing/quote",
        launch.WithJSON(map[string]any{"plan": "scale", "seats": 120}),
    ).ExpectStatus(202).ExpectHeader("x-release-id")
}`,
};

const languages = Object.keys(snippets);

const CodePlayground = () => {
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[activeLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  };

  return (
    <section id="code-playground" className="bg-[#14171D] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#EF4444]">Live Code Editor</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Spin up launch-ready suites in your favorite runtime.
            </h2>
            <p className="max-w-xl text-base text-white/60">
              Swap runtimes on the fly, validate complex flows, and commit with confidence knowing every API contract stays observable.
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20"
          >
            <Terminal className="h-4 w-4" />
            Launch CLI
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px,_1fr]">
          <div className="h-full rounded-2xl border border-white/10 bg-[#181C22] p-5">
            <p className="text-sm font-semibold text-white">Suite template presets</p>
            <p className="mt-2 text-xs text-white/50">
              Pick a runtime to generate automation ready to push.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setActiveLanguage(language)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                    activeLanguage === language
                      ? "border-[#EF4444]/60 bg-[#EF4444]/15 text-white"
                      : "border-white/5 bg-transparent text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {language}
                  {activeLanguage === language ? (
                    <span className="text-xs font-medium text-[#EF4444]">Active</span>
                  ) : (
                    <span className="text-xs font-medium text-white/30">Select</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-[#0F1115] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                <span className="h-3 w-3 rounded-full bg-[#F97316]" />
                <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1 text-xs font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#EF4444] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#f25555]">
                  <Play className="h-3.5 w-3.5" />
                  Run suite
                </button>
              </div>
            </div>
            <pre className="mt-6 h-[420px] overflow-auto rounded-xl bg-[#0B0D12] p-6 text-sm leading-relaxed text-[#F8FAFC]">
              <code>{snippets[activeLanguage]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePlayground;
