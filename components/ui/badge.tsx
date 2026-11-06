import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "verified" | "success" | "warning" | "framework";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center gap-1 font-medium text-xs px-2.5 py-0.5 rounded-full transition-colors";

  const variants = {
    default: "bg-blue-50 text-blue-700 border border-blue-200/80",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "text-slate-600 border border-slate-300 bg-white",
    verified: "bg-blue-50 text-blue-700 border border-blue-300 font-semibold",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    framework: "bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[11px]",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}

