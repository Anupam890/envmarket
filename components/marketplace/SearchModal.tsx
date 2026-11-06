"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, ShieldCheck, Sparkles, X } from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { publishedEnvironments } = useMarketplaceStore();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or caller
          const event = new CustomEvent("open-search-modal");
          window.dispatchEvent(event);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return publishedEnvironments.slice(0, 6);

    return publishedEnvironments.filter((env) => {
      return (
        env.name.toLowerCase().includes(q) ||
        env.shortDescription.toLowerCase().includes(q) ||
        env.category.name.toLowerCase().includes(q) ||
        env.tags.some((t) => t.toLowerCase().includes(q)) ||
        env.supportedFrameworks.some((f) => f.toLowerCase().includes(q)) ||
        env.runtimes.some((r) => r.toLowerCase().includes(q)) ||
        env.capabilities.some((c) => c.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [query, publishedEnvironments]);

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/environments/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search environments, frameworks, runtimes, capabilities..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "Enter" && filtered.length > 0) {
                handleSelect(filtered[0].slug);
              }
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">
            Esc
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              <p className="font-medium text-slate-800">No environments found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for &quot;playwright&quot;, &quot;microvm&quot;, &quot;postgres&quot;, or &quot;langgraph&quot;
              </p>
            </div>
          ) : (
            filtered.map((env) => (
              <div
                key={env.id}
                onClick={() => handleSelect(env.slug)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50/60 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200">
                    {env.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {env.name}
                      </span>
                      {env.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                      <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
                        {env.category.name}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">
                      {env.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    {env.deploymentType}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Search covers 12 categories, frameworks, and runtime tags</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
            Press ↵ to open first result
          </span>
        </div>
      </div>
    </div>
  );
}

