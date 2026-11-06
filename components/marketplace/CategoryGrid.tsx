"use client";

import * as React from "react";
import Link from "next/link";
import {
  Globe,
  Terminal,
  Code2,
  Cloud,
  Monitor,
  Database,
  Cpu,
  CheckCircle2,
  Smartphone,
  LineChart,
  GitBranch,
  Layers,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { CardSpotlight } from "@/components/ui/aceternity/CardSpotlight";
import { Badge } from "@/components/ui/badge";

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
};

export function CategoryGrid() {
  return (
    <section id="categories" className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <span>Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Execution environments categorized by runtime topology, hardware capabilities, and agent workflow requirements.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all environments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 12 Categories Grid with Aceternity CardSpotlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const icon = CATEGORY_ICONS[cat.icon] || <Layers className="w-5 h-5" />;
            return (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="block h-full group">
                <CardSpotlight className="p-5 h-full flex flex-col justify-between group-hover:border-blue-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {icon}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        {cat.environmentCount} envs
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 font-medium">
                    <span className="truncate max-w-[170px] text-[11px] font-mono text-slate-400">
                      {cat.highlightedTags[0]} • {cat.highlightedTags[1]}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardSpotlight>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

