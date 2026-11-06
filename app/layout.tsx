import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnvMarket | The Marketplace for AI Agent Execution Environments",
  description:
    "Discover, publish, manage and launch execution environments for autonomous AI agents. Sandboxes, microVMs, browser fleets, and database branches for LangGraph, OpenAI Agents SDK, and CrewAI.",
  keywords: [
    "AI agent environments",
    "agent sandbox",
    "microVM",
    "browserbase",
    "e2b",
    "playwright cloud",
    "LangGraph environments",
    "MCP servers",
    "execution environments",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        <Suspense fallback={<header className="h-16 w-full bg-white border-b border-slate-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
