import { Environment } from "../types";

export const ENVIRONMENTS: Environment[] = [
  {
    id: "env-1",
    slug: "browserbase-session-sandbox",
    name: "Browserbase Headless Cloud",
    shortDescription: "Ultra-fast headless Chromium sessions with residential proxy networks, CAPTCHA bypass, and stealth CDP streaming.",
    fullDescription: `Browserbase is a developer platform designed to run headless browser sessions in the cloud for autonomous web agents. Every session runs in an isolated ephemeral VM with automated fingerprint rotation, residential IP proxies, and automatic CAPTCHA solving. Agents can connect via standard Chrome DevTools Protocol (CDP), Playwright, or Puppeteer.

Features include live session debugger URLs, full video replay recordings, DOM snapshot extraction, and integrated network request inspection. Perfect for web research agents, data harvesting, web extraction, and autonomous web actions.`,
    provider: {
      name: "Browserbase Inc.",
      website: "https://browserbase.com",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Browser Environments",
      slug: "browser-environments",
    },
    tags: ["Chromium", "Playwright", "Stealth", "Puppeteer", "Anti-Bot", "CDP", "Residential Proxy"],
    supportedFrameworks: ["LangGraph", "OpenAI Agents SDK", "CrewAI", "AutoGen", "Claude Code / Anthropic", "LlamaIndex"],
    runtimes: ["Chromium 124", "Node.js 20", "Python 3.11"],
    deploymentType: "Managed Cloud",
    pricing: "Usage-based",
    pricingDetails: "$0.02 per active browser minute, 100 free monthly hours included.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-03-15",
    updatedAt: "2026-10-28",
    stats: {
      installs: 48920,
      stars: 3840,
      rating: 4.9,
      reviewCount: 312,
      activeSessions: 1420,
    },
    capabilities: [
      "Residential & Datacenter Proxy Routing",
      "Automated CAPTCHA & Cloudflare Turnstile Bypass",
      "Live WebRTC & CDP WebSocket Streaming",
      "Full Video Recording & DOM Snapshot Archive",
      "Multi-tab & Download Manager Support",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "10 GB Ephemeral SSD",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `envmarket run browserbase-session-sandbox --api-key $BROWSERBASE_API_KEY --project-id default`,
      docker: `docker run -d -p 9222:9222 -e BROWSERBASE_API_KEY=$BROWSERBASE_API_KEY browserbase/headless-agent:latest`,
      api: `curl -X POST https://api.browserbase.com/v1/sessions \\
  -H "x-bb-api-key: $BROWSERBASE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"projectId": "default", "proxies": true, "keepAlive": false}'`,
      python: `from browserbase import Browserbase
from playwright.sync_api import sync_playwright

bb = Browserbase(api_key="bb_live_...")
session = bb.sessions.create(project_id="default")

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp(session.connect_url)
    page = browser.new_page()
    page.goto("https://news.ycombinator.com")
    print(page.title())
    browser.close()`,
      typescript: `import { Browserbase } from "@browserbasehq/sdk";
import { chromium } from "playwright-core";

const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
const session = await bb.sessions.create({ projectId: "default" });

const browser = await chromium.connectOverCDP(session.connectUrl);
const page = await browser.newPage();
await page.goto("https://news.ycombinator.com");
console.log(await page.title());
await browser.close();`,
      mcp: `{\n  "mcpServers": {\n    "browserbase": {\n      "command": "npx",\n      "args": ["-y", "@browserbasehq/mcp-server"],\n      "env": {\n        "BROWSERBASE_API_KEY": "YOUR_API_KEY"\n      }\n    }\n  }\n}`,
    },
    versions: [
      { version: "v2.4.1", releaseDate: "2026-10-28", changelog: "Added stealth audio mock and improved Cloudflare v2 turnstile bypass.", isLatest: true },
      { version: "v2.3.0", releaseDate: "2026-08-14", changelog: "Introduced instant session resume and WebRTC video low-latency streaming." },
      { version: "v2.0.0", releaseDate: "2026-04-10", changelog: "Migrated infrastructure to dedicated Firecracker microVM tier." },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Devin K. (Autonomous Agent Lead)",
        rating: 5,
        date: "2026-10-15",
        comment: "Flawless CDP reliability. Our LangGraph research agents scrape thousands of research papers daily with zero Cloudflare blocks.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
      {
        id: "rev-2",
        author: "Marcus T.",
        rating: 5,
        date: "2026-09-02",
        comment: "The session recording feature makes debugging agent hallucinated navigation dead simple.",
        frameworkUsed: "CrewAI",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/browserbase/browserbase",
    docsUrl: "https://docs.browserbase.com",
    dockerImage: "browserbase/headless-agent:latest",
    supportsMcp: true,
    mcpDetails: "Full Model Context Protocol server exposing navigate, click, screenshot, evaluate, and extract_dom tools.",
    securityBadges: ["SOC2 Type II", "gVisor + Firecracker", "Encrypted WebRTC", "No Persistent Disk"],
    isOpenSource: false,
    status: "published",
  },
  {
    id: "env-2",
    slug: "e2b-code-interpreter",
    name: "E2B Code Interpreter Sandbox",
    shortDescription: "Ultra-fast Linux microVM sandboxes built specifically for executing AI agent code and shell commands safely in ~150ms.",
    fullDescription: `E2B provides lightning-fast cloud execution sandboxes for AI agents. Powered by custom lightweight Linux microVMs, each sandbox boots in less than 200 milliseconds and provides a complete, isolated environment with Python, Node.js, Bash, and package management.

Agents can install arbitrary pip or npm dependencies, run long-running calculations, read and write files, output charts and data visualisations, and interact via an intuitive SDK. Supports bidirectional streaming for console stdout/stderr and file system change events.`,
    provider: {
      name: "E2B.dev",
      website: "https://e2b.dev",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Terminal Environments",
      slug: "terminal-environments",
    },
    tags: ["Code Interpreter", "Linux MicroVM", "Python", "Bash", "Fast Boot", "LangGraph", "Sandboxed"],
    supportedFrameworks: ["LangGraph", "OpenAI Agents SDK", "CrewAI", "AutoGen", "Smolagents", "LlamaIndex"],
    runtimes: ["Linux Alpine/Debian", "Python 3.11", "Node.js 20", "Bash 5.2"],
    deploymentType: "MicroVM Sandbox",
    pricing: "Freemium",
    pricingDetails: "Generous free tier (up to 1 hour sandbox runtime), pay-per-vCPU-hour above quota.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-02-10",
    updatedAt: "2026-11-01",
    stats: {
      installs: 92400,
      stars: 6200,
      rating: 4.95,
      reviewCount: 540,
      activeSessions: 3890,
    },
    capabilities: [
      "Sub-200ms MicroVM Startup",
      "Dynamic pip & npm package installations",
      "Chart, image, and tabular artifact streaming",
      "Bidirectional filesystem sync via SDK",
      "Custom system packages via pre-baked templates",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "5 GB Ephemeral Root",
      maxTimeoutMinutes: 120,
      gpuAvailable: false,
      networkEgress: "Restricted (Domain Whitelist)",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `e2b sandbox create --template python3-interpreter`,
      docker: `docker run -it --rm --security-opt seccomp=unconfined e2b/code-interpreter:latest`,
      api: `curl -X POST https://api.e2b.dev/sandboxes \\
  -H "X-API-KEY: $E2B_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"template": "python3-interpreter"}'`,
      python: `from e2b_code_interpreter import Sandbox

with Sandbox() as sandbox:
    execution = sandbox.run_code("""
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title("Agent Generated Wave")
plt.savefig("chart.png")
print("Chart generated successfully!")
""")
    print(execution.logs.stdout)
    chart = sandbox.files.read("chart.png")`,
      typescript: `import { Sandbox } from "@e2b/code-interpreter";

const sandbox = await Sandbox.create();
const execution = await sandbox.runCode(\`
console.log("Hello from inside isolated sandbox!");
console.log("Memory limit:", process.memoryUsage().heapTotal);
\`);
console.log(execution.logs.stdout.join("\\n"));
await sandbox.close();`,
      mcp: `{\n  "mcpServers": {\n    "e2b-sandbox": {\n      "command": "npx",\n      "args": ["-y", "@e2b/mcp-server"],\n      "env": {\n        "E2B_API_KEY": "YOUR_API_KEY"\n      }\n    }\n  }\n}`,
    },
    versions: [
      { version: "v1.0.4", releaseDate: "2026-11-01", changelog: "Added native WASM support and improved websocket heartbeat stability.", isLatest: true },
      { version: "v1.0.0", releaseDate: "2026-07-22", changelog: "General availability release with Firecracker v1.7 core." },
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Sarah Lin (Staff Engineer at FinAgent)",
        rating: 5,
        date: "2026-10-20",
        comment: "Boot time is basically instant. Our agents execute thousands of mathematical regressions and financial models in complete isolation.",
        frameworkUsed: "OpenAI Agents SDK",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/e2b-dev/e2b",
    docsUrl: "https://e2b.dev/docs",
    dockerImage: "e2b/code-interpreter:latest",
    supportsMcp: true,
    mcpDetails: "Provides run_code, read_file, write_file, and run_command tools directly conforming to MCP v1.1.",
    securityBadges: ["Hardened MicroVM", "No Shared Memory", "Network Egress Firewall", "EAL4+ Tested"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-3",
    slug: "steel-stealth-browser",
    name: "Steel Stealth Browser Engine",
    shortDescription: "Open-source, self-hostable stealth browser infrastructure engineered specifically for autonomous AI agents.",
    fullDescription: `Steel is an open-source headless browser framework optimized for AI agents. Designed from the ground up to prevent bot detection and bypass CAPTCHAs, Steel provides fingerprint evasion, TLS client hello spoofing, natural user action simulation, and low-latency session mirroring.

Compatible with Playwright, Puppeteer, Selenium, and CDP. Can be self-hosted via a single Docker command or used as a managed cluster.`,
    provider: {
      name: "Steel OSS",
      website: "https://steel.dev",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Browser Environments",
      slug: "browser-environments",
    },
    tags: ["Browser", "Stealth", "Open Source", "Self-Hosted", "Playwright", "CDP"],
    supportedFrameworks: ["LangGraph", "CrewAI", "Smolagents", "Claude Code / Anthropic"],
    runtimes: ["Chromium 126", "Node.js 22", "Python 3.12"],
    deploymentType: "Self-Hosted Docker",
    pricing: "Open Source",
    pricingDetails: "100% Free and open source under Apache 2.0 license.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-04-18",
    updatedAt: "2026-10-12",
    stats: {
      installs: 27500,
      stars: 4800,
      rating: 4.8,
      reviewCount: 189,
      activeSessions: 890,
    },
    capabilities: [
      "Custom Chromium Build with Anti-Detection Patches",
      "TLS Fingerprint Randomization (JA3/JA4 spoofing)",
      "Live VNC & WebSocket Session Viewer",
      "Automatic Cookie & Session Persistence",
      "Built-in Proxy Pool Load Balancer",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "8 GB SSD",
      maxTimeoutMinutes: 90,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `docker run -d -p 3000:3000 -p 9222:9222 steeldev/steel-browser:latest`,
      docker: `docker-compose up -d steel-browser`,
      api: `curl -X POST http://localhost:3000/v1/sessions \\
  -H "Content-Type: application/json" \\
  -d '{"stealth": true, "proxyUrl": "http://user:pass@proxy:8080"}'`,
      python: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp("ws://localhost:3000/devtools/browser/...")
    page = browser.new_page()
    page.goto("https://bot.sannysoft.com")
    print("Bot detection test passed!")`,
      typescript: `import { chromium } from "playwright";

const browser = await chromium.connectOverCDP("ws://localhost:3000/devtools/browser/...");
const page = await browser.newPage();
await page.goto("https://bot.sannysoft.com");
console.log("Stealth session active.");`,
    },
    versions: [
      { version: "v1.2.0", releaseDate: "2026-10-12", changelog: "Added JA4 TLS profile rotation and memory leak fixes.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Alex P.",
        rating: 5,
        date: "2026-10-01",
        comment: "Finally an open source browser sandbox that runs in my own Kubernetes cluster without getting blocked on Cloudflare.",
        frameworkUsed: "CrewAI",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/steel-dev/steel-browser",
    docsUrl: "https://docs.steel.dev",
    dockerImage: "steeldev/steel-browser:latest",
    supportsMcp: true,
    mcpDetails: "Steel provides a local MCP connector for browsing and scraping commands.",
    securityBadges: ["Apache 2.0", "Self-Hostable", "No External Telemetry"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-4",
    slug: "daytona-autonomous-workspace",
    name: "Daytona Workspace Orchestrator",
    shortDescription: "Standardized development environments for coding agents with native git, LSP servers, and terminal multiplexing.",
    fullDescription: `Daytona is an open-source development environment manager that automates the provisioning of reproducible workspaces for autonomous software development agents. Agents receive a fully-featured Linux development environment equipped with pre-installed language runtimes, Language Server Protocol (LSP) daemons, and Git credentials.

Includes native branch isolation, zero-trust network access, and programmatic execution APIs. Ideal for coding agents (SWE-bench agents, PR creators, refactoring bots).`,
    provider: {
      name: "Daytona.io",
      website: "https://daytona.io",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Coding Environments",
      slug: "coding-environments",
    },
    tags: ["Dev Environment", "LSP", "Git", "SWE-bench", "Workspace", "Docker", "Coding"],
    supportedFrameworks: ["LangGraph", "AutoGen", "Claude Code / Anthropic", "Smolagents"],
    runtimes: ["Linux Ubuntu 24.04", "Node 20", "Python 3.12", "Go 1.22", "Rust 1.78"],
    deploymentType: "Self-Hosted Docker",
    pricing: "Open Source",
    pricingDetails: "Open source core under Apache 2.0. Optional cloud enterprise tier.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-01-20",
    updatedAt: "2026-10-25",
    stats: {
      installs: 36800,
      stars: 8900,
      rating: 4.92,
      reviewCount: 420,
      activeSessions: 1100,
    },
    capabilities: [
      "Automated Git clone, checkout, and commit signing",
      "Running LSP servers (Pyright, TSServer, gopls, rust-analyzer)",
      "Multi-port dynamic forwarding & test runner daemon",
      "Snapshot & restore for agent checkpointing",
    ],
    specs: {
      defaultCpu: "4 vCPU",
      defaultMemory: "8 GB RAM",
      defaultDisk: "25 GB NVMe",
      maxTimeoutMinutes: 240,
      gpuAvailable: false,
      networkEgress: "Configurable",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `daytona create --repo https://github.com/org/repo --agent-mode`,
      docker: `docker run -d --privileged -p 3986:3986 daytonaio/workspace-server:latest`,
      api: `curl -X POST http://localhost:3986/api/workspaces \\
  -H "Authorization: Bearer $DAYTONA_TOKEN" \\
  -d '{"repository": "https://github.com/my-org/my-project"}'`,
      python: `from daytona_sdk import Daytona

daytona = Daytona()
workspace = daytona.create(repo_url="https://github.com/example/sample-app")
response = workspace.process.exec("npm test")
print(response.result)`,
      typescript: `import { Daytona } from "@daytonaio/sdk";

const client = new Daytona();
const workspace = await client.create({ repoUrl: "https://github.com/example/sample-app" });
const result = await workspace.process.exec("npm test");
console.log(result.result);`,
    },
    versions: [
      { version: "v0.42.0", releaseDate: "2026-10-25", changelog: "Added SWE-bench harness benchmark mode.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Harrison C.",
        rating: 5,
        date: "2026-10-18",
        comment: "Daytona gives our PR review and bugfix agents a real IDE-like workspace with working typecheckers and compilers.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/daytonaio/daytona",
    docsUrl: "https://docs.daytona.io",
    dockerImage: "daytonaio/workspace-server:latest",
    supportsMcp: false,
    securityBadges: ["Apache 2.0", "Granular RBAC", "Encrypted Volume"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-5",
    slug: "neon-branching-postgres",
    name: "Neon Ephemeral Postgres Branch",
    shortDescription: "Serverless Postgres with copy-on-write database branching in under 1 second. Safely let agents migrate and mutate schemas.",
    fullDescription: `Neon provides instantaneous, serverless PostgreSQL environments with instant branch creation. When an AI agent needs to perform destructive SQL queries, run database migrations, test complex schema redesigns, or seed synthetic datasets, it can spawn an isolated branch in ~800ms.

If the agent makes a mistake, the branch can simply be discarded or reset to the root checkpoint. Features native pgvector support for AI embeddings and strict connection pooling.`,
    provider: {
      name: "Neon Inc.",
      website: "https://neon.tech",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Database Environments",
      slug: "database-environments",
    },
    tags: ["Postgres", "pgvector", "Database Branching", "Serverless", "SQL Agent", "Copy-on-write"],
    supportedFrameworks: ["LangGraph", "OpenAI Agents SDK", "CrewAI", "LlamaIndex", "Semantic Kernel"],
    runtimes: ["PostgreSQL 16", "pgvector 0.7", "PostGIS"],
    deploymentType: "Managed Cloud",
    pricing: "Freemium",
    pricingDetails: "Free tier with up to 10 active branches; pay-per-compute second beyond.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-03-01",
    updatedAt: "2026-10-30",
    stats: {
      installs: 41200,
      stars: 5300,
      rating: 4.88,
      reviewCount: 310,
      activeSessions: 2200,
    },
    capabilities: [
      "Sub-second Postgres copy-on-write branching",
      "Instant rollback and time-travel query points",
      "Preloaded pgvector for embedding search testing",
      "Read-only vs Read-Write connection credentials",
      "Query safety guards and timeout enforcement",
    ],
    specs: {
      defaultCpu: "0.25 - 4 vCPU (Auto-scaling)",
      defaultMemory: "1 - 16 GB RAM",
      defaultDisk: "Unlimited S3-backed Storage",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Air-gapped",
      isolationLevel: "Baremetal Virtualization",
    },
    config: {
      cli: `neon branches create --project-id my-proj --name agent-session-123`,
      api: `curl -X POST https://console.neon.tech/api/v2/projects/$PROJECT_ID/branches \\
  -H "Authorization: Bearer $NEON_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"branch": {"name": "agent-scratchpad"}}'`,
      python: `from neon_api import NeonAPI
import psycopg2

neon = NeonAPI(api_key="neon_...")
branch = neon.create_branch(project_id="pj-1234", name="agent-eval-01")
conn_string = branch.connection_uri

conn = psycopg2.connect(conn_string)
cur = conn.cursor()
cur.execute("CREATE TABLE agent_test (id serial primary key, notes text);")
conn.commit()`,
      typescript: `import { createClient } from "@neondatabase/api-client";
import { Pool } from "pg";

const client = createClient({ apiKey: process.env.NEON_API_KEY });
const branch = await client.createProjectBranch("pj-1234", { branch: { name: "agent-eval-01" } });
const pool = new Pool({ connectionString: branch.data.connection_uris[0].connection_uri });
await pool.query("SELECT * FROM pg_stat_activity");`,
      mcp: `{\n  "mcpServers": {\n    "neon-postgres": {\n      "command": "npx",\n      "args": ["-y", "@neondatabase/mcp-server-neon"],\n      "env": {\n        "NEON_API_KEY": "YOUR_API_KEY"\n      }\n    }\n  }\n}`,
    },
    versions: [
      { version: "v2.8.0", releaseDate: "2026-10-30", changelog: "Added instant schema diff generator for agent PR reviews.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Rachel W. (DBA & AI Architect)",
        rating: 5,
        date: "2026-10-22",
        comment: "We give our Text-to-SQL agents full write permissions on their own Neon branches. Zero danger to production, and testing is 100x faster.",
        frameworkUsed: "OpenAI Agents SDK",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/neondatabase/neon",
    docsUrl: "https://neon.tech/docs",
    supportsMcp: true,
    mcpDetails: "Exposes create_branch, execute_sql, explain_query, and delete_branch tools directly.",
    securityBadges: ["SOC2 Type II", "TLS 1.3 Strict", "Zero Shared Buffers"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-6",
    slug: "osworld-desktop-agent",
    name: "OSWorld GUI Desktop Sandbox",
    shortDescription: "Interactive Linux/XFCE desktop VM with real-time VNC display, mouse/keyboard simulation, and computer-use APIs.",
    fullDescription: `OSWorld Desktop Sandbox is a full-featured desktop virtual machine designed for multimodal Computer-Use AI agents (Claude 3.5 Sonnet Computer Use, OpenAI OS agents, UI-TARS).

Features include high-framerate remote framebuffer streaming (noVNC), automated cursor position calibration, clipboard synchronization, virtual display resolutions up to 4K, and pre-installed productivity applications (LibreOffice, Chrome, VS Code, GIMP).`,
    provider: {
      name: "OSWorld Benchmark",
      website: "https://os-world.github.io",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Desktop Environments",
      slug: "desktop-environments",
    },
    tags: ["Computer Use", "GUI Agent", "VNC", "Desktop", "X11", "OSWorld", "Multimodal"],
    supportedFrameworks: ["Claude Code / Anthropic", "OpenAI Agents SDK", "LangGraph"],
    runtimes: ["Ubuntu 22.04 LTS Desktop", "XFCE 4", "X11 Display Server", "Python 3.10"],
    deploymentType: "Self-Hosted Docker",
    pricing: "Free",
    pricingDetails: "Open source benchmark environment.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-05-10",
    updatedAt: "2026-10-15",
    stats: {
      installs: 19800,
      stars: 3400,
      rating: 4.75,
      reviewCount: 142,
      activeSessions: 610,
    },
    capabilities: [
      "Virtual display resolution 1024x768 up to 3840x2160",
      "Synthetic mouse clicks, drag & drop, and key chords",
      "Real-time visual stream via WebRTC / noVNC",
      "Preloaded suite of office, coding, and web applications",
      "Full OS snapshot evaluation harness",
    ],
    specs: {
      defaultCpu: "4 vCPU",
      defaultMemory: "8 GB RAM",
      defaultDisk: "20 GB Virtual Disk",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Configurable",
      isolationLevel: "Docker Container",
    },
    config: {
      docker: `docker run -d -p 6080:6080 -p 5900:5900 -e RESOLUTION=1280x800 osworld/desktop-sandbox:latest`,
      python: `import requests

# Send mouse move and click command to GUI agent container
requests.post("http://localhost:6080/api/action", json={
    "action": "mouse_click",
    "x": 420,
    "y": 360,
    "button": "left"
})`,
      typescript: `const res = await fetch("http://localhost:6080/api/screenshot");
const imageBuffer = await res.arrayBuffer();`,
    },
    versions: [
      { version: "v2.1.0", releaseDate: "2026-10-15", changelog: "Added Wayland testbed and clipboard bridge.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Kenji M.",
        rating: 5,
        date: "2026-09-14",
        comment: "Standard tool for Computer Use benchmark evaluations. Very low latency display capture.",
        frameworkUsed: "Claude Code / Anthropic",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/xlang-ai/OSWorld",
    docsUrl: "https://os-world.github.io",
    dockerImage: "osworld/desktop-sandbox:latest",
    supportsMcp: false,
    securityBadges: ["Isolated X11", "Non-root Desktop User"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-7",
    slug: "firecracker-hardened-jail",
    name: "Firecracker MicroVM Hardened Jail",
    shortDescription: "Ultra-secure, minimal Linux microVM jail with gVisor seccomp filters, ephemeral root filesystem, and strict network perimeter.",
    fullDescription: `Engineered for enterprise security teams running untrusted agent code. Combines AWS Firecracker KVM micro-virtualization with gVisor application kernel defenses.

Every execution starts with an uncommitted read-only Alpine root, an in-memory scratch space, an egress proxy filtering all outbound HTTPS requests through strict domain whitelists, and complete hardware-level memory encryption where supported.`,
    provider: {
      name: "ShieldSandbox Labs",
      website: "https://shieldsandbox.dev",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Terminal Environments",
      slug: "terminal-environments",
    },
    tags: ["Firecracker", "KVM", "MicroVM", "Hardened", "Enterprise Security", "Air-gapped", "gVisor"],
    supportedFrameworks: ["LangGraph", "OpenAI Agents SDK", "AutoGen", "CrewAI", "Smolagents"],
    runtimes: ["Alpine Linux 3.20", "Minimal Python 3.12", "Static BusyBox"],
    deploymentType: "MicroVM Sandbox",
    pricing: "Usage-based",
    pricingDetails: "$0.00004 per second of execution time. Enterprise VPC deployment available.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-04-05",
    updatedAt: "2026-10-18",
    stats: {
      installs: 15300,
      stars: 2890,
      rating: 4.96,
      reviewCount: 98,
      activeSessions: 750,
    },
    capabilities: [
      "Hardware-enforced KVM virtualization boundary",
      "Sub-50ms MicroVM jail instantiation",
      "Network proxy with cryptographic domain allowlisting",
      "Cryptographic audit log of every syscall and exec call",
      "Zero persistent state; RAM purged immediately on stop",
    ],
    specs: {
      defaultCpu: "1 - 8 vCPU",
      defaultMemory: "512 MB - 16 GB RAM",
      defaultDisk: "2 GB Ephemeral RAM disk",
      maxTimeoutMinutes: 30,
      gpuAvailable: false,
      networkEgress: "Restricted (Domain Whitelist)",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `shieldvm create --jail enterprise-strict --timeout 300`,
      api: `curl -X POST https://api.shieldsandbox.dev/v1/jails \\
  -H "Authorization: Bearer $SHIELD_TOKEN" \\
  -d '{"image": "alpine-minimal", "allowlist": ["api.openai.com", "pypi.org"]}'`,
      python: `from shieldvm import JailClient

jail = JailClient(api_key="sh_live_...")
session = jail.spawn(allowed_domains=["api.anthropic.com"])
result = session.exec("python3 -c 'import urllib.request; print(urllib.request.urlopen(\"https://api.anthropic.com\").status)'")
print(result.stdout)
session.destroy()`,
      typescript: `import { ShieldVM } from "@shieldsandbox/sdk";

const client = new ShieldVM({ apiKey: process.env.SHIELD_TOKEN });
const session = await client.spawn({ domainAllowlist: ["api.github.com"] });
const out = await session.exec("uname -a");
console.log(out.stdout);
await session.terminate();`,
    },
    versions: [
      { version: "v1.4.0", releaseDate: "2026-10-18", changelog: "Added hardware memory encryption (AMD SEV-SNP support).", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Vikram R. (CISO, CyberScale)",
        rating: 5,
        date: "2026-10-09",
        comment: "The only environment our compliance team cleared for running arbitrary user-supplied code generated by autonomous agents.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/shieldsandbox/firecracker-jail",
    docsUrl: "https://shieldsandbox.dev/docs",
    supportsMcp: true,
    mcpDetails: "Secure jail MCP server restricting commands exclusively to authorized binary manifests.",
    securityBadges: ["SOC2 Type II", "HIPAA Ready", "Hardware KVM", "Egress Whitelist Enforced"],
    isOpenSource: false,
    status: "published",
  },
  {
    id: "env-8",
    slug: "modal-python-agent-box",
    name: "Modal Serverless AI Sandbox",
    shortDescription: "Serverless Python execution environment with instant cold starts, GPU acceleration, and cloud file mounting.",
    fullDescription: `Modal offers a serverless compute engine purpose-built for AI applications and agent swarms. Scale from zero to thousands of concurrent isolated Python containers in seconds.

Equipped with GPU pass-through (A10G, L4, H100), automated Python dependency resolution without building slow Docker images, and network volume mounting. Ideal for agentic workflows doing heavy ML inference, vector embedding computation, and distributed batch processing.`,
    provider: {
      name: "Modal Labs",
      website: "https://modal.com",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "AI & ML Environments",
      slug: "ai-ml-environments",
    },
    tags: ["Serverless", "Python", "GPU", "CUDA", "Fast Cold Start", "Modal", "ML Inference"],
    supportedFrameworks: ["LangGraph", "LlamaIndex", "CrewAI", "Smolagents"],
    runtimes: ["Python 3.10 - 3.12", "CUDA 12.2", "PyTorch 2.4", "vLLM"],
    deploymentType: "Serverless Sandbox",
    pricing: "Usage-based",
    pricingDetails: "$30 free monthly credits; pay per-second of CPU/GPU compute used.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-03-22",
    updatedAt: "2026-10-29",
    stats: {
      installs: 51200,
      stars: 7100,
      rating: 4.93,
      reviewCount: 388,
      activeSessions: 2840,
    },
    capabilities: [
      "Sub-second container startup with snapshot caching",
      "Instant GPU attaching (T4, L4, A10G, A100, H100)",
      "Distributed shared network volumes across agents",
      "Direct Python function execution via SDK",
    ],
    specs: {
      defaultCpu: "2 - 16 vCPU",
      defaultMemory: "4 - 64 GB RAM",
      defaultDisk: "Network Cloud Volume",
      maxTimeoutMinutes: 120,
      gpuAvailable: true,
      networkEgress: "Full",
      isolationLevel: "gVisor Sandbox",
    },
    config: {
      cli: `modal run agent_task.py`,
      python: `import modal

app = modal.App("agent-runner")
image = modal.Image.debian_slim().pip_install("torch", "transformers")

@app.function(image=image, gpu="L4")
def run_model_inference(prompt: str):
    import torch
    return f"Processed '{prompt}' on GPU: {torch.cuda.get_device_name(0)}"`,
      typescript: `// Trigger modal agent via webhook API
const res = await fetch("https://my-modal-org--agent-runner.modal.run", {
  method: "POST",
  body: JSON.stringify({ prompt: "Analyze quarterly earnings" })
});`,
    },
    versions: [
      { version: "v0.64.0", releaseDate: "2026-10-29", changelog: "Added native LangGraph agent executor decorator.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Danielle O.",
        rating: 5,
        date: "2026-10-11",
        comment: "Spinning up 200 concurrent agent sandboxes to analyze PDF datasets took 4 seconds. Game-changer.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/modal-labs/modal-client",
    docsUrl: "https://modal.com/docs",
    supportsMcp: false,
    securityBadges: ["gVisor Container Isolation", "SOC2 Type II", "TLS Everywhere"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-9",
    slug: "duckdb-vector-box",
    name: "DuckDB Analytical Vector Sandbox",
    shortDescription: "Ultra-fast in-process and WASM analytical database sandbox with vector similarity search, parquet streaming, and zero setup.",
    fullDescription: `DuckDB Vector Box is a lightweight, zero-latency analytical environment designed for data science and search agents. Agents can query gigabytes of remote Parquet files, CSVs, and JSON streams directly over HTTP/S3 without loading databases or maintaining servers.

Features pre-compiled VSS (Vector Similarity Search), spatial analytics, and full SQL 99 compatibility. Available both as an in-memory WASM container inside the agent's process or as an ephemeral micro-service.`,
    provider: {
      name: "DuckDB Foundation & Community",
      website: "https://duckdb.org",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Data Science Environments",
      slug: "data-science-environments",
    },
    tags: ["DuckDB", "Parquet", "Vector Search", "SQL", "WASM", "Analytics", "Data Science"],
    supportedFrameworks: ["LangGraph", "LlamaIndex", "OpenAI Agents SDK", "CrewAI", "Smolagents"],
    runtimes: ["DuckDB 1.1", "Python 3.12", "Node.js 20", "WebAssembly"],
    deploymentType: "Local Daemon",
    pricing: "Open Source",
    pricingDetails: "100% Free under MIT License.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-06-01",
    updatedAt: "2026-10-20",
    stats: {
      installs: 33400,
      stars: 5900,
      rating: 4.91,
      reviewCount: 220,
      activeSessions: 1450,
    },
    capabilities: [
      "Direct HTTP/S3 remote Parquet and Delta Lake querying",
      "Vector Cosine and HNSW Index Similarity Search",
      "Native WebAssembly (WASM) execution in browser/edge",
      "Zero network serialization overhead for Python & Arrow",
    ],
    specs: {
      defaultCpu: "2 - 8 vCPU",
      defaultMemory: "2 - 16 GB RAM",
      defaultDisk: "Local In-Memory / Ephemeral TMP",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Configurable",
      isolationLevel: "WebAssembly",
    },
    config: {
      cli: `duckdb -c "INSTALL vss; LOAD vss; SELECT 1;"`,
      python: `import duckdb

con = duckdb.connect()
con.execute("INSTALL httpfs; LOAD httpfs;")
con.execute("INSTALL vss; LOAD vss;")

# Direct query over remote S3 parquet dataset
df = con.execute("""
    SELECT date, category, avg(price) 
    FROM 'https://data.sample.org/transactions.parquet' 
    GROUP BY ALL
""").fetchdf()
print(df.head())`,
      typescript: `import * as duckdb from "@duckdb/duckdb-wasm";

const db = await duckdb.createDuckDB();
const conn = await db.connect();
const result = await conn.query("SELECT 42 as answer");
console.log(result.toArray());`,
      mcp: `{\n  "mcpServers": {\n    "duckdb": {\n      "command": "uvx",\n      "args": ["mcp-server-duckdb", "--db-path", ":memory:"]\n    }\n  }\n}`,
    },
    versions: [
      { version: "v1.1.2", releaseDate: "2026-10-20", changelog: "Added SIMD vector acceleration and parquet delta updates.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-10",
        author: "Li Wei (Quant & AI Agent Lead)",
        rating: 5,
        date: "2026-10-12",
        comment: "Our financial research agents query 500MB parquet filings in under 400ms without having to spin up any external database.",
        frameworkUsed: "LlamaIndex",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/duckdb/duckdb",
    docsUrl: "https://duckdb.org/docs",
    supportsMcp: true,
    mcpDetails: "Supports MCP SQL execute and schema introspection tools.",
    securityBadges: ["MIT License", "Runs In-Process", "No Inbound Ports Needed"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-10",
    slug: "fly-machines-agent-pod",
    name: "Fly.io MicroVM Agent Machines",
    shortDescription: "Global hardware virtualization on physical servers in 35+ regions. Spawn low-latency Firecracker microVMs close to your agents.",
    fullDescription: `Fly Machines are fast, lightweight virtual machines running directly on physical hardware globally across 35 regions. An agent can programmatically start, stop, scale, and destroy isolated microVMs via a fast GraphQL and REST API in ~300ms.

Supports custom Docker images, persistent NVMe volumes, WireGuard private mesh networking between agent fleets, and auto-stop on idle to minimize costs.`,
    provider: {
      name: "Fly.io",
      website: "https://fly.io",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Cloud Environments",
      slug: "cloud-environments",
    },
    tags: ["Fly.io", "Firecracker", "Global Edge", "MicroVM", "Multi-Region", "WireGuard"],
    supportedFrameworks: ["LangGraph", "CrewAI", "AutoGen", "OpenAI Agents SDK"],
    runtimes: ["Any Linux Docker Image", "Ubuntu", "Debian", "Alpine"],
    deploymentType: "Managed Cloud",
    pricing: "Usage-based",
    pricingDetails: "Starting at $0.0000028/sec for shared-cpu-1x (approx $1.94/mo if continuous).",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-02-14",
    updatedAt: "2026-10-27",
    stats: {
      installs: 39100,
      stars: 4900,
      rating: 4.87,
      reviewCount: 260,
      activeSessions: 1820,
    },
    capabilities: [
      "Deployment across 35 global edge regions",
      "Native private 6PN WireGuard mesh network",
      "Persistent encrypted NVMe block volumes",
      "Automatic suspend and resume in <300ms",
    ],
    specs: {
      defaultCpu: "1 - 8 Shared or Performance vCPU",
      defaultMemory: "256 MB - 32 GB RAM",
      defaultDisk: "10 - 500 GB NVMe Volume",
      maxTimeoutMinutes: 1440,
      gpuAvailable: true,
      networkEgress: "Full",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `fly machine run my-agent-image:latest --region ord --auto-destroy`,
      api: `curl -X POST https://api.machines.dev/v1/apps/$APP/machines \\
  -H "Authorization: Bearer $FLY_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"config": {"image": "my-agent-image:latest", "auto_destroy": true}}'`,
      python: `import httpx

headers = {"Authorization": f"Bearer {FLY_TOKEN}"}
resp = httpx.post("https://api.machines.dev/v1/apps/agent-fleet/machines", headers=headers, json={
    "config": {"image": "alpine:latest", "cmd": ["echo", "Agent Task Executed"], "auto_destroy": True}
})
print("Spawned Machine:", resp.json()["id"])`,
      typescript: `const res = await fetch("https://api.machines.dev/v1/apps/agent-fleet/machines", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.FLY_TOKEN}\`, "Content-Type": "application/json" },
  body: JSON.stringify({ config: { image: "alpine:latest", auto_destroy: true } })
});`,
    },
    versions: [
      { version: "v2.0.1", releaseDate: "2026-10-27", changelog: "Added fast warm-snapshot resume API.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-11",
        author: "Lucas B.",
        rating: 5,
        date: "2026-10-04",
        comment: "We run our multi-agent fleet on Fly. The ability to launch ephemeral machines in Tokyo, Frankfurt, and Virginia near user data is unbeatable.",
        frameworkUsed: "CrewAI",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/superfly/flyctl",
    docsUrl: "https://fly.io/docs/machines",
    supportsMcp: false,
    securityBadges: ["Hardware KVM Isolation", "Encrypted at Rest", "SOC2 Type II"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-11",
    slug: "dind-swarm-runner",
    name: "Docker-in-Docker CI Swarm Runner",
    shortDescription: "Privileged Docker-in-Docker execution ring with cached build layers, container builds, and Docker Compose testing for DevOps agents.",
    fullDescription: `The Docker-in-Docker (DinD) CI Swarm Runner provides autonomous DevOps and SRE agents with a self-contained container runtime. Agents can execute 'docker build', pull images, spin up multi-container Docker Compose stacks, and run containerized integration tests.

Includes pre-warmed cache layers for Alpine, Debian, Ubuntu, Node, and Python base images to reduce build latency. Protected by nested cgroups and automated cleanup reaper daemons.`,
    provider: {
      name: "InfraOps Open Platform",
      website: "https://github.com/infraops-runner",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "DevOps Environments",
      slug: "devops-environments",
    },
    tags: ["Docker", "DinD", "DevOps", "CI/CD", "Docker Compose", "BuildKit"],
    supportedFrameworks: ["LangGraph", "AutoGen", "Claude Code / Anthropic"],
    runtimes: ["Docker 27.2", "Docker Compose v2", "BuildKit 0.15", "Linux Kernel 6.6"],
    deploymentType: "Self-Hosted Docker",
    pricing: "Open Source",
    pricingDetails: "Free Apache 2.0 open-source image.",
    verified: false,
    featured: false,
    popular: true,
    publishedAt: "2026-05-18",
    updatedAt: "2026-10-14",
    stats: {
      installs: 18400,
      stars: 2200,
      rating: 4.7,
      reviewCount: 92,
      activeSessions: 530,
    },
    capabilities: [
      "Full Docker daemon inside an isolated container",
      "Multi-platform BuildKit support with layer caching",
      "Docker Compose v2 multi-service orchestration",
      "Automatic container cleanup and zombie process reaping",
    ],
    specs: {
      defaultCpu: "4 vCPU",
      defaultMemory: "8 GB RAM",
      defaultDisk: "30 GB SSD Cache",
      maxTimeoutMinutes: 90,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `docker run --privileged -d -p 2375:2375 infraops/dind-agent-runner:latest`,
      docker: `docker run --privileged --name agent-dind -d infraops/dind-agent-runner:latest`,
      api: `curl --unix-socket /var/run/docker.sock http://localhost/v1.45/containers/json`,
      python: `import docker

client = docker.DockerClient(base_url="tcp://localhost:2375")
container = client.containers.run("alpine", "echo Hello from inner Docker", detach=False)
print(container.decode())`,
      typescript: `import Docker from "dockerode";

const docker = new Docker({ host: "localhost", port: 2375 });
const stream = await docker.run("alpine", ["echo", "DinD works!"]);
console.log(stream);`,
    },
    versions: [
      { version: "v2.3.0", releaseDate: "2026-10-14", changelog: "Upgraded to Docker 27.2 and BuildKit 0.15.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-12",
        author: "DevOpsAgent Tester",
        rating: 4.5,
        date: "2026-09-20",
        comment: "Our autonomous GitHub Actions repair agent builds Docker images and debugs failing Dockerfiles with total ease.",
        frameworkUsed: "AutoGen",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/infraops-runner/dind-agent",
    dockerImage: "infraops/dind-agent-runner:latest",
    supportsMcp: false,
    securityBadges: ["Nested cgroups v2", "Isolated bridge network"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-12",
    slug: "vllm-local-cuda-sandbox",
    name: "vLLM CUDA Inference Sandbox",
    shortDescription: "GPU runtime pre-installed with vLLM, FlashAttention-2, and Hugging Face weights cache for local agent model hosting.",
    fullDescription: `A high-throughput LLM inference execution sandbox tuned with vLLM, PagedAttention, and FlashAttention-2. AI agents requiring high-speed local inference, embedding generation, or specialized fine-tuned models can spawn this environment on demand.

Includes support for quantized model formats (AWQ, GPTQ, GGUF) and OpenAI-compatible API endpoints.`,
    provider: {
      name: "vLLM Open Source Project",
      website: "https://vllm.ai",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "AI & ML Environments",
      slug: "ai-ml-environments",
    },
    tags: ["vLLM", "CUDA", "Inference", "NVIDIA", "FlashAttention", "PagedAttention", "OpenAI Compatible"],
    supportedFrameworks: ["LangGraph", "CrewAI", "AutoGen", "OpenAI Agents SDK"],
    runtimes: ["CUDA 12.4", "vLLM 0.6.3", "PyTorch 2.4", "Python 3.11"],
    deploymentType: "Managed Cloud",
    pricing: "Usage-based",
    pricingDetails: "Starting at $0.80/hr on NVIDIA L4 (24GB VRAM) instances.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-04-20",
    updatedAt: "2026-10-31",
    stats: {
      installs: 21900,
      stars: 4300,
      rating: 4.89,
      reviewCount: 175,
      activeSessions: 940,
    },
    capabilities: [
      "Continuous batching with PagedAttention",
      "Compatible OpenAI /v1/chat/completions endpoint",
      "FlashAttention-2 and dynamic KV-cache management",
      "Preloaded models from HuggingFace Hub cache",
    ],
    specs: {
      defaultCpu: "8 vCPU",
      defaultMemory: "32 GB RAM",
      defaultDisk: "100 GB NVMe Weight Cache",
      maxTimeoutMinutes: 360,
      gpuAvailable: true,
      networkEgress: "Configurable",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `vllm serve meta-llama/Llama-3.1-8B-Instruct --port 8000 --max-model-len 8192`,
      docker: `docker run --gpus all -d -p 8000:8000 vllm/vllm-openai:latest --model Qwen/Qwen2.5-7B-Instruct`,
      api: `curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "Qwen/Qwen2.5-7B-Instruct", "messages": [{"role": "user", "content": "Hello agent"}]}'`,
      python: `from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="not-needed")
completion = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct",
    messages=[{"role": "user", "content": "Explain agent loops concisely"}]
)
print(completion.choices[0].message.content)`,
      typescript: `import OpenAI from "openai";

const openai = new OpenAI({ baseURL: "http://localhost:8000/v1", apiKey: "token" });
const chat = await openai.chat.completions.create({
  model: "Qwen/Qwen2.5-7B-Instruct",
  messages: [{ role: "user", content: "Agent ping test" }]
});
console.log(chat.choices[0].message.content);`,
    },
    versions: [
      { version: "v0.6.3", releaseDate: "2026-10-31", changelog: "Added FP8 quantization support for NVIDIA Ada and Hopper architectures.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-13",
        author: "Tariq A.",
        rating: 5,
        date: "2026-10-25",
        comment: "Zero hallucination latency when running local sub-agents for synthetic data filtering.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/vllm-project/vllm",
    docsUrl: "https://docs.vllm.ai",
    dockerImage: "vllm/vllm-openai:latest",
    supportsMcp: false,
    securityBadges: ["Apache 2.0", "Local Private Weights"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-13",
    slug: "android-emulator-adb-bridge",
    name: "Android Cloud Emulator & ADB Bridge",
    shortDescription: "Virtualized Android x86 emulator with remote ADB WebSocket bridge, screenshot streaming, and touch injection for mobile agents.",
    fullDescription: `Allows autonomous mobile agents to interact directly with real Android OS environments. The container runs an Android 14 x86_64 image with hardware graphics acceleration, providing an ADB (Android Debug Bridge) port and a fast WebRTC video stream.

Agents can install APKs, inspect the UI accessibility hierarchy (UI Automator tree), send tap/swipe coordinates, simulate incoming SMS or phone calls, and test mobile apps without physical devices.`,
    provider: {
      name: "MobileAgent Tech",
      website: "https://mobileagent.io",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Mobile Environments",
      slug: "mobile-environments",
    },
    tags: ["Android", "Mobile", "ADB", "Appium", "UI Automator", "APK Sideload", "Emulator"],
    supportedFrameworks: ["OpenAI Agents SDK", "LangGraph", "Claude Code / Anthropic"],
    runtimes: ["Android 14 API 34", "ADB Server 1.0.41", "Appium 2.5"],
    deploymentType: "Managed Cloud",
    pricing: "Usage-based",
    pricingDetails: "$0.05 per active emulator minute.",
    verified: true,
    featured: false,
    popular: false,
    recentlyAdded: true,
    publishedAt: "2026-09-12",
    updatedAt: "2026-11-02",
    stats: {
      installs: 8400,
      stars: 1420,
      rating: 4.81,
      reviewCount: 65,
      activeSessions: 320,
    },
    capabilities: [
      "Hardware accelerated Android 14 container",
      "UIAutomator XML dump extraction in <100ms",
      "Synthetic touch, swipe, pinch, and keyevent injection",
      "Dynamic APK installation and runtime permissions granting",
    ],
    specs: {
      defaultCpu: "4 vCPU",
      defaultMemory: "8 GB RAM",
      defaultDisk: "20 GB Virtual NAND",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `adb connect localhost:5555 && adb devices`,
      docker: `docker run -d -p 5555:5555 -p 6080:6080 --device /dev/kvm mobileagent/android-14:latest`,
      api: `curl -X POST http://localhost:6080/api/tap -d '{"x": 540, "y": 1200}'`,
      python: `import subprocess

subprocess.run(["adb", "shell", "input", "tap", "540", "1200"])
subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/screen.png"])`,
      typescript: `import { execSync } from "child_process";
execSync("adb shell input text 'Autonomous agent typing'");`,
    },
    versions: [
      { version: "v1.1.0", releaseDate: "2026-11-02", changelog: "Added Android 15 developer preview image option.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-14",
        author: "Devin S.",
        rating: 5,
        date: "2026-10-19",
        comment: "Essential for our automated mobile QA regression agents. Super fast UIAutomator tree dumps.",
        frameworkUsed: "OpenAI Agents SDK",
        verifiedUser: true,
      },
    ],
    docsUrl: "https://mobileagent.io/docs",
    supportsMcp: false,
    securityBadges: ["Isolated KVM container", "Per-session Clean Wipe"],
    isOpenSource: false,
    status: "published",
  },
  {
    id: "env-14",
    slug: "polars-vector-runtime",
    name: "Polars High-Memory Data Runner",
    shortDescription: "Ultra-fast Apache Arrow & Polars runtime optimized for multi-threaded DataFrame queries, large Parquet pipelines, and fast math.",
    fullDescription: `Built on Rust's blazingly fast Polars query engine, this environment provides data-focused AI agents with immense parallel processing speed for CSV, Parquet, and IPC formats.

Equipped with 64GB of memory, SIMD vectorization, lazy query planning, and direct zero-copy Arrow serialization. Ideal for data exploration agents, automated EDA, financial backtesting, and massive tabular datasets.`,
    provider: {
      name: "Polars Foundation",
      website: "https://pola.rs",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Data Science Environments",
      slug: "data-science-environments",
    },
    tags: ["Polars", "Data Science", "Arrow", "Parquet", "High RAM", "Rust", "Analytics"],
    supportedFrameworks: ["LangGraph", "LlamaIndex", "CrewAI", "Smolagents"],
    runtimes: ["Polars 1.12", "Python 3.12", "Rust 1.81", "Node.js 22"],
    deploymentType: "Serverless Sandbox",
    pricing: "Freemium",
    pricingDetails: "Free tier for queries under 10GB; $0.0001/GB-sec for large clusters.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-07-08",
    updatedAt: "2026-10-24",
    stats: {
      installs: 26100,
      stars: 4100,
      rating: 4.94,
      reviewCount: 160,
      activeSessions: 1120,
    },
    capabilities: [
      "Lazy query evaluation and predicate pushdown",
      "SIMD-accelerated aggregation and window calculations",
      "Native Apache Arrow Flight data streaming",
      "Multi-core parallel scanning across large datasets",
    ],
    specs: {
      defaultCpu: "8 - 32 vCPU",
      defaultMemory: "16 - 64 GB RAM",
      defaultDisk: "100 GB NVMe Scratchpad",
      maxTimeoutMinutes: 180,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `polars-runner exec --query "SELECT * FROM 'data.parquet' LIMIT 10"`,
      python: `import polars as pl

# High speed lazy evaluation over 10M rows
q = (
    pl.scan_parquet("s3://agent-data/transactions_*.parquet")
    .filter(pl.col("amount") > 1000)
    .group_by("customer_id")
    .agg(pl.col("amount").sum().alias("total_spent"))
    .sort("total_spent", descending=True)
    .limit(10)
)
df = q.collect()
print(df)`,
      typescript: `import * as pl from "nodejs-polars";

const df = pl.readCSV("https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv");
console.log(df.head());`,
    },
    versions: [
      { version: "v1.12.0", releaseDate: "2026-10-24", changelog: "Added streaming group-by memory optimization.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-15",
        author: "Zack E.",
        rating: 5,
        date: "2026-10-18",
        comment: "Replaced our pandas container. Queries that used to time out our agent in 3 minutes now complete in 1.4 seconds.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/pola-rs/polars",
    docsUrl: "https://docs.pola.rs",
    supportsMcp: true,
    mcpDetails: "Polars MCP server for natural language SQL & DataFrame inspection.",
    securityBadges: ["Apache 2.0 / MIT", "Memory Safe Rust", "Firecracker Sandbox"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-15",
    slug: "playwright-cloud-fleet",
    name: "Playwright Cloud Testing Fleet",
    shortDescription: "Scalable browser grid with parallel worker pools, video recording, network mocking, and HAR logging for automated test agents.",
    fullDescription: `Playwright Cloud Fleet provides on-demand multi-browser worker pools (Chromium, Firefox, WebKit) running on isolated containers. Agents can spin up 50 parallel browser tabs to verify web applications, execute end-to-end user journeys, generate visual regression diffs, and inspect console logs.

Includes automatic HAR network archives, trace viewer zip generation, and integration with modern CI/CD agent workflows.`,
    provider: {
      name: "AgentQA Systems",
      website: "https://agentqa.dev",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Testing Environments",
      slug: "testing-environments",
    },
    tags: ["Playwright", "Testing", "Chromium", "Firefox", "WebKit", "HAR", "Visual Regression"],
    supportedFrameworks: ["LangGraph", "CrewAI", "OpenAI Agents SDK", "Claude Code / Anthropic"],
    runtimes: ["Playwright 1.48", "Chromium", "Firefox", "WebKit", "Node 20"],
    deploymentType: "Managed Cloud",
    pricing: "Usage-based",
    pricingDetails: "$0.008 per browser test run; 2,000 free monthly runs.",
    verified: true,
    featured: false,
    popular: false,
    recentlyAdded: true,
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-26",
    stats: {
      installs: 14200,
      stars: 1850,
      rating: 4.86,
      reviewCount: 84,
      activeSessions: 670,
    },
    capabilities: [
      "True multi-engine support: Chromium, Firefox, WebKit",
      "Automated trace recording & video replay generation",
      "Network mocking, delay injection, and route stubbing",
      "Visual snapshot diffing with pixel-match thresholding",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "10 GB Ephemeral Storage",
      maxTimeoutMinutes: 45,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `npx playwright test --config=cloud.config.ts`,
      typescript: `import { chromium } from "playwright";

const browser = await chromium.connect("wss://grid.agentqa.dev/ws?token=" + process.env.AGENTQA_TOKEN);
const context = await browser.newContext({ recordVideo: { dir: "videos/" } });
const page = await context.newPage();
await page.goto("https://my-app.com");
await page.click("button#checkout");
await context.close();`,
      python: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect("wss://grid.agentqa.dev/ws?token=...")
    page = browser.new_page()
    page.goto("https://my-app.com")
    print(page.title())
    browser.close()`,
    },
    versions: [
      { version: "v1.48.0", releaseDate: "2026-10-26", changelog: "Added WebKit mobile viewport emulation improvements.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-16",
        author: "Priya S.",
        rating: 5,
        date: "2026-10-15",
        comment: "Our autonomous QA agent runs 300 test specs in parallel on every git PR commit. Never fails.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    docsUrl: "https://agentqa.dev/docs",
    supportsMcp: true,
    mcpDetails: "MCP tool suite for running web assertions, taking screenshots, and recording video replays.",
    securityBadges: ["Encrypted WebRTC", "Zero Disk Retention"],
    isOpenSource: false,
    status: "published",
  },
  {
    id: "env-16",
    slug: "wasm-edge-isolated-sandbox",
    name: "WasmEdge Micro-Enclave Sandbox",
    shortDescription: "Ultra-lightweight WebAssembly WASI execution runtime with microsecond startup, strict memory bounds, and zero kernel overhead.",
    fullDescription: `WasmEdge provides a high-performance WebAssembly runtime optimized for cloud-native, edge, and AI agent workloads. Compiles user code into isolated WASI bytecode that boots in sub-millisecond timeframes with virtually zero memory overhead.

Ideal for micro-sandboxes, agent plugins, safe expression evaluation, and edge AI workers where launching heavy Linux containers or microVMs is too slow.`,
    provider: {
      name: "CNCF WasmEdge Project",
      website: "https://wasmedge.org",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Custom Environments",
      slug: "custom-environments",
    },
    tags: ["WASM", "WASI", "WasmEdge", "CNCF", "Microsecond Boot", "Enclave", "Zero Overhead"],
    supportedFrameworks: ["LangGraph", "Smolagents", "OpenAI Agents SDK"],
    runtimes: ["WasmEdge 0.14", "WASI preview2", "Rust Wasm", "C/C++ Wasm"],
    deploymentType: "WASM Enclave",
    pricing: "Open Source",
    pricingDetails: "100% Free Apache 2.0 CNCF Sandbox project.",
    verified: true,
    featured: false,
    popular: false,
    recentlyAdded: true,
    publishedAt: "2026-09-01",
    updatedAt: "2026-10-23",
    stats: {
      installs: 11200,
      stars: 6400,
      rating: 4.88,
      reviewCount: 71,
      activeSessions: 490,
    },
    capabilities: [
      "Sub-millisecond cold start times (~20 microseconds)",
      "Strict memory bounds enforced by WASM sandboxing",
      "Zero Linux kernel syscall exposure",
      "Cross-platform execution across x86_64, ARM64, and Apple Silicon",
    ],
    specs: {
      defaultCpu: "1 vCPU",
      defaultMemory: "64 MB - 512 MB RAM",
      defaultDisk: "In-Memory Virtual FS",
      maxTimeoutMinutes: 15,
      gpuAvailable: false,
      networkEgress: "Air-gapped",
      isolationLevel: "WebAssembly",
    },
    config: {
      cli: `wasmedge --dir .:. agent_task.wasm`,
      docker: `docker run -it wasmedge/wasmedge:latest-slim`,
      python: `from wasmedge import Vm

vm = Vm()
output = vm.run_wasm_file("agent_task.wasm", "main", ["param1", "param2"])
print("Result:", output)`,
      typescript: `import { WasmEdge } from "@wasmedge/sdk";

const vm = new WasmEdge();
const res = await vm.run("agent_task.wasm");
console.log(res);`,
    },
    versions: [
      { version: "v0.14.0", releaseDate: "2026-10-23", changelog: "WASI 0.2 Component Model stable release.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-17",
        author: "Felix R.",
        rating: 5,
        date: "2026-10-02",
        comment: "For executing untrusted math scripts and data transforms from user prompts, nothing beats WASM startup speed.",
        frameworkUsed: "Smolagents",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/WasmEdge/WasmEdge",
    docsUrl: "https://wasmedge.org/docs",
    supportsMcp: false,
    securityBadges: ["CNCF Project", "Linear Memory Bounds", "No Root Syscalls"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-17",
    slug: "stagehand-actuator-box",
    name: "Stagehand Agent Actuator",
    shortDescription: "AI-native web automation SDK that transforms natural language instructions into Playwright actions with self-healing selectors.",
    fullDescription: `Stagehand is an open-source, AI-first browser automation framework. Instead of writing fragile CSS selectors or XPath expressions, agents call high-level intents like 'act("click the primary sign in button")', 'extract("all pricing plan names and costs")', or 'observe()'.

This environment packages Stagehand with a headless Chromium sandbox, automated selector repair, and visual DOM compression.`,
    provider: {
      name: "Browserbase & Community",
      website: "https://stagehand.dev",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Browser Environments",
      slug: "browser-environments",
    },
    tags: ["Stagehand", "Self-Healing", "Natural Language Automation", "Playwright", "Extract", "Observe"],
    supportedFrameworks: ["OpenAI Agents SDK", "LangGraph", "Claude Code / Anthropic", "Smolagents"],
    runtimes: ["Node.js 20", "Chromium 125", "TypeScript 5.4"],
    deploymentType: "Managed Cloud",
    pricing: "Open Source",
    pricingDetails: "Open source framework; pay standard browser session compute.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-07-15",
    updatedAt: "2026-10-28",
    stats: {
      installs: 21500,
      stars: 3900,
      rating: 4.89,
      reviewCount: 145,
      activeSessions: 910,
    },
    capabilities: [
      "Natural language actions: act(), extract(), observe()",
      "Self-healing DOM element recognition through visual-language cues",
      "Structured data extraction with Zod schema enforcement",
      "Token-efficient DOM tree serialization for LLM context windows",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "8 GB Ephemeral Storage",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `npx stagehand init && npx stagehand run`,
      typescript: `import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

const stagehand = new Stagehand({ env: "BROWSERBASE" });
await stagehand.init();

const page = stagehand.page;
await page.goto("https://news.ycombinator.com");

const topStories = await page.extract({
  instruction: "Extract the top 5 articles with their titles and points",
  schema: z.object({
    stories: z.array(z.object({ title: z.string(), points: z.number().optional() }))
  })
});
console.log(topStories);
await stagehand.close();`,
      python: `# Python Stagehand bridge
from stagehand import Stagehand

sh = Stagehand()
sh.goto("https://example.com")
sh.act("click the contact us button")`,
      mcp: `{\n  "mcpServers": {\n    "stagehand": {\n      "command": "npx",\n      "args": ["-y", "@browserbasehq/stagehand-mcp"]\n    }\n  }\n}`,
    },
    versions: [
      { version: "v1.2.1", releaseDate: "2026-10-28", changelog: "Added support for Claude 3.5 Sonnet computer use fallback.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-18",
        author: "Devin M.",
        rating: 5,
        date: "2026-10-14",
        comment: "Zero broken CSS selectors even when websites update their layout. Huge time-saver for research agents.",
        frameworkUsed: "OpenAI Agents SDK",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/browserbase/stagehand",
    docsUrl: "https://docs.stagehand.dev",
    supportsMcp: true,
    mcpDetails: "Full Stagehand natural-language web extraction and action MCP server.",
    securityBadges: ["Open Source", "Ephemeral VM"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-18",
    slug: "supabase-ephemeral-testbed",
    name: "Supabase Ephemeral Edge Sandbox",
    shortDescription: "Complete backend-in-a-box for AI agents: Postgres, pgvector, Edge Functions, Auth, and Storage with instant branch cloning.",
    fullDescription: `The Supabase Ephemeral Edge Sandbox provides autonomous agents with an entire backend stack inside an isolated sandbox. Includes PostgreSQL with Row Level Security (RLS), real-time WebSockets, Supabase Auth user management, S3-compatible Storage, and Deno Edge Functions.

Agents can test end-to-end fullstack features, run integration tests against realistic auth contexts, perform vector similarity lookups, and execute secure database migrations.`,
    provider: {
      name: "Supabase Community",
      website: "https://supabase.com",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Database Environments",
      slug: "database-environments",
    },
    tags: ["Supabase", "PostgreSQL", "RLS", "Auth", "Storage", "pgvector", "Deno"],
    supportedFrameworks: ["LangGraph", "OpenAI Agents SDK", "CrewAI", "LlamaIndex"],
    runtimes: ["Postgres 16.2", "Deno 1.44", "Node 20"],
    deploymentType: "Managed Cloud",
    pricing: "Freemium",
    pricingDetails: "Free ephemeral branches for 2 hours; pay-as-you-go for dedicated instances.",
    verified: true,
    featured: true,
    popular: true,
    publishedAt: "2026-03-10",
    updatedAt: "2026-10-27",
    stats: {
      installs: 45600,
      stars: 6800,
      rating: 4.91,
      reviewCount: 395,
      activeSessions: 2510,
    },
    capabilities: [
      "Instant copy-on-write Postgres branching with pgvector",
      "Full RLS policy verification sandbox",
      "Synthetic user authentication and JWT generation",
      "Isolated object storage bucket simulation",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "10 GB Encrypted Storage",
      maxTimeoutMinutes: 120,
      gpuAvailable: false,
      networkEgress: "Configurable",
      isolationLevel: "Baremetal Virtualization",
    },
    config: {
      cli: `supabase test db --branch agent-scratch`,
      api: `curl -X POST https://api.supabase.com/v1/projects/$REF/branches \\
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"`,
      python: `from supabase import create_client

supabase = create_client("https://xyz.supabase.co", "anon-key-...")
response = supabase.table("agent_logs").insert({"agent_id": "agent-1", "action": "test"}).execute()
print(response.data)`,
      typescript: `import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
const { data, error } = await supabase.from("documents").select("id, title");
console.log(data);`,
      mcp: `{\n  "mcpServers": {\n    "supabase": {\n      "command": "npx",\n      "args": ["-y", "@supabase/mcp-server"],\n      "env": {\n        "SUPABASE_ACCESS_TOKEN": "YOUR_TOKEN"\n      }\n    }\n  }\n}`,
    },
    versions: [
      { version: "v2.5.0", releaseDate: "2026-10-27", changelog: "Added automated RLS security flaw auditor for agent code reviews.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-19",
        author: "Camila V.",
        rating: 5,
        date: "2026-10-21",
        comment: "Our code-generation agents write both the frontend Next.js code and the Supabase RLS migrations, testing them end-to-end here.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/supabase/supabase",
    docsUrl: "https://supabase.com/docs",
    supportsMcp: true,
    mcpDetails: "Supabase MCP server exposing database schema introspection, query execution, and migration tools.",
    securityBadges: ["SOC2 Type II", "Row Level Security Strict", "PostgreSQL 16"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-19",
    slug: "codesandbox-microvm",
    name: "CodeSandbox MicroVM Dev Container",
    shortDescription: "Instant full-stack web and Node/Next.js/Vite development microVMs with live preview URLs and terminal multiplexing.",
    fullDescription: `CodeSandbox MicroVMs provide fast, memory-optimized containers designed for executing and previewing fullstack web applications. When an agent creates a React, Vue, Next.js, or Express application, the CodeSandbox environment boots a dedicated microVM with port forwarding and instant HTTPS preview URLs in <1 second.

Features memory snapshotting, live terminal access, and zero-config port forwarding.`,
    provider: {
      name: "CodeSandbox BV",
      website: "https://codesandbox.io",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Coding Environments",
      slug: "coding-environments",
    },
    tags: ["CodeSandbox", "Next.js", "React", "Fullstack", "Live Preview", "MicroVM"],
    supportedFrameworks: ["LangGraph", "Claude Code / Anthropic", "OpenAI Agents SDK"],
    runtimes: ["Node.js 20 & 22", "Bun 1.1", "Rust", "Python 3.11"],
    deploymentType: "MicroVM Sandbox",
    pricing: "Freemium",
    pricingDetails: "Free for basic microVMs; Pro tier for 8 vCPU instances.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-04-12",
    updatedAt: "2026-10-18",
    stats: {
      installs: 38200,
      stars: 5400,
      rating: 4.88,
      reviewCount: 230,
      activeSessions: 1640,
    },
    capabilities: [
      "Sub-second microVM resume from snapshot",
      "Automatic public HTTPS preview URL generation",
      "Native support for Vite, Next.js, SvelteKit, Astro",
      "Programmatic filesystem manipulation via REST API",
    ],
    specs: {
      defaultCpu: "2 - 8 vCPU",
      defaultMemory: "4 - 16 GB RAM",
      defaultDisk: "20 GB NVMe",
      maxTimeoutMinutes: 90,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "Firecracker MicroVM",
    },
    config: {
      cli: `csb sandbox create --template node`,
      api: `curl -X POST https://api.codesandbox.io/v1/sandboxes \\
  -H "Authorization: Bearer $CSB_TOKEN" \\
  -d '{"template": "nextjs"}'`,
      typescript: `import { CodeSandbox } from "@codesandbox/sdk";

const csb = new CodeSandbox({ apiKey: process.env.CSB_TOKEN });
const sandbox = await csb.sandboxes.create({ template: "nextjs" });
console.log("Live Preview URL:", sandbox.previewUrl);`,
    },
    versions: [
      { version: "v3.2.0", releaseDate: "2026-10-18", changelog: "Added Bun 1.1 runtime template and snapshot hibernation.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-20",
        author: "Tobias K.",
        rating: 5,
        date: "2026-09-28",
        comment: "Our AI web app builder uses CodeSandbox microVMs to immediately give users a live, running preview of generated apps.",
        frameworkUsed: "Claude Code / Anthropic",
        verifiedUser: true,
      },
    ],
    docsUrl: "https://codesandbox.io/docs",
    supportsMcp: false,
    securityBadges: ["Hardware Virtualization", "Zero Trust Network"],
    isOpenSource: false,
    status: "published",
  },
  {
    id: "env-20",
    slug: "cloudflare-worker-agent-sandbox",
    name: "Cloudflare Workers & V8 Sandbox",
    shortDescription: "Globally distributed 0ms cold-start V8 isolates with Vectorize vector database, KV storage, and AI Gateway bindings.",
    fullDescription: `Cloudflare Workers execute AI agent logic within lightweight V8 isolates running across Cloudflare's 300+ city global network. Boasting genuine 0ms cold starts, this environment is optimized for high-speed edge reasoning, API gateway mediation, and lightweight tool execution.

Includes direct bindings to Cloudflare Vectorize (vector search), Workers KV, D1 (serverless SQLite), and Cloudflare AI Gateway for unified LLM caching and rate limiting.`,
    provider: {
      name: "Cloudflare Inc.",
      website: "https://cloudflare.com",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "Cloud Environments",
      slug: "cloud-environments",
    },
    tags: ["Cloudflare", "V8 Isolates", "Edge", "0ms Cold Start", "Serverless", "Vectorize", "D1"],
    supportedFrameworks: ["LangGraph", "Smolagents", "OpenAI Agents SDK"],
    runtimes: ["V8 Isolates", "JavaScript / TypeScript", "WASI"],
    deploymentType: "Serverless Sandbox",
    pricing: "Freemium",
    pricingDetails: "100,000 free requests per day; $5/mo for 10 million requests.",
    verified: true,
    featured: false,
    popular: true,
    publishedAt: "2026-01-15",
    updatedAt: "2026-10-22",
    stats: {
      installs: 44100,
      stars: 5800,
      rating: 4.89,
      reviewCount: 305,
      activeSessions: 2190,
    },
    capabilities: [
      "True 0-millisecond cold start times globally",
      "V8 Isolate hardware multi-tenant separation",
      "Integrated Vectorize vector embeddings index",
      "Cloudflare AI Gateway caching and token rate limiting",
    ],
    specs: {
      defaultCpu: "1 vCPU Shared",
      defaultMemory: "128 MB RAM per Isolate",
      defaultDisk: "Distributed KV / D1 SQLite",
      maxTimeoutMinutes: 15,
      gpuAvailable: false,
      networkEgress: "Full",
      isolationLevel: "WebAssembly",
    },
    config: {
      cli: `wrangler deploy`,
      typescript: `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/agent/search") {
      const vec = await env.AI.run("@cf/baai/bge-small-en-v1.5", { text: "agent query" });
      const matches = await env.VECTORIZE.query(vec.data[0], { topK: 3 });
      return Response.json(matches);
    }
    return new Response("Edge Agent Ready");
  }
};`,
    },
    versions: [
      { version: "v3.18.0", releaseDate: "2026-10-22", changelog: "Added dynamic sub-request pooling for multi-agent chains.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-21",
        author: "Devon C.",
        rating: 5,
        date: "2026-10-08",
        comment: "Deploying router agents on Cloudflare gives our users sub-30ms response times anywhere on the globe.",
        frameworkUsed: "OpenAI Agents SDK",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/cloudflare/workers-sdk",
    docsUrl: "https://developers.cloudflare.com/workers",
    supportsMcp: false,
    securityBadges: ["V8 Memory Isolation", "SOC2 Type II", "Zero Inbound Attack Surface"],
    isOpenSource: true,
    status: "published",
  },
  {
    id: "env-21",
    slug: "terraform-cloud-sandbox",
    name: "Terraform & OpenTofu State Sandbox",
    shortDescription: "Safe ephemeral sandbox for AI infrastructure agents to plan, validate, and dry-run Terraform / OpenTofu configurations without touching real cloud resources.",
    fullDescription: `Engineered specifically for DevOps, SRE, and Platform Engineering agents. The Terraform & OpenTofu State Sandbox provides a mock cloud provider interface (AWS, GCP, Azure, Kubernetes) with local mock backends.

Agents can run 'terraform init', 'terraform plan', parse the structured JSON plan output, check for security policy violations with Checkov and tfsec, and verify intended state changes without risking accidental cloud destruction or cost overruns.`,
    provider: {
      name: "CloudInfra Security Group",
      website: "https://cloudinfra.security",
      verified: true,
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
    },
    category: {
      name: "DevOps Environments",
      slug: "devops-environments",
    },
    tags: ["Terraform", "OpenTofu", "IaC", "DevOps", "Checkov", "Policy as Code", "Mock Cloud"],
    supportedFrameworks: ["LangGraph", "AutoGen", "Claude Code / Anthropic"],
    runtimes: ["Terraform 1.9", "OpenTofu 1.8", "Checkov 3.2", "Python 3.12"],
    deploymentType: "Self-Hosted Docker",
    pricing: "Open Source",
    pricingDetails: "Free Apache 2.0 open-source runner.",
    verified: true,
    featured: false,
    popular: false,
    recentlyAdded: true,
    publishedAt: "2026-09-20",
    updatedAt: "2026-11-03",
    stats: {
      installs: 9800,
      stars: 1650,
      rating: 4.84,
      reviewCount: 52,
      activeSessions: 390,
    },
    capabilities: [
      "Mock AWS/GCP/Azure resource state simulator",
      "Automated 'terraform plan -json' extraction for agent consumption",
      "Built-in Checkov and Trivy security scanning engine",
      "State file rollback and dry-run sandbox isolation",
    ],
    specs: {
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "15 GB SSD",
      maxTimeoutMinutes: 60,
      gpuAvailable: false,
      networkEgress: "Restricted (Domain Whitelist)",
      isolationLevel: "Docker Container",
    },
    config: {
      cli: `tofu init && tofu plan -json > tfplan.json`,
      docker: `docker run -it --rm cloudinfra/opentofu-sandbox:latest`,
      python: `import subprocess
import json

# Agent executes dry-run plan
subprocess.run(["tofu", "init"], check=True)
proc = subprocess.run(["tofu", "plan", "-json"], capture_output=True, text=True)
plan_data = json.loads(proc.stdout)
print("Proposed resource changes:", len(plan_data.get("resource_changes", [])))`,
    },
    versions: [
      { version: "v1.2.0", releaseDate: "2026-11-03", changelog: "Added OpenTofu 1.8 encryption-at-rest state feature.", isLatest: true },
    ],
    reviews: [
      {
        id: "rev-22",
        author: "Greg M. (Staff SRE)",
        rating: 5,
        date: "2026-10-25",
        comment: "Our infrastructure agent refactors legacy Terraform code and runs security audits in this sandbox before posting a pull request.",
        frameworkUsed: "LangGraph",
        verifiedUser: true,
      },
    ],
    githubUrl: "https://github.com/cloudinfra-sec/opentofu-sandbox",
    dockerImage: "cloudinfra/opentofu-sandbox:latest",
    supportsMcp: true,
    mcpDetails: "MCP tool wrapper providing tf_plan, tf_validate, and checkov_audit tools.",
    securityBadges: ["Read-only Cloud Credentials", "Mock State Backend"],
    isOpenSource: true,
    status: "published",
  },
];

