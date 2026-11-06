"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
}

export function CardSpotlight({
  children,
  radius = 280,
  color = "#2563eb",
  className,
  ...props
}: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-2xs hover:shadow-md",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}12, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

