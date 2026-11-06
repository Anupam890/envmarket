"use client";

import * as React from "react";
import Link from "next/link";
import { Boxes, Shield, Terminal, BookOpen, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Boxes className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                EnvMarket
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The marketplace for AI agent execution environments. Find, launch and connect verified sandboxes, microVMs, and browser fleets for autonomous agents.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-slate-500 font-mono">
                Decoupled Catalog Architecture v1.0
              </span>
            </div>
          </div>

          {/* Column 1: Marketplace */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Marketplace
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  Explore All
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  All 12 Categories
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/explore?featured=true" className="hover:text-white transition-colors">
                  Featured Runtimes
                </Link>
              </li>
              <li>
                <Link href="/explore?pricing=Open+Source" className="hover:text-white transition-colors">
                  Open Source Sandboxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Developers
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/submit" className="hover:text-white transition-colors">
                  Submit Environment
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-white transition-colors">
                  Developer Portal
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs#mcp" className="hover:text-white transition-colors">
                  MCP Protocol Guidelines
                </Link>
              </li>
              <li>
                <Link href="/docs#security" className="hover:text-white transition-colors">
                  Security & Isolation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="/docs#faq" className="hover:text-white transition-colors">
                  Security FAQ
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EnvMarket. Modern developer infrastructure for AI agents.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Isolated Sandboxing</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agent Native</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

