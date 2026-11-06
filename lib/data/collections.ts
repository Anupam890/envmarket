import { EnvironmentCollection } from "../types";

export const COLLECTIONS: EnvironmentCollection[] = [
  {
    id: "col-1",
    slug: "best-browser-environments-for-ai-agents",
    title: "Best Browser Environments for AI Agents",
    description: "Battle-tested cloud browser sandboxes with built-in CAPTCHA solving, anti-bot stealth, and live streaming.",
    icon: "Globe",
    coverAccent: "from-blue-600 to-indigo-700",
    environmentSlugs: ["browserbase-session-sandbox", "steel-stealth-browser", "playwright-cloud-fleet", "stagehand-actuator-box"],
  },
  {
    id: "col-2",
    slug: "coding-environments-for-autonomous-agents",
    title: "Coding Environments for Autonomous Agents",
    description: "Full-featured code execution runners with language servers, git integration, and hot package managers.",
    icon: "Code2",
    coverAccent: "from-blue-700 to-slate-900",
    environmentSlugs: ["e2b-code-interpreter", "daytona-autonomous-workspace", "codesandbox-microvm", "modal-python-agent-box"],
  },
  {
    id: "col-3",
    slug: "best-python-execution-environments",
    title: "Best Python Execution Environments",
    description: "Secure, high-speed Python environments optimized for data processing, LLM tool execution, and script running.",
    icon: "Terminal",
    coverAccent: "from-blue-600 to-cyan-700",
    environmentSlugs: ["e2b-code-interpreter", "modal-python-agent-box", "jupyter-agent-kernel-vm", "polars-vector-runtime"],
  },
  {
    id: "col-4",
    slug: "secure-sandboxes",
    title: "Secure Sandboxes",
    description: "Hardened microVM and gVisor isolation with strict egress proxying, ephemeral disks, and audit logging.",
    icon: "ShieldCheck",
    coverAccent: "from-emerald-600 to-blue-700",
    environmentSlugs: ["firecracker-hardened-jail", "e2b-code-interpreter", "fly-machines-agent-pod", "wasm-edge-isolated-sandbox"],
  },
  {
    id: "col-5",
    slug: "cloud-environments-for-agentic-workflows",
    title: "Cloud Environments for Agentic Workflows",
    description: "Scalable serverless runners designed to execute concurrent multi-agent swarms with minimal latency.",
    icon: "Cloud",
    coverAccent: "from-blue-800 to-indigo-950",
    environmentSlugs: ["fly-machines-agent-pod", "cloudflare-worker-agent-sandbox", "modal-python-agent-box", "dind-swarm-runner"],
  },
  {
    id: "col-6",
    slug: "database-environments-for-ai-agents",
    title: "Database Environments for AI Agents",
    description: "Instant branchable relational and vector databases with schema rollback, sql sanity checks, and mock seeding.",
    icon: "Database",
    coverAccent: "from-blue-600 to-teal-800",
    environmentSlugs: ["neon-branching-postgres", "duckdb-vector-box", "supabase-ephemeral-testbed", "sqlite-isolated-agent-store"],
  },
];

