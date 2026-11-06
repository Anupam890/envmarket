"use client";

import { useState, useEffect, useCallback } from "react";
import { Environment, ReviewItem, SubmissionFormData } from "../types";
import { ENVIRONMENTS } from "../data/environments";

const STORAGE_KEY_BOOKMARKS = "envmarket_bookmarks";
const STORAGE_KEY_RECENT = "envmarket_recent_viewed";
const STORAGE_KEY_SUBMISSIONS = "envmarket_custom_submissions";
const STORAGE_KEY_REVIEWS = "envmarket_custom_reviews";
const STORAGE_KEY_ADMIN_STATUS = "envmarket_admin_statuses";

export function useMarketplaceStore() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [customSubmissions, setCustomSubmissions] = useState<Environment[]>([]);
  const [customReviews, setCustomReviews] = useState<Record<string, ReviewItem[]>>({});
  const [adminStatusOverrides, setAdminStatusOverrides] = useState<Record<string, "published" | "pending" | "rejected">>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

      const storedRecent = localStorage.getItem(STORAGE_KEY_RECENT);
      if (storedRecent) setRecentSlugs(JSON.parse(storedRecent));

      const storedSubmissions = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (storedSubmissions) setCustomSubmissions(JSON.parse(storedSubmissions));

      const storedReviews = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (storedReviews) setCustomReviews(JSON.parse(storedReviews));

      const storedStatus = localStorage.getItem(STORAGE_KEY_ADMIN_STATUS);
      if (storedStatus) setAdminStatusOverrides(JSON.parse(storedStatus));
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save Bookmarks
  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(slug);
      const next = exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  // Record Recently Viewed
  const recordView = useCallback((slug: string) => {
    setRecentSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const next = [slug, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Submit New Environment
  const submitEnvironment = useCallback((formData: SubmissionFormData): Environment => {
    const newEnv: Environment = {
      id: `custom-${Date.now()}`,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: formData.name,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      provider: {
        name: formData.providerName,
        website: formData.providerWebsite,
        verified: false,
      },
      category: {
        name: formData.categorySlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
        slug: formData.categorySlug,
      },
      tags: formData.capabilities.slice(0, 4),
      supportedFrameworks: formData.supportedFrameworks,
      runtimes: formData.runtimes,
      deploymentType: formData.deploymentType,
      pricing: formData.pricing,
      pricingDetails: "User-submitted environment",
      verified: false,
      featured: false,
      popular: false,
      recentlyAdded: true,
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      stats: {
        installs: 1,
        stars: 1,
        rating: 5.0,
        reviewCount: 0,
        activeSessions: 0,
      },
      capabilities: formData.capabilities,
      specs: formData.specs,
      config: formData.configTemplates,
      versions: [
        {
          version: "v0.1.0",
          releaseDate: new Date().toISOString().split("T")[0],
          changelog: "Initial submission",
          isLatest: true,
        },
      ],
      reviews: [],
      githubUrl: formData.githubUrl,
      docsUrl: formData.docsUrl,
      dockerImage: formData.dockerImage,
      supportsMcp: formData.supportsMcp,
      mcpDetails: formData.mcpDetails,
      securityBadges: ["Community Submission"],
      isOpenSource: formData.isOpenSource,
      status: "pending", // Pending admin review
    };

    setCustomSubmissions((prev) => {
      const next = [newEnv, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    return newEnv;
  }, []);

  // Add Review
  const addReview = useCallback((environmentSlug: string, review: Omit<ReviewItem, "id" | "date">) => {
    const fullReview: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    setCustomReviews((prev) => {
      const existing = prev[environmentSlug] || [];
      const next = { ...prev, [environmentSlug]: [fullReview, ...existing] };
      try {
        localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Admin Actions
  const updateEnvironmentStatus = useCallback((slug: string, status: "published" | "pending" | "rejected") => {
    setAdminStatusOverrides((prev) => {
      const next = { ...prev, [slug]: status };
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_STATUS, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Merge Base Environments + Custom Submissions + Admin Overrides + User Reviews
  const allEnvironments: Environment[] = [...customSubmissions, ...ENVIRONMENTS].map((env) => {
    const overrideStatus = adminStatusOverrides[env.slug];
    const status = overrideStatus || env.status;
    const additionalReviews = customReviews[env.slug] || [];
    const mergedReviews = [...additionalReviews, ...(env.reviews || [])];

    return {
      ...env,
      status,
      reviews: mergedReviews,
      stats: {
        ...env.stats,
        reviewCount: mergedReviews.length,
      },
    };
  });

  const publishedEnvironments = allEnvironments.filter((env) => env.status === "published");
  const pendingEnvironments = allEnvironments.filter((env) => env.status === "pending");

  return {
    isLoaded,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    recentSlugs,
    recordView,
    submitEnvironment,
    addReview,
    updateEnvironmentStatus,
    allEnvironments,
    publishedEnvironments,
    pendingEnvironments,
    customSubmissions,
  };
}

