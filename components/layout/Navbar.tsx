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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/marketplace/SearchModal";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const { bookmarks, pendingEnvironments } = useMarketplaceStore();

  React.useEffect(() => {
    const handleCustomSearch = () => setSearchOpen(true);
    window.addEventListener("open-search-modal", handleCustomSearch);
    return () => window.removeEventListener("open-search-modal", handleCustomSearch);
  }, []);

  // Close menus on path change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Categories", href: "/#categories" },
    { label: "Collections", href: "/collections" },
    { label: "Developers", href: "/developer" },
    { label: "Documentation", href: "/docs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Text */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Boxes className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-lg tracking-tight">
                    EnvMarket
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                    Beta
                  </span>
                </div>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50/70"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs sm:text-sm transition-colors cursor-pointer"
              title="Search marketplace (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search environments...</span>
              <kbd className="hidden lg:inline-flex items-center text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white text-slate-500 rounded border border-slate-200">
                Ctrl+K
              </kbd>
            </button>

            {/* Submit Environment CTA */}
            <Link href="/submit" className="hidden sm:inline-flex">
              <Button size="sm" className="gap-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>Submit Environment</span>
              </Button>
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
                <span className="hidden md:inline">Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Developer Account</p>
                    <p className="text-[11px] text-slate-500 truncate">agent-developer@envmarket.dev</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50/60 hover:text-blue-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>User Dashboard</span>
                    {bookmarks.length > 0 && (
                      <span className="ml-auto bg-blue-100 text-blue-700 text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                        {bookmarks.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/dashboard#saved"
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
                    <span>Admin Console</span>
                    {pendingEnvironments.length > 0 && (
                      <span className="ml-auto bg-amber-100 text-amber-800 text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                        {pendingEnvironments.length} pending
                      </span>
                    )}
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <Link
                    href="/developer"
                    className="flex items-center justify-between px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <span>Developer Hub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                Admin Console
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

