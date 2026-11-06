import { notFound } from "next/navigation";
import { ENVIRONMENTS } from "@/lib/data/environments";
import { EnvironmentDetailClient } from "@/components/detail/EnvironmentDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ENVIRONMENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const env = ENVIRONMENTS.find((e) => e.slug === slug);

  if (!env) {
    return {
      title: "Environment Details | EnvMarket",
    };
  }

  return {
    title: `${env.name} - AI Agent Execution Environment | EnvMarket`,
    description: env.shortDescription,
  };
}

export default async function EnvironmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const env = ENVIRONMENTS.find((e) => e.slug === slug);

  if (!env) {
    // If not in static list, create a placeholder so custom submitted envs in localStorage can hydrate client-side
    const fallbackEnv = {
      id: slug,
      slug,
      name: slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      shortDescription: "Custom user-submitted execution environment.",
      fullDescription: "This environment was submitted by the community and is managed in your local registry.",
      provider: { name: "Community Contributor", verified: false },
      category: { name: "Custom Environments", slug: "custom-environments" as const },
      tags: ["Agent", "Custom", "Community"],
      supportedFrameworks: ["LangGraph" as const, "OpenAI Agents SDK" as const],
      runtimes: ["Linux", "Python 3.11"],
      deploymentType: "Self-Hosted Docker" as const,
      pricing: "Open Source" as const,
      verified: false,
      featured: false,
      popular: false,
      publishedAt: "2026-11-01",
      updatedAt: "2026-11-01",
      stats: { installs: 1, stars: 1, rating: 5.0, reviewCount: 0, activeSessions: 0 },
      capabilities: ["Isolated container execution", "Custom CLI support"],
      specs: {
        defaultCpu: "2 vCPU",
        defaultMemory: "4 GB RAM",
        defaultDisk: "10 GB Storage",
        maxTimeoutMinutes: 60,
        gpuAvailable: false,
        networkEgress: "Configurable" as const,
        isolationLevel: "Docker Container" as const,
      },
      config: {
        cli: `envmarket run ${slug}`,
        python: `from envmarket import Sandbox\nsandbox = Sandbox.create("${slug}")`,
      },
      versions: [{ version: "v0.1.0", releaseDate: "2026-11-01", changelog: "Initial release" }],
      reviews: [],
      supportsMcp: false,
      securityBadges: ["Community Submission"],
      isOpenSource: true,
      status: "published" as const,
    };

    return <EnvironmentDetailClient initialEnvironment={fallbackEnv} />;
  }

  return <EnvironmentDetailClient initialEnvironment={env} />;
}
