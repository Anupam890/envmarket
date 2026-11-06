"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Layers,
  Users,
  Eye,
  Sliders,
  Filter,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { CATEGORIES } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const {
    allEnvironments,
    publishedEnvironments,
    pendingEnvironments,
    updateEnvironmentStatus,
  } = useMarketplaceStore();

  const [filterStatus, setFilterStatus] = React.useState<"all" | "pending" | "published">("all");

  const totalListings = allEnvironments.length;
  const verifiedCount = allEnvironments.filter((e) => e.verified).length;
  const verifiedPercentage = Math.round((verifiedCount / totalListings) * 100);

  const displayedEnvironments = React.useMemo(() => {
    if (filterStatus === "pending") return pendingEnvironments;
    if (filterStatus === "published") return publishedEnvironments;
    return allEnvironments;
  }, [allEnvironments, pendingEnvironments, publishedEnvironments, filterStatus]);

  const handleApprove = (slug: string, name: string) => {
    updateEnvironmentStatus(slug, "published");
    toast.success(`"${name}" has been approved and published to the marketplace!`);
  };

  const handleReject = (slug: string, name: string) => {
    updateEnvironmentStatus(slug, "rejected");
    toast.error(`"${name}" has been rejected.`);
  };

  return (
    <div className="w-full pb-20 bg-slate-50/40 min-h-screen">
      {/* Admin Top Banner */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-1 border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Administration & Governance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Platform Admin Console
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/explore">
                <Button variant="outline" size="sm" className="text-xs">
                  View Public Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Marketplace Health Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Environment Listings
            </span>
            <p className="text-2xl font-extrabold text-slate-900">{totalListings}</p>
            <p className="text-xs text-slate-400">Across 12 marketplace categories</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Submissions
            </span>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-extrabold text-amber-600">
                {pendingEnvironments.length}
              </p>
              {pendingEnvironments.length > 0 && (
                <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500" />
              )}
            </div>
            <p className="text-xs text-slate-400">Awaiting security screening</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Published Live
            </span>
            <p className="text-2xl font-extrabold text-emerald-600">
              {publishedEnvironments.length}
            </p>
            <p className="text-xs text-slate-400">Serving active agent workloads</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verification Ratio
            </span>
            <p className="text-2xl font-extrabold text-blue-600">{verifiedPercentage}%</p>
            <p className="text-xs text-slate-400">
              {verifiedCount} verified publisher environments
            </p>
          </div>
        </div>

        {/* Pending Submissions Queue Priority Card */}
        {pendingEnvironments.length > 0 && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-bold text-amber-950">
                  Pending Submissions Awaiting Moderation ({pendingEnvironments.length})
                </h2>
              </div>
              <span className="text-xs font-medium text-amber-800">
                Review isolation level and network egress
              </span>
            </div>

            <div className="space-y-3">
              {pendingEnvironments.map((env) => (
                <div
                  key={env.id}
                  className="p-4 rounded-lg border border-amber-200 bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm truncate">
                        {env.name}
                      </h3>
                      <Badge variant="warning" className="text-[10px]">
                        Pending Review
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {env.category.name}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {env.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                      <span>Isolation: {env.specs.isolationLevel}</span>
                      <span>•</span>
                      <span>Egress: {env.specs.networkEgress}</span>
                      <span>•</span>
                      <span>Provider: {env.provider.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/environments/${env.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Inspect Spec
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      onClick={() => handleApprove(env.slug, env.name)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(env.slug, env.name)}
                      className="text-rose-600 hover:bg-rose-50 text-xs gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Listings Management Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Environment Registry Directory
              </h2>
              <p className="text-xs text-slate-500">
                Full catalog moderation, verification badge status, and deployment metadata
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterStatus === "all" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                }`}
              >
                All ({allEnvironments.length})
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterStatus === "pending" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                }`}
              >
                Pending ({pendingEnvironments.length})
              </button>
              <button
                onClick={() => setFilterStatus("published")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterStatus === "published" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                }`}
              >
                Published ({publishedEnvironments.length})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">Environment</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Isolation & Egress</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Installs</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedEnvironments.map((env) => (
                  <tr key={env.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/environments/${env.slug}`}
                          className="hover:text-blue-600 font-semibold"
                        >
                          {env.name}
                        </Link>
                        {env.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">
                        by {env.provider.name}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-[10px]">
                        {env.category.name}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      <div>{env.specs.isolationLevel}</div>
                      <div className="text-slate-400 text-[10px]">{env.specs.networkEgress}</div>
                    </td>

                    <td className="py-3 px-4">
                      {env.status === "published" ? (
                        <Badge variant="success" className="text-[10px]">
                          Published
                        </Badge>
                      ) : env.status === "pending" ? (
                        <Badge variant="warning" className="text-[10px]">
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          Rejected
                        </Badge>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px]">
                      {formatCompactNumber(env.stats.installs)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/environments/${env.slug}`}>
                          <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
                            Inspect
                          </Button>
                        </Link>

                        {env.status === "pending" ? (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(env.slug, env.name)}
                            className="h-7 px-2 text-[11px] bg-emerald-600 text-white"
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              updateEnvironmentStatus(
                                env.slug,
                                env.status === "published" ? "rejected" : "published"
                              );
                              toast.info(`Updated status for "${env.name}"`);
                            }}
                            className="h-7 px-2 text-[11px] text-slate-500"
                          >
                            {env.status === "published" ? "Unpublish" : "Restore"}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

