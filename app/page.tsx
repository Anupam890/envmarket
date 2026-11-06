import { HeroSection } from "@/components/marketplace/HeroSection";
import { CategoryGrid } from "@/components/marketplace/CategoryGrid";
import { FeaturedEnvironmentsSection } from "@/components/marketplace/FeaturedEnvironmentsSection";
import { PopularSortSection } from "@/components/marketplace/PopularSortSection";
import { RecentlyAddedSection } from "@/components/marketplace/RecentlyAddedSection";
import { CollectionsSection } from "@/components/marketplace/CollectionsSection";
import { DeveloperSubmissionCta } from "@/components/marketplace/DeveloperSubmissionCta";
import { FaqSection } from "@/components/marketplace/FaqSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* B. Hero Section */}
      <HeroSection />

      {/* C. Categories (12 Categories Grid) */}
      <CategoryGrid />

      {/* D. Featured Environments */}
      <FeaturedEnvironmentsSection />

      {/* E. Popular Environments (Sortable by popular, installs, updated, rating) */}
      <PopularSortSection />

      {/* F. Recently Added */}
      <RecentlyAddedSection />

      {/* G. Environment Collections */}
      <CollectionsSection />

      {/* H. Developer Submission CTA */}
      <DeveloperSubmissionCta />

      {/* I. FAQ */}
      <FaqSection />
    </div>
  );
}
