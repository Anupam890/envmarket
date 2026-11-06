import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderKanban, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { COLLECTIONS } from "@/lib/data/collections";
import { COLLECTION_ICONS } from "@/components/marketplace/CollectionsSection";
import { ENVIRONMENTS } from "@/lib/data/environments";
import { EnvironmentCard } from "@/components/marketplace/EnvironmentCard";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);

  if (!col) return { title: "Collection Not Found | EnvMarket" };

  return {
    title: `${col.title} | EnvMarket`,
    description: col.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);

  if (!col) notFound();

  const envs = ENVIRONMENTS.filter((e) => col.environmentSlugs.includes(e.slug));
  const icon = COLLECTION_ICONS[col.icon] || <Layers className="w-6 h-6" />;

  return (
    <div className="w-full pb-20">
      <BackgroundGrid variant="grid" className="border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {col.title}
                </h1>
                <Badge variant="default" className="text-xs">
                  {envs.length} Environments
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {col.description}
              </p>
            </div>
          </div>
        </div>
      </BackgroundGrid>

      {/* Environments in Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Included Environments in this Toolkit
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {envs.length} verified packages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {envs.map((env) => (
            <EnvironmentCard key={env.id} environment={env} />
          ))}
        </div>
      </div>
    </div>
  );
}
