"use client";

import * as React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, Flame, Download, Clock, Star } from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { EnvironmentCard } from "./EnvironmentCard";

type SortOption = "popular" | "installed" | "updated" | "rating";

export function PopularSortSection() {
  const { publishedEnvironments } = useMarketplaceStore();
  const [activeSort, setActiveSort] = React.useState<SortOption>("popular");

  const sortedEnvironments = React.useMemo(() => {
    const list = [...publishedEnvironments];
    switch (activeSort) {
      case "popular":
        return list.sort((a, b) => (b.stats?.stars || 0) - (a.stats?.stars || 0)).slice(0, 6);
      case "installed":
        return list.sort((a, b) => (b.stats?.installs || 0) - (a.stats?.installs || 0)).slice(0, 6);
      case "updated":
        return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6);
      case "rating":
        return list.sort((a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0)).slice(0, 6);
      default:
        return list.slice(0, 6);
    }
  }, [publishedEnvironments, activeSort]);

  const tabs = [
    { id: "popular", label: "Most Popular", icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "installed", label: "Most Installed", icon: <Download className="w-3.5 h-3.5" /> },
    { id: "updated", label: "Recently Updated", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "rating", label: "Highest Rated", icon: <Star className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <section className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Ecosystem Metrics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular Environments
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Ranked by verified developer installations, active sessions, and community ratings.
            </p>
          </div>

          {/* Interactive Sorting Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id as SortOption)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeSort === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6 Cards Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEnvironments.map((env) => (
            <EnvironmentCard key={env.id} environment={env} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white px-5 py-2.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-blue-50/50 transition-colors"
          >
            <span>Explore all {publishedEnvironments.length} environments with full filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

