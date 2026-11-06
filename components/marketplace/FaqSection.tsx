"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is an agent environment?",
    answer:
      "An agent environment is an isolated, reproducible execution context where an autonomous AI agent can safely execute shell commands, run code (Python, Node.js, Rust), control headless browsers (Playwright, Puppeteer), query ephemeral databases, or interact with virtual desktop GUI applications. Unlike standard API tools, an environment provides full operating system or runtime state, filesystem scratchpads, and resource isolation.",
  },
  {
    question: "How is an environment different from an MCP server?",
    answer:
      "An MCP (Model Context Protocol) server is a communication standard defined by Anthropic for exposing prompts, resources, and tool functions to an LLM. An execution environment, by contrast, is the actual underlying virtual infrastructure (a Firecracker microVM, Docker container, or cloud browser fleet) in which those tools run. Many environments on EnvMarket provide an optional MCP server interface to connect directly to Claude Code, Cursor, or MCP clients, while also offering native Python, TypeScript, and Docker interfaces.",
  },
  {
    question: "Can I use environments with LangGraph?",
    answer:
      "Yes. Every environment listed on EnvMarket specifies its supported frameworks. For LangGraph, environments provide direct integration patterns—either through standard Python/TypeScript client SDKs wrapped as `@tool` callables, or by maintaining persistent session IDs across LangGraph state checkpoint nodes.",
  },
  {
    question: "Can I use environments with OpenAI Agents SDK?",
    answer:
      "Yes. Most sandboxes and browser environments on EnvMarket offer drop-in tool functions that can be passed directly to the OpenAI Agents SDK / Swarm runner functions. For instance, code interpreters expose function schemas for code execution, while browser environments expose CDP endpoints or action functions.",
  },
  {
    question: "Are environments free?",
    answer:
      "Many environments on EnvMarket are completely free and open source (Apache 2.0 or MIT) that you can self-host using Docker or Kubernetes with zero licensing costs. Commercial cloud providers (such as Browserbase, Neon, E2B, or Modal) offer generous free tiers for prototyping, followed by usage-based per-second metering for production scale.",
  },
  {
    question: "How do I publish an environment?",
    answer:
      "Anyone can submit an environment via our Submit Environment portal. You simply define your environment name, category, container base image or API endpoint, runtime specifications (CPU, RAM, timeout), supported agent frameworks, and configuration snippets. Submissions undergo an automated configuration validation and are reviewed by our platform maintainers.",
  },
  {
    question: "How is environment security verified?",
    answer:
      "Security is verified through a multi-point inspection process: assessing kernel isolation (hardware virtualization via KVM/Firecracker or gVisor sandbox), auditing network egress policies (such as domain allowlisting or air-gapping), checking process permissions (root vs. non-root user), and evaluating disk persistence (ephemeral copy-on-write vs. uncommitted memory). Verified publishers receive the Verified Shield badge.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Clear technical answers regarding execution environments, MCP interoperability, and security isolation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen && "transform rotate-180 text-blue-600"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

