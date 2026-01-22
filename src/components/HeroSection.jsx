import { ArrowRight, PlayCircle, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = ({ onPrimaryClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#0F1115] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_55%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 sm:px-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            AI-Powered Agriculture
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Protect your rice crops with instant disease detection.
          </h1>
          <p className="text-base text-white/70 sm:text-lg">
            Identify Bacterial Blight, Tungro, Blast, and Brown Spot in seconds. Get expert treatment advice and chat with our AI agronomist.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/detect"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <Leaf className="h-4 w-4" />
              Start Detection
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/30 hover:text-white"
            >
              <PlayCircle className="h-5 w-5" />
              Learn more
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-sm text-white/60 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Accuracy</dt>
              <dd className="mt-1 text-lg font-semibold text-white">95%+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Diseases</dt>
              <dd className="mt-1 text-lg font-semibold text-white">5 Types</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Support</dt>
              <dd className="mt-1 text-lg font-semibold text-white">24/7 AI</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Cost</dt>
              <dd className="mt-1 text-lg font-semibold text-white">Free</dd>
            </div>
          </dl>
        </div>
        <div className="relative z-10 flex w-full max-w-lg flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">Real-time Analysis</h2>
            <p className="text-sm text-white/60">
              Upload a photo of a rice leaf and get instant results with confidence scores.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40">Processing</p>
              <p className="mt-3 text-2xl font-semibold text-white">&lt;2s</p>
              <p className="mt-2 text-xs text-white/50">Fast inference.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40">Offline Mode</p>
              <p className="mt-3 text-2xl font-semibold text-white">Soon</p>
              <p className="mt-2 text-xs text-white/50">Mobile app coming.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40">Expert Chat</p>
              <p className="mt-3 text-2xl font-semibold text-white">Live</p>
              <p className="mt-2 text-xs text-white/50">Ask anything.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40">History</p>
              <p className="mt-3 text-2xl font-semibold text-white">Auto</p>
              <p className="mt-2 text-xs text-white/50">Track outbreaks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
