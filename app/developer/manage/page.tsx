"use client";

import * as React from "react";
import Link from "next/link";
import {
  Layers,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit3,
  BarChart3,
  Eye,
  Download,
  Star,
  Activity,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function DeveloperManagePage() {
  const { allEnvironments, customSubmissions } = useMarketplaceStore();
  const [selectedEnv, setSelectedEnv] = React.useState<string | null>(null);

  // User's managed environments: custom submitted ones + a few default sample published ones
  const managedEnvironments = React.useMemo(() => {
    const customSlugs = new Set(customSubmissions.map((c) => c.slug));
    const userSampleSlugs = new Set([
      "browserbase-session-sandbox",
      "e2b-code-interpreter",
      "steel-stealth-browser",
    ]);

    return allEnvironments.filter(
      (e) => customSlugs.has(e.slug) || userSampleSlugs.has(e.slug)
    );
  }, [allEnvironments, customSubmissions]);

  const activeListing =
    managedEnvironments.find((e) => e.slug === selectedEnv) ||
    managedEnvironments[0];

  const handlePublishNewVersion = () => {
    toast.success("New release version v1.2.0 deployed to staging registry!");
  };

  return (
    <div className="w-full pb-20 bg-slate-50/40 min-h-screen">
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/developer" className="hover:text-slate-900 transition-colors">
                  Developer Portal
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold">Listing Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Manage Environment Listings
              </h1>
            </div>

            <Link href="/submit">
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>Submit New Environment</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Listings List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Environments ({managedEnvironments.length})
            </h2>

            <div className="space-y-2">
              {managedEnvironments.map((env) => {
                const isSelected = activeListing?.slug === env.slug;
                return (
                  <div
                    key={env.slug}
                    onClick={() => setSelectedEnv(env.slug)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-blue-600 shadow-sm ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-semibold text-slate-900 text-sm truncate">
                        {env.name}
                      </span>
                      {env.status === "published" ? (
                        <Badge variant="success" className="text-[10px]">
                          Published
                        </Badge>
                      ) : env.status === "pending" ? (
                        <Badge variant="warning" className="text-[10px]">
                          Pending Review
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          Draft
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {env.shortDescription}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{env.deploymentType}</span>
                      <span>{formatCompactNumber(env.stats.installs)} installs</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Listing Details, Analytics & Versions (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeListing ? (
              <>
                {/* Status Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          {activeListing.name}
                        </h2>
                        {activeListing.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        slug: {activeListing.slug}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/environments/${activeListing.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Public Page</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={handlePublishNewVersion}
                        className="gap-1.5 text-xs"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Deploy Version</span>
                      </Button>
                    </div>
                  </div>

                  {/* Analytics Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        Installs
                      </span>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">
                        {formatCompactNumber(activeListing.stats.installs)}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        Rating
                      </span>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">
                        {activeListing.stats.rating.toFixed(1)} / 5.0
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        Live Sessions
                      </span>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">
                        {activeListing.stats.activeSessions}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        Reviews
                      </span>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">
                        {activeListing.reviews.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Versions Table */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      Published Release Versions
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeListing.versions.length} versions
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeListing.versions.map((ver) => (
                      <div
                        key={ver.version}
                        className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-slate-900">
                              {ver.version}
                            </span>
                            {ver.isLatest && (
                              <Badge variant="success" className="text-[10px]">
                                Active Latest
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{ver.changelog}</p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono shrink-0">
                          {formatDate(ver.releaseDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center rounded-xl border border-slate-200 bg-white">
                Select an environment from the left list to view management analytics.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

