import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg cursor-pointer text-sm select-none";

    const variantStyles = {
      default:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-xs active:bg-blue-800",
      secondary:
        "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 border border-blue-200",
      outline:
        "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 shadow-xs",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
      link:
        "text-blue-600 underline-offset-4 hover:underline p-0 h-auto font-medium",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:bg-rose-800",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-11 px-6 text-base font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

