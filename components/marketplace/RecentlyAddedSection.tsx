"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, ArrowRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function RecentlyAddedSection() {
  const { publishedEnvironments } = useMarketplaceStore();

  const recent = React.useMemo(() => {
    return [...publishedEnvironments]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 4);
  }, [publishedEnvironments]);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Releases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Recently Added Environments
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Newly published runtime containers, browser nodes, and testbeds added to the registry.
            </p>
          </div>

          <Link
            href="/explore?sort=newest"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all new additions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* List of 4 recent items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recent.map((env) => (
            <Link
              key={env.id}
              href={`/environments/${env.slug}`}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="success" className="text-[10px]">
                      New Release
                    </Badge>
                    <Badge variant="default" className="text-[10px]">
                      {env.category.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{formatDate(env.publishedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate">
                    {env.name}
                  </h3>
                  {env.verified && <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>

                <p className="text-xs text-slate-500 mt-0.5">
                  by <span className="font-medium text-slate-700">{env.provider.name}</span>
                </p>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {env.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">
                  {env.deploymentType} • {env.pricing}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

