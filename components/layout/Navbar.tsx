"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Search,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
  User,
  LayoutDashboard,
  Bookmark,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Terminal,
  Globe,
  Database,
  Code2,
  Cpu,
  Shield,
  Layers,
  Flame,
  Star,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FolderKanban,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchModal } from "@/components/marketplace/SearchModal";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { CATEGORIES } from "@/lib/data/categories";
import { COLLECTIONS } from "@/lib/data/collections";
import { GithubIcon } from "@/components/ui/icons";

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  // Dropdown states
  const [environmentsOpen, setEnvironmentsOpen] = React.useState(false);
  const [skillsOpen, setSkillsOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);

  const { bookmarks, pendingEnvironments, publishedEnvironments } = useMarketplaceStore();

  React.useEffect(() => {
    const handleCustomSearch = () => setSearchOpen(true);
    window.addEventListener("open-search-modal", handleCustomSearch);
    return () => window.removeEventListener("open-search-modal", handleCustomSearch);
  }, []);

  // Close menus on path change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setEnvironmentsOpen(false);
    setSkillsOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Header Shell matching MCPMarket */}
      <header
        data-appearance="hero"
        className="sticky top-0 z-50 w-full transition-[background-color,border-color,padding] duration-300 ease-out border-b border-transparent bg-transparent px-2 pb-2 pt-1.5 sm:px-3 sm:pb-3 sm:pt-2"
      >
        <div
          data-testid="navigation-shell"
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xs transition-all duration-300"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between h-16 gap-3 lg:gap-6">
            {/* 1. Left: Brand Logo & MCPMarket Text Format */}
            <div className="flex items-center gap-7 shrink-0">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                  <Boxes className="w-5 h-5" />
                </div>
                {/* Exact text format matching MCPMarket: First word semi-bold, second word italic medium */}
                <div className="flex items-baseline text-2xl tracking-tight">
                  <span className="font-sans font-semibold text-slate-900">Env</span>
                  <span className="font-sans font-medium italic text-slate-500">Market</span>
                </div>
              </Link>

              {/* 2. Desktop Navigation with Radix Dropdown format */}
              <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
                {/* Dropdown 1: Execution Environments (like MCP Servers on mcpmarket) */}
                <div
                  className="relative"
                  onMouseEnter={() => setEnvironmentsOpen(true)}
                  onMouseLeave={() => setEnvironmentsOpen(false)}
                >
                  <button
                    onClick={() => setEnvironmentsOpen(!environmentsOpen)}
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-lg px-3.5 py-2 text-sm font-sans font-normal transition-colors cursor-pointer ${
                      pathname.startsWith("/environments") || pathname === "/explore" || environmentsOpen
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span>Environments</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                        environmentsOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {environmentsOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-[480px] z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-4">
                        {/* Col 1: Discovery Links */}
                        <div className="space-y-2">
                          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                            Discovery
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            <li>
                              <Link
                                href="/explore"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 font-medium transition-colors"
                              >
                                All Environments
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/explore?sort=popular"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Top Environments Today
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/explore?sort=installs"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Top 100 Agent Sandboxes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/category/browser-environments"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Headless Browser Fleets
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/category/database-environments"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Ephemeral Database Branches
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Col 2: Architecture & Knowledge */}
                        <div className="space-y-2">
                          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                            Knowledge Base
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            <li>
                              <Link
                                href="/docs#quickstart"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                What is an Agent Environment?
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/docs#mcp-vs-env"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Environments vs MCP Servers
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/docs#architecture"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Firecracker MicroVM Isolation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/docs#security"
                                onClick={() => setEnvironmentsOpen(false)}
                                className="block py-1 hover:text-blue-600 transition-colors"
                              >
                                Network Egress Whitelists
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown 2: Agent Skills & Toolkits (like Agent Skills on mcpmarket) */}
                <div
                  className="relative"
                  onMouseEnter={() => setSkillsOpen(true)}
                  onMouseLeave={() => setSkillsOpen(false)}
                >
                  <button
                    onClick={() => setSkillsOpen(!skillsOpen)}
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-lg px-3.5 py-2 text-sm font-sans font-normal transition-colors cursor-pointer ${
                      pathname.startsWith("/collections") || skillsOpen
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span>Agent Toolkits</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                        skillsOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {skillsOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-[420px] z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                          Curated Agent Skills & Toolkits
                        </div>
                        {COLLECTIONS.map((col) => (
                          <Link
                            key={col.id}
                            href={`/collections/${col.slug}`}
                            onClick={() => setSkillsOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50/60 text-xs text-slate-700 hover:text-blue-600 transition-colors"
                          >
                            <span className="font-medium truncate mr-2">{col.title}</span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              {col.environmentSlugs.length} envs
                            </span>
                          </Link>
                        ))}
                        <div className="pt-2 border-t border-slate-100">
                          <Link
                            href="/collections"
                            onClick={() => setSkillsOpen(false)}
                            className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-blue-600 hover:underline"
                          >
                            <span>Browse All Toolkits</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown 3: Categories */}
                <div
                  className="relative"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-lg px-3.5 py-2 text-sm font-sans font-normal transition-colors cursor-pointer ${
                      pathname.startsWith("/category") || categoriesOpen
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span>Categories</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                        categoriesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {categoriesOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-[560px] z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-2">
                        <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono font-semibold uppercase tracking-wider">
                          <span>12 Specialized Directory Categories</span>
                          <Link
                            href="/#categories"
                            onClick={() => setCategoriesOpen(false)}
                            className="text-blue-600 font-medium hover:underline lowercase tracking-normal font-sans"
                          >
                            view all →
                          </Link>
                        </div>

                        {CATEGORIES.slice(0, 8).map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Layers className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {cat.environmentCount} environments
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/docs"
                  className="inline-flex h-10 items-center justify-center rounded-lg px-3.5 py-2 text-sm font-sans font-normal text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 transition-colors"
                >
                  Docs
                </Link>
              </nav>
            </div>

            {/* 3. Center/Right: Prominent MCPMarket Search Trigger (⌘K) */}
            <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-slate-500 text-xs transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <span className="truncate">Search {publishedEnvironments.length}+ environments...</span>
                </div>
                <kbd className="inline-flex items-center text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white text-slate-500 rounded-md border border-slate-200 shrink-0 ml-1">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* 4. Right: Action Buttons (Exact MCPMarket Style) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* GitHub Link */}
              <a
                href="https://github.com/Anupam890/envmarket"
                target="_blank"
                rel="noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 font-sans text-xs font-normal border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                title="GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              {/* Action 1: "Submit Environment" (Exact MCPMarket 'Sell Skills' border pill button style) */}
              <Link
                href="/submit"
                className="hidden items-center gap-1.5 rounded-xl border px-3.5 py-2 font-sans text-xs sm:text-sm font-normal transition-all duration-200 md:inline-flex border-slate-200 bg-white/80 backdrop-blur-xs text-slate-600 shadow-2xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Submit Environment</span>
              </Link>

              {/* Action 2: "Power Your Agents" (Exact MCPMarket Texture Button) */}
              <Link
                href="/dashboard"
                className="group/texture-button inline-flex items-stretch border !p-px font-sans font-normal transition duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 border-black/10 bg-gradient-to-b from-black/70 to-black rounded-xl w-auto shrink-0 shadow-xs"
              >
                <span className="flex h-full w-full items-center justify-center gap-2 whitespace-nowrap font-sans font-normal tracking-[-0.01em] transition-[background-image,color] duration-200 ease-out bg-gradient-to-b from-neutral-800 to-black text-white/90 hover:from-stone-800 hover:to-neutral-800/70 rounded-[10px] px-3.5 py-2 text-xs sm:text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden lg:inline font-medium">Power Your Agents</span>
                  <span className="lg:hidden font-medium">Connect</span>
                </span>
              </Link>

              {/* User Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer text-xs"
                  aria-label="User Menu"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">Developer Account</p>
                      <p className="text-[11px] text-slate-500 truncate">anupam@envmarket.dev</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50/60 hover:text-blue-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>User Dashboard</span>
                      {bookmarks.length > 0 && (
                        <span className="ml-auto bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {bookmarks.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50/60 hover:text-blue-700 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>Saved Environments</span>
                    </Link>

                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50/60 hover:text-blue-700 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Admin Governance</span>
                      {pendingEnvironments.length > 0 && (
                        <span className="ml-auto bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {pendingEnvironments.length}
                        </span>
                      )}
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <Link
                      href="/developer/manage"
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <span>Developer Listings</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center rounded-lg border border-transparent font-sans text-sm text-slate-600 hover:bg-slate-100 h-9 w-9"
                type="button"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-100 bg-white px-2 pt-3 pb-5 space-y-3">
              {/* Search in mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs"
              >
                <Search className="w-4 h-4" />
                <span>Search environments, categories, runtimes...</span>
              </button>

              <nav className="flex flex-col space-y-1">
                <Link
                  href="/explore"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Explore All Environments
                </Link>
                <Link
                  href="/#categories"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Categories
                </Link>
                <Link
                  href="/collections"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Agent Toolkits
                </Link>
                <Link
                  href="/developer"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Developer Portal
                </Link>
                <Link
                  href="/docs"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Documentation
                </Link>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  User Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  Admin Governance
                </Link>
              </nav>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link href="/submit" className="w-full">
                  <Button className="w-full gap-1.5">
                    <PlusCircle className="w-4 h-4" />
                    <span>Submit Environment</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Typeahead Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
