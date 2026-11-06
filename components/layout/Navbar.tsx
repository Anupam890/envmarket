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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/aceternity/ShimmerButton";
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
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [collectionsOpen, setCollectionsOpen] = React.useState(false);
  const [developersOpen, setDevelopersOpen] = React.useState(false);

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
    setCategoriesOpen(false);
    setCollectionsOpen(false);
    setDevelopersOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-6">
          {/* 1. Left: Brand Logo & Text */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Boxes className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                    EnvMarket
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 font-bold">
                    HUB
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Desktop Navigation with Mega Menus */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/explore"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/explore"
                    ? "text-blue-600 bg-blue-50/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Explore
              </Link>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    pathname.startsWith("/category") || categoriesOpen
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      categoriesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {categoriesOpen && (
                  <div className="absolute left-0 top-full pt-1.5 w-[560px] z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-2">
                      <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                        <span>Directory Categories (12)</span>
                        <Link
                          href="/#categories"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-blue-600 font-medium hover:underline lowercase tracking-normal"
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

                      <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-600 font-medium">Looking for a specific runtime?</span>
                        <Link
                          href="/explore"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Advanced Filters
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    pathname.startsWith("/collections") || collectionsOpen
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      collectionsOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {collectionsOpen && (
                  <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                      <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                        Curated Toolkits
                      </div>
                      {COLLECTIONS.map((col) => (
                        <Link
                          key={col.id}
                          href={`/collections/${col.slug}`}
                          onClick={() => setCollectionsOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50/60 text-xs text-slate-700 hover:text-blue-600 transition-colors group"
                        >
                          <span className="font-medium truncate mr-2">{col.title}</span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {col.environmentSlugs.length} envs
                          </span>
                        </Link>
                      ))}
                      <div className="pt-1 border-t border-slate-100">
                        <Link
                          href="/collections"
                          onClick={() => setCollectionsOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-slate-50 rounded-lg"
                        >
                          <span>All Curated Collections</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Developers Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDevelopersOpen(true)}
                onMouseLeave={() => setDevelopersOpen(false)}
              >
                <button
                  onClick={() => setDevelopersOpen(!developersOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    pathname.startsWith("/developer") || pathname.startsWith("/docs") || developersOpen
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>Developers</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      developersOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {developersOpen && (
                  <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                      <Link
                        href="/submit"
                        onClick={() => setDevelopersOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Submit Environment</p>
                          <p className="text-[11px] text-slate-500">Publish your sandbox</p>
                        </div>
                      </Link>

                      <Link
                        href="/developer"
                        onClick={() => setDevelopersOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                      >
                        <Code2 className="w-4 h-4 text-slate-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Developer Portal</p>
                          <p className="text-[11px] text-slate-500">Standards & isolation</p>
                        </div>
                      </Link>

                      <Link
                        href="/docs"
                        onClick={() => setDevelopersOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-slate-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Documentation</p>
                          <p className="text-[11px] text-slate-500">MCP specs & LangGraph</p>
                        </div>
                      </Link>

                      <Link
                        href="/developer/manage"
                        onClick={() => setDevelopersOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                      >
                        <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Listing Analytics</p>
                          <p className="text-[11px] text-slate-500">Manage releases & views</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/docs"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/docs"
                    ? "text-blue-600 bg-blue-50/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Docs
              </Link>
            </nav>
          </div>

          {/* 3. Center/Right: Prominent Search Field inspired by MCPMarket */}
          <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-slate-500 text-xs transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="truncate">Search {publishedEnvironments.length}+ environments...</span>
              </div>
              <kbd className="inline-flex items-center text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white text-slate-500 rounded border border-slate-200 shrink-0 ml-1">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* 4. Right: Action Buttons (GitHub, Submit CTA, Account) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* GitHub Star Link */}
            <a
              href="https://github.com/Anupam890/envmarket"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
              title="GitHub Star"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1 rounded border border-slate-200">
                ★ 1.2k
              </span>
            </a>

            {/* Submit Environment CTA */}
            <Link href="/submit" className="hidden sm:inline-flex">
              <ShimmerButton className="text-xs h-8 px-3.5 gap-1.5 font-semibold">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit</span>
              </ShimmerButton>
            </Link>

            {/* User / Dashboard Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer text-xs font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden md:inline font-semibold">Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
            {/* Mobile search bar */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs"
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
                12 Categories
              </Link>
              <Link
                href="/collections"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                Curated Collections
              </Link>
              <Link
                href="/developer"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                Developer Hub
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
                Dashboard
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
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
