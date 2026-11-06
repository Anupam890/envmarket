"use client";

import * as React from "react";
import Link from "next/link";
import {
  FolderKanban,
  ArrowRight,
  Globe,
  Code2,
  Terminal,
  ShieldCheck,
  Cloud,
  Database,
  Layers,
} from "lucide-react";
import { COLLECTIONS } from "@/lib/data/collections";
import { CardSpotlight } from "@/components/ui/aceternity/CardSpotlight";

export const COLLECTION_ICONS: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-blue-600" />,
  Code2: <Code2 className="w-5 h-5 text-indigo-600" />,
  Terminal: <Terminal className="w-5 h-5 text-cyan-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  Cloud: <Cloud className="w-5 h-5 text-blue-700" />,
  Database: <Database className="w-5 h-5 text-teal-600" />,
};

export function CollectionsSection() {
  return (
    <section className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Curated Toolkits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Environment Collections
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked clusters of execution environments tailored for specific agent architectures.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Curated Collections with CardSpotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => {
            const icon = COLLECTION_ICONS[col.icon] || <Layers className="w-5 h-5 text-blue-600" />;
            return (
              <Link key={col.id} href={`/collections/${col.slug}`} className="block h-full group">
                <CardSpotlight className="p-6 h-full flex flex-col justify-between group-hover:border-blue-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        {col.environmentSlugs.length} Envs
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug">
                      {col.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Explore collection</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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

