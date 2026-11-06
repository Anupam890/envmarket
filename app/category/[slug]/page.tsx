import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { CATEGORY_ICONS } from "@/components/marketplace/CategoryGrid";
import { ENVIRONMENTS } from "@/lib/data/environments";
import { EnvironmentCard } from "@/components/marketplace/EnvironmentCard";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return { title: "Category Not Found | EnvMarket" };

  return {
    title: `${category.name} for AI Agents | EnvMarket`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) notFound();

  const envs = ENVIRONMENTS.filter((e) => e.category.slug === category.slug);
  const icon = CATEGORY_ICONS[category.icon] || <Layers className="w-6 h-6" />;

  return (
    <div className="w-full pb-20">
      {/* Category Banner Header with Aceternity BackgroundGrid */}
      <BackgroundGrid variant="grid" className="border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 12 Categories</span>
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {category.name}
                </h1>
                <Badge variant="default" className="text-xs">
                  {envs.length} Environments
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Tagged:</span>
                {category.highlightedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BackgroundGrid>

      {/* Environments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Available {category.name}
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {envs.length} active listings
          </span>
        </div>

        {envs.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-slate-200 bg-white space-y-2">
            <p className="text-sm font-semibold text-slate-800">
              No environments yet in this category
            </p>
            <p className="text-xs text-slate-500">
              Be the first developer to publish an environment in {category.name}.
            </p>
            <div className="pt-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
              >
                Submit Environment
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {envs.map((env) => (
              <EnvironmentCard
                key={env.id}
                environment={env}
                showCategoryBadge={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
