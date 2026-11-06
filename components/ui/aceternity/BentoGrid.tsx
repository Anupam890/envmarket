"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[19rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-md transition duration-200 shadow-2xs p-5 bg-white border border-slate-200 justify-between flex flex-col space-y-4 relative overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
    >
      {header && <div className="w-full flex-1 min-h-[6rem]">{header}</div>}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="flex items-center justify-between mb-2">
          {icon && <div className="text-blue-600">{icon}</div>}
          {badge}
        </div>
        <div className="font-bold text-slate-900 mb-1.5 text-base">
          {title}
        </div>
        <div className="font-normal text-slate-600 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

