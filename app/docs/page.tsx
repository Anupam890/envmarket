import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  Code2,
  Lock,
  Globe,
  Boxes,
} from "lucide-react";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { CardSpotlight } from "@/components/ui/aceternity/CardSpotlight";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | EnvMarket",
  description:
    "Integration guides, runtime architecture, MCP integration standards, and security specifications for AI agent execution environments.",
};

export default function DocsPage() {
  return (
    <div className="w-full pb-20">
      <BackgroundGrid variant="grid" className="border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Platform Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              AI Agent Execution Environments
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Complete reference manual for connecting autonomous agents, orchestrating isolated microVM sandboxes, and establishing secure egress policies.
            </p>
          </div>
        </div>
      </BackgroundGrid>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Docs Table of Contents (3 cols) */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4 sticky top-20 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Documentation Index
              </h3>
              <nav className="space-y-1 text-slate-600">
                <a href="#quickstart" className="block py-1.5 hover:text-blue-600 font-medium">
                  1. Quickstart Guide
                </a>
                <a href="#mcp-vs-env" className="block py-1.5 hover:text-blue-600 font-medium">
                  2. Environments vs. MCP Servers
                </a>
                <a href="#architecture" className="block py-1.5 hover:text-blue-600 font-medium">
                  3. Decoupled Sandbox Architecture
                </a>
                <a href="#security" className="block py-1.5 hover:text-blue-600 font-medium">
                  4. Security & Egress Firewalls
                </a>
                <a href="#langgraph" className="block py-1.5 hover:text-blue-600 font-medium">
                  5. LangGraph Integration
                </a>
                <a href="#openai" className="block py-1.5 hover:text-blue-600 font-medium">
                  6. OpenAI Agents SDK
                </a>
              </nav>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/submit"
                  className="flex items-center justify-between font-semibold text-blue-600 hover:underline"
                >
                  <span>Submit an Environment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Docs Main Content (9 cols) */}
          <main className="lg:col-span-9 space-y-12 text-sm text-slate-700 leading-relaxed">
            {/* 1. Quickstart */}
            <section id="quickstart" className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase">
                <Terminal className="w-4 h-4" />
                <span>Chapter 1</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Quickstart Guide
              </h2>
              <p>
                To allow your agent to execute code or control a headless browser, install the EnvMarket client library or configure your agent with ephemeral session credentials:
              </p>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                <pre>
                  <code>{`# 1. Install official Python SDK
pip install envmarket playwright

# 2. Spawn an isolated execution session
from envmarket import Sandbox

with Sandbox.create("e2b-code-interpreter") as sb:
    # Agent executes untrusted code safely
    res = sb.exec("python3 -c 'print(sum(range(100)))'")
    print("Agent Result:", res.stdout)`}</code>
                </pre>
              </div>
            </section>

            {/* 2. Environments vs MCP */}
            <section id="mcp-vs-env" className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase">
                <Layers className="w-4 h-4" />
                <span>Chapter 2</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                How is an Environment different from an MCP Server?
              </h2>
              <p>
                Developers often confuse the <strong>protocol layer</strong> with the <strong>execution layer</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <span className="font-bold text-slate-900 text-sm">MCP (Model Context Protocol)</span>
                  <p className="text-xs text-slate-600">
                    A standardized JSON-RPC communication schema defining how LLMs discover tool names, argument schemas, and prompt templates.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
                  <span className="font-bold text-blue-900 text-sm">Execution Environment</span>
                  <p className="text-xs text-blue-800">
                    The actual virtualization container (Firecracker microVM, Linux namespace, or cloud browser) with dedicated CPU, RAM, disk, and syscall controls.
                  </p>
                </div>
              </div>

              <p className="pt-2">
                Many environments on EnvMarket package an optional MCP server endpoint, allowing you to plug them into Anthropic Claude Code or Cursor with zero extra glue code.
              </p>
            </section>

            {/* 3. Decoupled Architecture */}
            <section id="architecture" className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase">
                <Boxes className="w-4 h-4" />
                <span>Chapter 3</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Decoupled Runtime Architecture
              </h2>
              <p>
                EnvMarket strictly decouples the <strong>marketplace discovery catalog</strong> from the <strong>runtime execution infrastructure</strong>:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong>No Arbitrary Docker Exec on Web Servers:</strong> User-submitted Docker images or code snippets are never executed on the web application tier.
                </li>
                <li>
                  <strong>Hardware MicroVM Sandbox Cluster:</strong> Runtime execution is delegated to an isolated runtime pool with hardware KVM barriers and automated lifecycle reapers.
                </li>
                <li>
                  <strong>Ephemeral Tokens:</strong> Agent sessions use short-lived JWT tokens valid only for the lifespan of that specific sub-task.
                </li>
                <li>
                  <strong>Syscall Auditing:</strong> All kernel interactions are metered and audited for anomalous egress behaviors.
                </li>
              </ul>
            </section>

            {/* 4. Security */}
            <section id="security" className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase">
                <Shield className="w-4 h-4" />
                <span>Chapter 4</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Security & Network Isolation Requirements
              </h2>
              <p>
                When submitting an environment to EnvMarket, publishers must document:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900">Egress Filtering:</span>
                  <span className="text-slate-600 ml-1">
                    Enforce DNS and HTTP proxy filters to prevent untrusted agents from performing DDoS attacks or accessing private metadata endpoints (e.g., 169.254.169.254).
                  </span>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900">Non-Root User Contexts:</span>
                  <span className="text-slate-600 ml-1">
                    Containers must map agent processes to unprivileged UID 1000 users unless explicitly sandboxed inside a nested microVM.
                  </span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

