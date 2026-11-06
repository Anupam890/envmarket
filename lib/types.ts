export type CategorySlug =
  | "browser-environments"
  | "terminal-environments"
  | "coding-environments"
  | "cloud-environments"
  | "desktop-environments"
  | "database-environments"
  | "ai-ml-environments"
  | "testing-environments"
  | "mobile-environments"
  | "data-science-environments"
  | "devops-environments"
  | "custom-environments";

export type DeploymentType =
  | "Managed Cloud"
  | "Self-Hosted Docker"
  | "MicroVM Sandbox"
  | "Serverless Sandbox"
  | "Local Daemon"
  | "WASM Enclave";

export type PricingModel = "Free" | "Open Source" | "Freemium" | "Usage-based" | "Commercial";

export type AgentFramework =
  | "LangGraph"
  | "OpenAI Agents SDK"
  | "CrewAI"
  | "AutoGen"
  | "LlamaIndex"
  | "Smolagents"
  | "Claude Code / Anthropic"
  | "Semantic Kernel";

export interface SystemSpecs {
  defaultCpu: string;
  defaultMemory: string;
  defaultDisk: string;
  maxTimeoutMinutes: number;
  gpuAvailable: boolean;
  networkEgress: "Full" | "Restricted (Domain Whitelist)" | "Air-gapped" | "Configurable";
  isolationLevel: "gVisor Sandbox" | "Firecracker MicroVM" | "Docker Container" | "WebAssembly" | "Baremetal Virtualization";
}

export interface ConfigTemplates {
  cli?: string;
  docker?: string;
  api?: string;
  python?: string;
  typescript?: string;
  mcp?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  frameworkUsed?: string;
  verifiedUser?: boolean;
}

export interface EnvironmentVersion {
  version: string;
  releaseDate: string;
  changelog: string;
  isLatest?: boolean;
}

export interface Environment {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  provider: {
    name: string;
    website?: string;
    verified: boolean;
    avatarUrl?: string;
  };
  category: {
    name: string;
    slug: CategorySlug;
  };
  tags: string[];
  supportedFrameworks: AgentFramework[];
  runtimes: string[];
  deploymentType: DeploymentType;
  pricing: PricingModel;
  pricingDetails?: string;
  verified: boolean;
  featured: boolean;
  popular: boolean;
  recentlyAdded?: boolean;
  publishedAt: string;
  updatedAt: string;
  stats: {
    installs: number;
    stars: number;
    rating: number;
    reviewCount: number;
    activeSessions: number;
  };
  capabilities: string[];
  specs: SystemSpecs;
  config: ConfigTemplates;
  versions: EnvironmentVersion[];
  reviews: ReviewItem[];
  githubUrl?: string;
  docsUrl?: string;
  dockerImage?: string;
  supportsMcp: boolean;
  mcpDetails?: string;
  securityBadges: string[];
  isOpenSource: boolean;
  status: "published" | "pending" | "rejected";
}

export interface EnvironmentCategory {
  id: string;
  name: string;
  slug: CategorySlug;
  icon: string;
  description: string;
  environmentCount: number;
  highlightedTags: string[];
}

export interface EnvironmentCollection {
  id: string;
  slug: string;
  title: string;
  description: string;
  environmentSlugs: string[];
  icon: string;
  coverAccent: string;
}

export interface SubmissionFormData {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  providerName: string;
  providerWebsite?: string;
  categorySlug: CategorySlug;
  deploymentType: DeploymentType;
  pricing: PricingModel;
  isOpenSource: boolean;
  githubUrl?: string;
  docsUrl?: string;
  runtimes: string[];
  supportedFrameworks: AgentFramework[];
  capabilities: string[];
  supportsMcp: boolean;
  mcpDetails?: string;
  dockerImage?: string;
  specs: SystemSpecs;
  configTemplates: ConfigTemplates;
}

