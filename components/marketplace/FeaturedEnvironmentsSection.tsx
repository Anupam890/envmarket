"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { EnvironmentCard } from "./EnvironmentCard";

export function FeaturedEnvironmentsSection() {
  const { publishedEnvironments } = useMarketplaceStore();

  const featured = publishedEnvironments.filter((e) => e.featured).slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Environments
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-tier, production-hardened runtimes trusted by leading autonomous AI agent builders.
            </p>
          </div>

          <Link
            href="/explore?featured=true"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Explore all featured</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((env) => (
            <EnvironmentCard key={env.id} environment={env} />
          ))}
        </div>
      </div>
    </section>
  );
}

