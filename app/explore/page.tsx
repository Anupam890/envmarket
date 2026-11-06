import { Suspense } from "react";
import { SearchAndFilterView } from "@/components/marketplace/SearchAndFilterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Environments | EnvMarket",
  description:
    "Filter and search execution environments for AI agents by category, runtime, deployment type, pricing, and framework compatibility.",
};

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 text-sm">
          Loading marketplace environments...
        </div>
      }
    >
      <SearchAndFilterView />
    </Suspense>
  );
}

