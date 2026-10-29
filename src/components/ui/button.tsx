"use client";

import * as React from "react";
import { isValidElement } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "forest" | "blush" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "forest", size = "default", asChild = false, loading = false, children, ...props }, ref) => {
    const variants = {
      forest: "bg-forest-green text-white hover:bg-forest-green-dark transition-colors",
      blush: "bg-soft-blush text-charcoal-900 hover:bg-rose-pink-dark hover:text-white transition-colors",
      outline: "border border-forest-green/30 bg-transparent text-forest-green hover:bg-forest-green/5 transition-colors",
      ghost: "hover:bg-pale-sage text-forest-green transition-colors",
      link: "text-forest-green underline-offset-4 hover:underline",
    };
    const sizes = {
      default: "h-11 px-6 py-3",
      sm: "h-9 px-4",
      lg: "h-12 px-8",
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-full font-body font-semibold transition-all disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className,
    );

    if (asChild && isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(
          (children.props as { className?: string })?.className,
          baseClasses,
        ),
        ...(loading ? { disabled: true } : {}),
      });
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={loading}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
