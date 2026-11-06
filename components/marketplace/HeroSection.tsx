"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Boxes,
} from "lucide-react";
import { Spotlight } from "@/components/ui/aceternity/Spotlight";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { ShimmerButton } from "@/components/ui/aceternity/ShimmerButton";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";

export function HeroSection() {
  const router = useRouter();
  const { publishedEnvironments } = useMarketplaceStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  const popularTags = [
    { label: "Playwright", query: "Playwright" },
    { label: "MicroVM Sandboxes", query: "MicroVM" },
    { label: "Postgres Branches", query: "Postgres" },
    { label: "CUDA GPU", query: "CUDA" },
    { label: "LangGraph", query: "LangGraph" },
    { label: "Code Interpreter", query: "Interpreter" },
  ];

  return (
    <BackgroundGrid variant="grid" className="border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Aceternity UI Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#2563eb"
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Environment Count & Security Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-medium mb-6 shadow-2xs backdrop-blur-xs animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">{publishedEnvironments.length} Verified Environments</span>
            <span className="text-blue-300">•</span>
            <span className="text-slate-600 hidden sm:inline">
              Hardware MicroVMs, Browser Fleets & Database Sandboxes
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
            Discover Environments for <span className="text-blue-600">AI Agents</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed mb-9">
            Find, launch and connect powerful execution environments that give your AI agents the space to work safely and autonomously.
          </p>

          {/* Large Marketplace Search Field */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl bg-white p-2 rounded-xl border border-slate-300 shadow-md hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-100 transition-all flex items-center gap-2"
          >
            <div className="flex items-center pl-3 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, category, runtime (Python, Chromium), or framework (LangGraph)..."
              className="flex-1 bg-transparent border-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:outline-none py-1.5"
            />
            <ShimmerButton
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold shrink-0"
            >
              <span>Search Market</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </ShimmerButton>
          </form>

          {/* Popular Search Suggestions */}
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center text-xs text-slate-500">
            <span className="font-medium text-slate-400">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => router.push(`/explore?q=${encodeURIComponent(tag.query)}`)}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer text-xs shadow-2xs font-mono"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80 w-full text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">&lt;200ms Boot</p>
                <p className="text-[11px] text-slate-500">Sub-second warm starts</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Firecracker & gVisor</p>
                <p className="text-[11px] text-slate-500">Hardware micro-isolation</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">12 Categories</p>
                <p className="text-[11px] text-slate-500">From browser to DevOps</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">SDK & MCP Ready</p>
                <p className="text-[11px] text-slate-500">Python, TS & LangGraph</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundGrid>
  );
}

