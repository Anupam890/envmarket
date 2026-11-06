"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Download,
  Bookmark,
  Play,
  Bot,
  FileCode2,
  ExternalLink,
  Globe,
  Cpu,
  HardDrive,
  Clock,
  Layers,
  Shield,
  Activity,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Environment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/aceternity/ShimmerButton";
import { ConfigCodeTabs } from "./ConfigCodeTabs";
import { AgentConnectModal } from "./AgentConnectModal";
import { ReviewsSection } from "./ReviewsSection";
import { LaunchSandboxModal } from "@/components/marketplace/LaunchSandboxModal";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface EnvironmentDetailClientProps {
  initialEnvironment: Environment;
}

export function EnvironmentDetailClient({
  initialEnvironment,
}: EnvironmentDetailClientProps) {
  const {
    allEnvironments,
    isBookmarked,
    toggleBookmark,
    recordView,
    addReview,
  } = useMarketplaceStore();

  const [launchModalOpen, setLaunchModalOpen] = React.useState(false);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [copiedConfig, setCopiedConfig] = React.useState(false);

  // Retrieve potentially updated version with custom reviews from reactive store
  const environment =
    allEnvironments.find((e) => e.slug === initialEnvironment.slug) ||
    initialEnvironment;

  const bookmarked = isBookmarked(environment.slug);

  React.useEffect(() => {
    recordView(environment.slug);
  }, [environment.slug, recordView]);

  const handleCopyFullConfig = () => {
    const snippet =
      environment.config.python ||
      environment.config.typescript ||
      environment.config.cli ||
      environment.config.docker ||
      "";
    navigator.clipboard.writeText(snippet);
    setCopiedConfig(true);
    toast.success("Default configuration copied to clipboard");
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Page link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Environments</span>
            </Link>
            <span>/</span>
            <Link
              href={`/category/${environment.category.slug}`}
              className="text-slate-500 hover:text-blue-600 transition-colors"
            >
              {environment.category.name}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">
              {environment.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => toggleBookmark(environment.slug)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                bookmarked
                  ? "bg-blue-50 border-blue-200 text-blue-600 font-semibold"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-blue-600" : ""}`} />
              <span>{bookmarked ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-sm shrink-0 border border-blue-700">
                {environment.name.charAt(0)}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {environment.name}
                  </h1>
                  {environment.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Verified Publisher
                    </span>
                  )}
                  <Badge variant="default" className="text-xs">
                    {environment.category.name}
                  </Badge>
                </div>

                <p className="text-sm text-slate-500 mt-1">
                  Published by{" "}
                  <span className="font-semibold text-slate-700">
                    {environment.provider.name}
                  </span>
                  {environment.provider.website && (
                    <a
                      href={environment.provider.website}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </p>

                {/* Popularity Stats strip */}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{environment.stats.rating.toFixed(2)}</span>
                    <span className="text-slate-400 font-normal">
                      ({environment.reviews.length} reviews)
                    </span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatCompactNumber(environment.stats.installs)} installs</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{environment.stats.activeSessions} active sessions</span>
                  </span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">
                    Updated {formatDate(environment.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons on Desktop Header */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                onClick={() => setConnectModalOpen(true)}
                className="gap-2"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>Connect to Agent</span>
              </Button>

              <ShimmerButton
                onClick={() => setLaunchModalOpen(true)}
                className="gap-2 px-5 py-2.5 font-semibold text-sm"
              >
                <Play className="w-4 h-4" />
                <span>Launch Environment</span>
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content (2 Columns: Left 8 cols, Right 4 cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {environment.fullDescription}
              </p>

              {/* Badges / Tags */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                {environment.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Capabilities */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Core Capabilities & Features</span>
                <span className="text-xs font-mono font-normal text-slate-500">
                  {environment.capabilities.length} features
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {environment.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-slate-50/60 text-xs text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Supported Runtimes & Frameworks */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Frameworks & Runtimes Compatibility
              </h2>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Supported Agent Frameworks
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {environment.supportedFrameworks.map((fw) => (
                    <Badge key={fw} variant="framework" className="text-xs py-1 px-3">
                      {fw}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Pre-configured Runtimes & Compilers
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {environment.runtimes.map((r) => (
                    <span
                      key={r}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-mono font-medium border border-blue-200"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Installation & Configuration Tabs */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Installation & Configuration
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your preferred integration method to invoke this environment.
                  </p>
                </div>
                {environment.supportsMcp && (
                  <Badge variant="verified" className="text-xs gap-1">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    MCP Protocol Compatible
                  </Badge>
                )}
              </div>

              <ConfigCodeTabs
                config={environment.config}
                supportsMcp={environment.supportsMcp}
                mcpDetails={environment.mcpDetails}
              />
            </section>

            {/* Security, Isolation & Resource Limits */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Security Architecture & Resource Limits</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="text-xs text-slate-500 font-medium">Virtualization Isolation</span>
                  <p className="text-sm font-bold text-slate-900">{environment.specs.isolationLevel}</p>
                  <p className="text-xs text-slate-500">Hardware KVM boundary, untrusted syscall filter.</p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="text-xs text-slate-500 font-medium">Network Egress Policy</span>
                  <p className="text-sm font-bold text-slate-900">{environment.specs.networkEgress}</p>
                  <p className="text-xs text-slate-500">Encrypted proxy egress with DNS enforcement.</p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="text-xs text-slate-500 font-medium">Standard CPU / RAM</span>
                  <p className="text-sm font-bold text-slate-900">
                    {environment.specs.defaultCpu} • {environment.specs.defaultMemory}
                  </p>
                  <p className="text-xs text-slate-500">Dedicated compute slice per session.</p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="text-xs text-slate-500 font-medium">Disk & Max Timeout</span>
                  <p className="text-sm font-bold text-slate-900">
                    {environment.specs.defaultDisk} • {environment.specs.maxTimeoutMinutes} mins max
                  </p>
                  <p className="text-xs text-slate-500">Zero data retention upon session termination.</p>
                </div>
              </div>

              {/* Security Badges */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                {environment.securityBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {badge}
                  </span>
                ))}
              </div>
            </section>

            {/* Version History */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Version History</span>
                <span className="text-xs font-mono text-slate-500">
                  Current: {environment.versions[0]?.version || "v1.0.0"}
                </span>
              </h2>

              <div className="divide-y divide-slate-100">
                {environment.versions.map((ver) => (
                  <div key={ver.version} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {ver.version}
                        </span>
                        {ver.isLatest && (
                          <Badge variant="success" className="text-[10px]">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formatDate(ver.releaseDate)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{ver.changelog}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews and Ratings */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Reviews & Community Feedback
              </h2>

              <ReviewsSection
                environmentSlug={environment.slug}
                reviews={environment.reviews}
                onAddReview={(newRev) => addReview(environment.slug, newRev)}
              />
            </section>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Primary Action Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 sticky top-20">
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-medium">Pricing Model</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-slate-900">
                    {environment.pricing}
                  </span>
                  {environment.isOpenSource && (
                    <Badge variant="success">Open Source</Badge>
                  )}
                </div>
                {environment.pricingDetails && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {environment.pricingDetails}
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-2.5">
                <ShimmerButton
                  onClick={() => setLaunchModalOpen(true)}
                  className="w-full py-2.5 font-semibold text-sm gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Launch Environment</span>
                </ShimmerButton>

                <Button
                  variant="outline"
                  onClick={() => setConnectModalOpen(true)}
                  className="w-full gap-2 text-slate-800"
                >
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span>Connect to Agent</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleCopyFullConfig}
                  className="w-full gap-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  {copiedConfig ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{copiedConfig ? "Config Copied!" : "Copy Configuration"}</span>
                </Button>
              </div>

              {/* Quick Specs */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Deployment</span>
                  <span className="font-semibold text-slate-800">{environment.deploymentType}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Isolation</span>
                  <span className="font-semibold text-slate-800">{environment.specs.isolationLevel}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Default CPU</span>
                  <span className="font-semibold text-slate-800">{environment.specs.defaultCpu}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Default RAM</span>
                  <span className="font-semibold text-slate-800">{environment.specs.defaultMemory}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">GPU Acceleration</span>
                  <span className="font-semibold text-slate-800">
                    {environment.specs.gpuAvailable ? "Available" : "Not Required"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">MCP Protocol</span>
                  <span className="font-semibold text-slate-800">
                    {environment.supportsMcp ? "Yes (V1.1)" : "Standard SDK"}
                  </span>
                </div>
              </div>

              {/* External Links */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {environment.docsUrl && (
                  <a
                    href={environment.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-blue-600" />
                      <span>Official Documentation</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}

                {environment.githubUrl && (
                  <a
                    href={environment.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-slate-800" />
                      <span>GitHub Repository</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Runtime Sandbox Modal */}
      <LaunchSandboxModal
        environment={environment}
        isOpen={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
      />

      {/* Agent Connect Code Generator Modal */}
      <AgentConnectModal
        environment={environment}
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
}
