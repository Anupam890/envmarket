"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "grid" | "dots";
}

export function BackgroundGrid({
  children,
  className,
  variant = "grid",
}: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white",
        className
      )}
    >
      {/* Background pattern */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          variant === "grid"
            ? "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"
            : "bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

