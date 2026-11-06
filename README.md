# EnvMarket

> **The marketplace for discovering, publishing, managing and launching execution environments for AI agents.**

EnvMarket is a modern developer infrastructure marketplace designed for autonomous AI agents. Find, launch, and connect execution environments (Firecracker microVMs, headless browser fleets, ephemeral database branches, and coding sandboxes) for LangGraph, OpenAI Agents SDK, CrewAI, AutoGen, and Claude Code.

---

## ⚡ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling & UI:** Tailwind CSS, Aceternity UI (Spotlight, Background Grid, Card Spotlight, Shimmer Button, Bento Grid), Lucide React
- **Forms & Validation:** React Hook Form, Zod
- **Backend & Database:** Supabase, PostgreSQL, Row Level Security (RLS)
- **Language:** TypeScript 5

---

## 🌟 Key Features

### 1. Marketplace Discovery Experience
- **12 Specialized Categories:** Browser, Terminal, Coding, Cloud, Desktop, Database, AI & ML, Testing, Mobile, Data Science, DevOps, and Custom Environments.
- **Curated Collections:** Best Browser Environments, Coding Environments for Autonomous Agents, Best Python Execution Environments, Secure Sandboxes, Cloud Environments, and Database Branches.
- **Deep Search & Filtering:** Filter by Category, Runtime, Deployment Type, Pricing, and Framework Compatibility. Fast `Ctrl+K` global typeahead search modal.
- **Sort Rankings:** Sort by Most Popular, Most Installed, Recently Updated, and Highest Rated with verified community metrics.

### 2. Environment Detail Pages
- Full architectural overview, capabilities, system specifications (CPU, RAM, Disk, Timeout, Isolation level, Network egress).
- Interactive multi-tab configuration snippets: **CLI**, **Docker**, **cURL/API**, **Python**, **TypeScript**, and **Model Context Protocol (MCP)**.
- **Connect to Agent Generator:** Drop-in tool code generation for LangGraph, OpenAI Agents SDK, and CrewAI.
- Community reviews and star rating submission system.

### 3. Decoupled Sandbox Execution Simulator
- Decouples marketplace catalog from actual execution infrastructure.
- Interactive modal with real-time provisioning states (`PROVISIONING` → `RUNNING` → `READY`).
- Ephemeral JWT token issuance and live WebSocket connect URLs.
- Live terminal execution audit log with resource metering.

### 4. Developer Publishing Portal
- Structured submission form validated with Zod & React Hook Form.
- Developer listing management console with version history and live install telemetry.

### 5. Admin Governance Dashboard
- Platform health metrics: total listings, pending submissions, published count, and verification ratio.
- 1-click Approve / Reject moderation queue for community submissions.
- Registry directory management and verification badge workflow.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Anupam890/envmarket.git
cd envmarket

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── app/
│   ├── admin/               # Admin governance dashboard
│   ├── api/                 # Environments & runtime launch simulator APIs
│   ├── category/[slug]/     # 12 dedicated category browse pages
│   ├── collections/         # Curated environment toolkits
│   ├── dashboard/           # User dashboard (saved, recent, submissions, sessions)
│   ├── developer/           # Developer hub & listing manager
│   ├── docs/                # Architectural & isolation documentation
│   ├── environments/[slug]/ # Environment detail pages
│   ├── explore/             # Full search & filter marketplace
│   ├── submit/              # Environment submission form
│   ├── globals.css          # Theme variables & Aceternity animations
│   ├── layout.tsx           # Global root layout with Navbar & Footer
│   └── page.tsx             # Homepage (Sections A through J)
├── components/
│   ├── detail/              # Code tabs, agent connect modal, reviews
│   ├── layout/              # Navbar, Footer, MobileNav
│   ├── marketplace/         # Environment card, Hero, Categories, Collections, Search
│   └── ui/
│       ├── aceternity/      # Spotlight, BackgroundGrid, CardSpotlight, ShimmerButton
│       └── ...              # Button, Badge, Input, Modal
├── lib/
│   ├── data/                # Categories, environments, and collections datasets
│   ├── store/               # Reactive marketplace store (bookmarks, submissions, sessions)
│   ├── supabase/            # Client configuration & schema.sql with RLS
│   └── types.ts             # TypeScript interfaces
```

---

## 📄 License

MIT © [EnvMarket](https://github.com/Anupam890/envmarket)
