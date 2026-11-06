"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  X,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  Layers,
} from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { EnvironmentCard } from "./EnvironmentCard";
import { CATEGORIES } from "@/lib/data/categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeploymentType, PricingModel, AgentFramework } from "@/lib/types";

export function SearchAndFilterView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { publishedEnvironments } = useMarketplaceStore();

  // URL query params initialization
  const initialQ = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialPricing = searchParams.get("pricing") || "";
  const initialFeatured = searchParams.get("featured") === "true";
  const initialSort = searchParams.get("sort") || "popular";

  const [query, setQuery] = React.useState(initialQ);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [selectedDeployment, setSelectedDeployment] = React.useState<string>("");
  const [selectedPricing, setSelectedPricing] = React.useState<string>(initialPricing);
  const [selectedFramework, setSelectedFramework] = React.useState<string>("");
  const [selectedRuntime, setSelectedRuntime] = React.useState<string>("");
  const [onlyVerified, setOnlyVerified] = React.useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = React.useState(false);
  const [onlyMcp, setOnlyMcp] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Sync state if URL query params change
  React.useEffect(() => {
    if (initialQ) setQuery(initialQ);
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialPricing) setSelectedPricing(initialPricing);
  }, [initialQ, initialCategory, initialPricing]);

  // Unique runtimes from data
  const allRuntimes = React.useMemo(() => {
    const set = new Set<string>();
    publishedEnvironments.forEach((e) => {
      e.runtimes.forEach((r) => set.add(r.split(" ")[0]));
    });
    return Array.from(set).slice(0, 8);
  }, [publishedEnvironments]);

  const frameworks: AgentFramework[] = [
    "LangGraph",
    "OpenAI Agents SDK",
    "CrewAI",
    "AutoGen",
    "LlamaIndex",
    "Claude Code / Anthropic",
    "Smolagents",
  ];

  const deploymentTypes: DeploymentType[] = [
    "Managed Cloud",
    "Self-Hosted Docker",
    "MicroVM Sandbox",
    "Serverless Sandbox",
    "Local Daemon",
    "WASM Enclave",
  ];

  const pricingModels: PricingModel[] = [
    "Free",
    "Open Source",
    "Freemium",
    "Usage-based",
  ];

  // Filtering Logic
  const filtered = React.useMemo(() => {
    return publishedEnvironments.filter((env) => {
      // Search term
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = env.name.toLowerCase().includes(q);
        const matchesDesc = env.shortDescription.toLowerCase().includes(q);
        const matchesTags = env.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = env.category.name.toLowerCase().includes(q);
        const matchesFramework = env.supportedFrameworks.some((f) => f.toLowerCase().includes(q));
        const matchesRuntime = env.runtimes.some((r) => r.toLowerCase().includes(q));
        const matchesCapability = env.capabilities.some((c) => c.toLowerCase().includes(q));

        if (!matchesName && !matchesDesc && !matchesTags && !matchesCategory && !matchesFramework && !matchesRuntime && !matchesCapability) {
          return false;
        }
      }

      // Category
      if (selectedCategory && env.category.slug !== selectedCategory && env.category.name !== selectedCategory) {
        return false;
      }

      // Deployment
      if (selectedDeployment && env.deploymentType !== selectedDeployment) {
        return false;
      }

      // Pricing
      if (selectedPricing && env.pricing !== selectedPricing) {
        return false;
      }

      // Framework
      if (selectedFramework && !env.supportedFrameworks.includes(selectedFramework as AgentFramework)) {
        return false;
      }

      // Runtime
      if (selectedRuntime && !env.runtimes.some((r) => r.toLowerCase().includes(selectedRuntime.toLowerCase()))) {
        return false;
      }

      // Verified only
      if (onlyVerified && !env.verified) {
        return false;
      }

      // Open source only
      if (onlyOpenSource && !env.isOpenSource) {
        return false;
      }

      // MCP supported only
      if (onlyMcp && !env.supportsMcp) {
        return false;
      }

      return true;
    });
  }, [
    publishedEnvironments,
    query,
    selectedCategory,
    selectedDeployment,
    selectedPricing,
    selectedFramework,
    selectedRuntime,
    onlyVerified,
    onlyOpenSource,
    onlyMcp,
  ]);

  // Sorting Logic
  const sorted = React.useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case "popular":
        return list.sort((a, b) => (b.stats?.stars || 0) - (a.stats?.stars || 0));
      case "installs":
        return list.sort((a, b) => (b.stats?.installs || 0) - (a.stats?.installs || 0));
      case "rating":
        return list.sort((a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0));
      case "newest":
        return list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filtered, sortBy]);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedDeployment ? 1 : 0) +
    (selectedPricing ? 1 : 0) +
    (selectedFramework ? 1 : 0) +
    (selectedRuntime ? 1 : 0) +
    (onlyVerified ? 1 : 0) +
    (onlyOpenSource ? 1 : 0) +
    (onlyMcp ? 1 : 0);

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedDeployment("");
    setSelectedPricing("");
    setSelectedFramework("");
    setSelectedRuntime("");
    setOnlyVerified(false);
    setOnlyOpenSource(false);
    setOnlyMcp(false);
    setSortBy("popular");
    router.replace("/explore");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header & Search Bar */}
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore AI Agent Environments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover {publishedEnvironments.length} sandboxes, microVMs, and browser fleets tailored for autonomous agents.
          </p>
        </div>

        {/* Global Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search environments, frameworks, runtimes, capabilities..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden gap-1.5 h-9"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs h-9">
              <span className="text-xs text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="installs">Most Installed</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Recently Added</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs text-slate-400 font-medium">Active Filters:</span>
            {selectedCategory && (
              <Badge variant="default" className="text-xs gap-1">
                <span>Cat: {selectedCategory}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
              </Badge>
            )}
            {selectedFramework && (
              <Badge variant="framework" className="text-xs gap-1">
                <span>{selectedFramework}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFramework("")} />
              </Badge>
            )}
            {selectedPricing && (
              <Badge variant="secondary" className="text-xs gap-1">
                <span>Pricing: {selectedPricing}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPricing("")} />
              </Badge>
            )}
            {selectedDeployment && (
              <Badge variant="secondary" className="text-xs gap-1">
                <span>{selectedDeployment}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDeployment("")} />
              </Badge>
            )}
            {selectedRuntime && (
              <Badge variant="outline" className="text-xs gap-1">
                <span>Runtime: {selectedRuntime}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRuntime("")} />
              </Badge>
            )}
            {onlyVerified && (
              <Badge variant="verified" className="text-xs gap-1">
                <span>Verified Only</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyVerified(false)} />
              </Badge>
            )}
            {onlyOpenSource && (
              <Badge variant="success" className="text-xs gap-1">
                <span>Open Source</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyOpenSource(false)} />
              </Badge>
            )}
            {onlyMcp && (
              <Badge variant="default" className="text-xs gap-1">
                <span>MCP Compatible</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyMcp(false)} />
              </Badge>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:underline font-semibold ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters (3 cols) + Result Cards (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFiltersOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Categories ({CATEGORIES.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Framework Compatibility */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Agent Framework
              </label>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Frameworks</option>
                {frameworks.map((fw) => (
                  <option key={fw} value={fw}>
                    {fw}
                  </option>
                ))}
              </select>
            </div>

            {/* Deployment Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Deployment Type
              </label>
              <select
                value={selectedDeployment}
                onChange={(e) => setSelectedDeployment(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Deployments</option>
                {deploymentTypes.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Model */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Pricing
              </label>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Pricing Models</option>
                {pricingModels.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Runtime Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Runtime
              </label>
              <select
                value={selectedRuntime}
                onChange={(e) => setSelectedRuntime(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Runtimes</option>
                {allRuntimes.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles (Verified, Open Source, MCP) */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 border-slate-300"
                />
                <span>Verified Publishers Only</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOpenSource}
                  onChange={(e) => setOnlyOpenSource(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 border-slate-300"
                />
                <span>Open Source Licenses</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyMcp}
                  onChange={(e) => setOnlyMcp(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 border-slate-300"
                />
                <span>Supports MCP Protocol</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results Grid (9 cols) */}
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Showing {sorted.length} {sorted.length === 1 ? "environment" : "environments"}
            </span>
          </div>

          {sorted.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No matching environments found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any environments matching your current filter criteria. Try adjusting or clearing your filters.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Reset All Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((env) => (
                <EnvironmentCard key={env.id} environment={env} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

