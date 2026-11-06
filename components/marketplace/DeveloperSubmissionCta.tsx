"use client";

import * as React from "react";
import Link from "next/link";
import { PlusCircle, Terminal, Shield, ArrowRight, Boxes } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { ShimmerButton } from "@/components/ui/aceternity/ShimmerButton";

export function DeveloperSubmissionCta() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackgroundGrid
          variant="dots"
          className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50/70 to-white p-8 sm:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-4 border border-blue-200">
              <Boxes className="w-3.5 h-3.5" />
              <span>Publisher Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Have an environment worth sharing?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
              Publish your environment and help developers build better AI agents. Reach thousands of agentic engineers building on LangGraph, OpenAI Agents SDK, and CrewAI.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/submit">
                <ShimmerButton className="px-6 py-3 text-sm font-semibold gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Environment</span>
                </ShimmerButton>
              </Link>

              <Link
                href="/developer"
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-400 font-medium text-sm transition-colors shadow-2xs"
              >
                <span>Read Submission Docs</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-blue-100 text-xs text-slate-500">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Zero hosting lock-in</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>MCP Protocol validation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Fast 24hr verification review</span>
              </div>
            </div>
          </div>
        </BackgroundGrid>
      </div>
    </section>
  );
}

