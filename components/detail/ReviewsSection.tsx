"use client";

import * as React from "react";
import { Star, ShieldCheck, MessageSquare, Send } from "lucide-react";
import { ReviewItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface ReviewsSectionProps {
  environmentSlug: string;
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, "id" | "date">) => void;
}

export function ReviewsSection({
  environmentSlug,
  reviews,
  onAddReview,
}: ReviewsSectionProps) {
  const [authorName, setAuthorName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [framework, setFramework] = React.useState("LangGraph");
  const [comment, setComment] = React.useState("");
  const [formOpen, setFormOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      toast.error("Please fill in your name and review comment");
      return;
    }

    onAddReview({
      author: authorName.trim(),
      rating,
      comment: comment.trim(),
      frameworkUsed: framework,
      verifiedUser: true,
    });

    toast.success("Review published successfully!");
    setAuthorName("");
    setComment("");
    setFormOpen(false);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-6">
      {/* Ratings Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-slate-200 bg-white gap-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-extrabold text-slate-900">{avgRating}</div>
          <div>
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(Number(avgRating))
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {reviews.length} verified developer reviews
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setFormOpen(!formOpen)}
          className="gap-1.5"
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>{formOpen ? "Cancel Review" : "Write a Review"}</span>
        </Button>
      </div>

      {/* Review Submission Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-4 animate-in fade-in duration-200"
        >
          <h4 className="text-sm font-semibold text-slate-900">
            Write a Developer Review
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Name / Organization
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Maya Chen, Senior ML Engineer"
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Needs Improvement)</option>
                <option value={1}>⭐ (1 - Unusable)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Framework Used
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="LangGraph">LangGraph</option>
                <option value="OpenAI Agents SDK">OpenAI Agents SDK</option>
                <option value="CrewAI">CrewAI</option>
                <option value="AutoGen">AutoGen</option>
                <option value="Claude Code / Anthropic">Claude Code / Anthropic</option>
                <option value="Custom Agent">Custom Agent Pipeline</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Feedback & Performance Experience
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe boot speed, sandbox isolation reliability, tool ergonomics, and API latency..."
              rows={3}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-slate-500 rounded-xl border border-slate-200 bg-white text-xs">
            No reviews yet. Be the first to share your agent benchmarking experience!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {rev.author}
                  </span>
                  {rev.verifiedUser && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      Verified
                    </span>
                  )}
                  {rev.frameworkUsed && (
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {rev.frameworkUsed}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{formatDate(rev.date)}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

