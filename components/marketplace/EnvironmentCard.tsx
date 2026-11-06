"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Download,
  Terminal,
  Bookmark,
  ExternalLink,
  Play,
  ArrowRight,
  Boxes,
} from "lucide-react";
import { Environment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCompactNumber } from "@/lib/utils";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { LaunchSandboxModal } from "./LaunchSandboxModal";

interface EnvironmentCardProps {
  environment: Environment;
  showCategoryBadge?: boolean;
}

export function EnvironmentCard({
  environment,
  showCategoryBadge = true,
}: EnvironmentCardProps) {
  const { isBookmarked, toggleBookmark } = useMarketplaceStore();
  const [launchModalOpen, setLaunchModalOpen] = React.useState(false);
  const bookmarked = isBookmarked(environment.slug);

  return (
    <>
      <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 group relative">
        {/* Top Header: Logo, Name, Publisher & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link
            href={`/environments/${environment.slug}`}
            className="flex items-start gap-3 min-w-0 flex-1"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-base shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
              {environment.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors truncate">
                  {environment.name}
                </h3>
                {environment.verified && (
                  <span title="Verified Publisher">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  </span>
                )}
                {environment.recentlyAdded && (
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                by {environment.provider.name}
              </p>
            </div>
          </Link>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(environment.slug);
            }}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
              bookmarked
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600"
            }`}
            title={bookmarked ? "Saved to collection" : "Save environment"}
            aria-label="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-blue-600" : ""}`} />
          </button>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {environment.shortDescription}
        </p>

        {/* Category & Deployment Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {showCategoryBadge && (
            <Badge variant="default" className="text-[11px]">
              {environment.category.name}
            </Badge>
          )}
          <Badge variant="secondary" className="text-[11px] font-mono">
            {environment.deploymentType}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            {environment.pricing}
          </Badge>
        </div>

        {/* Supported Frameworks strip */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span className="text-[11px] text-slate-400 font-medium mr-1">
            Frameworks:
          </span>
          {environment.supportedFrameworks.slice(0, 3).map((fw) => (
            <Badge key={fw} variant="framework">
              {fw}
            </Badge>
          ))}
          {environment.supportedFrameworks.length > 3 && (
            <span className="text-[10px] text-slate-400 font-mono">
              +{environment.supportedFrameworks.length - 3}
            </span>
          )}
        </div>

        {/* Stats & Quick Actions Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 gap-2 mt-auto">
          {/* Stats */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{environment.stats.rating.toFixed(1)}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatCompactNumber(environment.stats.installs)}</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 px-2.5 gap-1 text-slate-700"
              onClick={() => setLaunchModalOpen(true)}
              title="Launch isolated sandbox session"
            >
              <Play className="w-3 h-3 text-blue-600" />
              <span className="hidden sm:inline">Launch</span>
            </Button>

            <Link href={`/environments/${environment.slug}`}>
              <Button size="sm" className="text-xs h-8 px-2.5 gap-1">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Runtime Sandbox Modal */}
      <LaunchSandboxModal
        environment={environment}
        isOpen={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
      />
    </>
  );
}

