import HeroSection from "../components/HeroSection";
import { Navbar } from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { Leaf, Github, Twitter, Linkedin, Sprout, Droplets, Sun } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <Navbar />
      <HeroSection />
      
      {/* Sustainable Farming Section */}
      <section className="py-20 bg-[#111318]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">Eco-Friendly</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Sustainable Agriculture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We promote environmental remedies and reduced pesticide use for a healthier ecosystem and better crop quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1A1D24] p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
              <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-500">
                <Sprout size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Organic Remedies</h3>
              <p className="text-gray-400 leading-relaxed">
                Use bio-control agents like Trichoderma and Pseudomonas instead of harsh chemicals to fight diseases naturally.
              </p>
            </div>

            <div className="bg-[#1A1D24] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                <Droplets size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Water Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Proper drainage and irrigation scheduling can prevent many fungal diseases without needing chemical treatments.
              </p>
            </div>

            <div className="bg-[#1A1D24] p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-yellow-500">
                <Sun size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Natural Prevention</h3>
              <p className="text-gray-400 leading-relaxed">
                Crop rotation, resistant varieties, and soil health improvement are the best defense against outbreaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B0D12] py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-500">Join the Movement</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to protect your harvest?</h2>
            <p className="max-w-xl text-sm text-white/60 sm:text-base">
              Join thousands of farmers using RiceGuard AI to detect diseases early and ensure a healthy crop yield.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/detect"
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Start Detection Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#0B0D12] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-white/70">© {new Date().getFullYear()} RiceGuard AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-green-500 transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-green-500 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-green-500 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
