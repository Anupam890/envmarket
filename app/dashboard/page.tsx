"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Bookmark,
  FolderKanban,
  Clock,
  Layers,
  Settings,
  Activity,
  PlusCircle,
  Play,
  Key,
  ShieldCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { COLLECTIONS } from "@/lib/data/collections";
import { EnvironmentCard } from "@/components/marketplace/EnvironmentCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type DashboardTab = "saved" | "collections" | "recent" | "submissions" | "sessions" | "settings";

export default function UserDashboardPage() {
  const {
    allEnvironments,
    bookmarks,
    recentSlugs,
    customSubmissions,
    toggleBookmark,
  } = useMarketplaceStore();

  const [activeTab, setActiveTab] = React.useState<DashboardTab>("saved");

  // Bookmarked environments
  const savedEnvironments = React.useMemo(() => {
    return allEnvironments.filter((e) => bookmarks.includes(e.slug));
  }, [allEnvironments, bookmarks]);

  // Recently viewed environments
  const recentlyViewed = React.useMemo(() => {
    return recentSlugs
      .map((slug) => allEnvironments.find((e) => e.slug === slug))
      .filter(Boolean);
  }, [allEnvironments, recentSlugs]);

  const copyApiKey = () => {
    navigator.clipboard.writeText("envm_live_94f8b27c0e184a2d99");
    toast.success("API Key copied to clipboard");
  };

  return (
    <div className="w-full pb-20 bg-slate-50/40 min-h-screen">
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-1 border border-blue-200">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Developer Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                User Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/explore">
                <Button variant="outline" size="sm" className="text-xs">
                  Browse Environments
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="sm" className="text-xs gap-1.5">
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Environment</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-1">
              <button
                onClick={() => setActiveTab("saved")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "saved"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Saved Environments</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === "saved" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {savedEnvironments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("collections")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "collections"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  <span>Favorite Collections</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === "collections" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {COLLECTIONS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("recent")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "recent"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Recently Viewed</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === "recent" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {recentlyViewed.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("submissions")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "submissions"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>My Submissions</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === "submissions" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {customSubmissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("sessions")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "sessions"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Runtime Execution History</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Content (9 cols) */}
          <main className="lg:col-span-9">
            {/* Tab: Saved Environments */}
            {activeTab === "saved" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Saved Environments</h2>
                    <p className="text-xs text-slate-500">Bookmarked runtimes for your agent stacks</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {savedEnvironments.length} saved
                  </span>
                </div>

                {savedEnvironments.length === 0 ? (
                  <div className="p-12 text-center rounded-xl border border-slate-200 bg-white space-y-3">
                    <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-sm font-bold text-slate-800">No saved environments yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Click the bookmark icon on any environment card or detail page to save it here for quick access.
                    </p>
                    <div className="pt-2">
                      <Link href="/explore">
                        <Button size="sm">Browse Marketplace</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savedEnvironments.map((env) => (
                      <EnvironmentCard key={env.id} environment={env} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Collections */}
            {activeTab === "collections" && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-lg font-bold text-slate-900">Curated Collections</h2>
                  <p className="text-xs text-slate-500">Toolkits you can reference in multi-agent configurations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COLLECTIONS.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.slug}`}
                      className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
                            {col.title}
                          </h3>
                          <Badge variant="default" className="text-xs font-mono">
                            {col.environmentSlugs.length} Envs
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {col.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                        <span>View Toolset</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Recently Viewed */}
            {activeTab === "recent" && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-lg font-bold text-slate-900">Recently Viewed</h2>
                  <p className="text-xs text-slate-500">Environments you inspected in this session</p>
                </div>

                {recentlyViewed.length === 0 ? (
                  <div className="p-12 text-center rounded-xl border border-slate-200 bg-white">
                    <p className="text-xs text-slate-500">No recently viewed environments.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recentlyViewed.map((env) => (
                      env && <EnvironmentCard key={env.id} environment={env} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: My Submissions */}
            {activeTab === "submissions" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">My Submissions</h2>
                    <p className="text-xs text-slate-500">Environments published under your developer profile</p>
                  </div>
                  <Link href="/submit">
                    <Button size="sm" className="gap-1.5 text-xs">
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>New Submission</span>
                    </Button>
                  </Link>
                </div>

                {customSubmissions.length === 0 ? (
                  <div className="p-12 text-center rounded-xl border border-slate-200 bg-white space-y-2">
                    <p className="text-sm font-semibold text-slate-800">
                      You haven&apos;t submitted any environments yet
                    </p>
                    <p className="text-xs text-slate-500">
                      Share your custom Docker container or microVM with the AI developer community.
                    </p>
                    <div className="pt-2">
                      <Link href="/submit">
                        <Button size="sm">Publish an Environment</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customSubmissions.map((env) => (
                      <div
                        key={env.id}
                        className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">
                            {env.name}
                          </h3>
                          <Badge variant="warning" className="text-[10px]">
                            Pending Verification
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {env.shortDescription}
                        </p>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-400 text-[11px]">
                            {env.deploymentType}
                          </span>
                          <Link href={`/environments/${env.slug}`} className="text-blue-600 font-medium hover:underline">
                            View Preview →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Runtime Sessions / Execution History */}
            {activeTab === "sessions" && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-lg font-bold text-slate-900">Runtime Execution History</h2>
                  <p className="text-xs text-slate-500">
                    Decoupled runtime telemetry, isolated sandbox lifecycle sessions, and audit metrics
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="text-[10px]">
                          COMPLETED
                        </Badge>
                        <span className="font-mono text-xs font-bold text-slate-900">
                          sess_8f921d7b
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600 font-medium">Browserbase Headless Cloud</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Started: 12 mins ago • Duration: 4m 12s • Memory peak: 1.2 GB • Egress: 42 KB
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Audit Trail
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="text-[10px]">
                          COMPLETED
                        </Badge>
                        <span className="font-mono text-xs font-bold text-slate-900">
                          sess_3c44a980
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600 font-medium">E2B Code Interpreter</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Started: 45 mins ago • Duration: 1m 08s • Memory peak: 240 MB • Egress: 0 KB (Air-gapped)
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Audit Trail
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Account Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900">Developer Account Settings</h2>
                  <p className="text-xs text-slate-500">API keys, security tokens, and organization profile</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Personal API Access Token
                  </label>
                  <div className="flex items-center gap-2 max-w-md">
                    <input
                      type="password"
                      value="envm_live_94f8b27c0e184a2d99"
                      readOnly
                      className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                    />
                    <Button variant="outline" size="sm" onClick={copyApiKey}>
                      Copy
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Use this token to authenticate agent session requests via Python and TypeScript SDKs.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Security Credentials
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">Two-Factor Authentication (2FA)</p>
                      <p className="text-slate-500">Hardware security key or authenticator app</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

