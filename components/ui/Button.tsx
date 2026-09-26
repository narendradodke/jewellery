"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "goldOutline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium uppercase tracking-wider text-xs transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-400 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gold-gradient text-black font-semibold hover:shadow-gold-md hover:brightness-110 active:scale-[0.99] border border-gold-300/30",
      secondary:
        "bg-card hover:bg-card-hover text-white border border-luxury-border hover:border-gold-500/40",
      goldOutline:
        "bg-transparent text-gold-300 border border-gold-500/60 hover:bg-gold-500/10 hover:text-gold-200 hover:border-gold-400 hover:shadow-gold-sm",
      outline:
        "bg-transparent text-white/90 border border-white/20 hover:border-white/60 hover:text-white",
      ghost:
        "bg-transparent text-white/80 hover:text-gold-300 hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-[11px]",
      md: "h-11 px-6 text-xs",
      lg: "h-13 px-8 text-sm tracking-widest",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
