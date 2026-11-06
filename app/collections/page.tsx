import Link from "next/link";
import { FolderKanban, ArrowRight, Layers } from "lucide-react";
import { COLLECTIONS } from "@/lib/data/collections";
import { COLLECTION_ICONS } from "@/components/marketplace/CollectionsSection";
import { CardSpotlight } from "@/components/ui/aceternity/CardSpotlight";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Collections | EnvMarket",
  description:
    "Curated execution environment bundles designed for specific agentic workflows: Browser, Python, Cloud, Sandboxes, and Database.",
};

export default function CollectionsPage() {
  return (
    <div className="w-full pb-20">
      <BackgroundGrid variant="grid" className="border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Curated Toolkits</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Environment Collections
            </h1>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Tested combinations of sandboxes, browser pools, and ephemeral stores designed for complex multi-agent architectures.
            </p>
          </div>
        </div>
      </BackgroundGrid>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => {
            const icon = COLLECTION_ICONS[col.icon] || <Layers className="w-5 h-5 text-blue-600" />;
            return (
              <Link key={col.id} href={`/collections/${col.slug}`} className="block h-full group">
                <CardSpotlight className="p-6 h-full flex flex-col justify-between group-hover:border-blue-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        {col.environmentSlugs.length} Environments
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug">
                      {col.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Inspect collection</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardSpotlight>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

