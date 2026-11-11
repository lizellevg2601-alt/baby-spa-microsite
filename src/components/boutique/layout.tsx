"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: "ivory" | "white" | "sage" | "blush";
}

export function SectionWrapper({
  children,
  className,
  bg = "ivory",
}: SectionWrapperProps) {
  const bgClasses = {
    ivory: "bg-warm-ivory",
    white: "bg-white",
    sage: "bg-pale-sage",
    blush: "bg-blush-50",
  };

  return (
    <section className={cn("relative", bgClasses[bg], className)}>
      {children}
    </section>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "5xl" | "6xl" | "7xl" | "full";
}

export function Container({
  children,
  className,
  maxWidth = "5xl",
}: ContainerProps) {
  const widths = {
    "5xl": "max-w-5xl mx-auto",
    "6xl": "max-w-6xl mx-auto",
    "7xl": "max-w-7xl mx-auto",
    full: "",
  };

  return (
    <div className={cn("px-4 sm:px-6 lg:px-8", widths[maxWidth], className)}>
      {children}
    </div>
  );
}

interface SerifHeadingProps {
  children: React.ReactNode;
  size?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "400" | "600" | "700";
  align?: "left" | "center";
  color?: "forest" | "charcoal" | "sage";
  className?: string;
}

export function SerifHeading({
  children,
  size = "3xl",
  weight = "600",
  align = "center",
  color = "forest",
  className,
}: SerifHeadingProps) {
  // Clamp-based responsive typography: desktop 64–76px hero, 42–56px section, etc.
  const sizes = {
    "2xl": "clamp(1.5rem, 3vw, 2rem)",       // 24–32px
    "3xl": "clamp(1.75rem, 3.5vw, 2.5rem)",   // 28–40px
    "4xl": "clamp(2rem, 4vw, 3rem)",          // 32–48px
    "5xl": "clamp(2.5rem, 5vw, 3.75rem)",     // 40–60px
    "6xl": "clamp(2.5rem, 6vw, 3.75rem)",      // 40–60px
  };
  const colors = {
    forest: "text-forest-green",
    charcoal: "text-charcoal-900",
    sage: "text-sage-700",
  };

  return (
    <h2
      className={cn(
        "font-serif",
        `font-${weight}`,
        `text-${align}`,
        colors[color],
        "leading-tight mb-6",
        className,
      )}
      style={{ fontSize: sizes[size] }}
    >
      {children}
    </h2>
  );
}

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-100 text-forest-green text-xs font-body font-semibold uppercase tracking-widest leading-none", className)}>
      <span className="relative -top-[1px] h-1 w-1 rounded-full bg-rose-pink"></span>
      {children}
    </div>
  );
}

interface SerifTextProps {
  children: React.ReactNode;
  size?: "base" | "lg" | "xl";
  align?: "left" | "center";
  color?: "sage" | "charcoal" | "forest";
  className?: string;
}

export function SerifText({
  children,
  size = "base",
  align = "left",
  color = "sage",
  className,
}: SerifTextProps) {
  const sizes = {
    base: "clamp(0.875rem, 1.5vw, 1rem)",    // 14–16px
    lg: "clamp(1rem, 2vw, 1.25rem)",         // 16–20px
    xl: "clamp(1.125rem, 2.5vw, 1.5rem)",    // 18–24px
  };
  const colors = {
    sage: "text-sage-600",
    charcoal: "text-charcoal-900",
    forest: "text-forest-green",
  };

  return (
    <p
      className={cn(
        "font-serif",
        sizes[size],
        `text-${align}`,
        colors[color],
        "leading-7 mb-4",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface HeartIconProps {
  className?: string;
  color?: "rose" | "sage" | "forest";
  size?: number;
}

export function HeartIcon({
  className,
  color = "rose",
  size = 20,
}: HeartIconProps) {
  const colors = {
    rose: "text-rose-pink",
    sage: "text-sage-700",
    forest: "text-forest-green",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(colors[color], className)}
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}

interface FeaturePillProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "sage" | "blush";
}

export function FeaturePill({
  icon,
  title,
  description,
  variant = "sage",
}: FeaturePillProps) {
  const bg = variant === "blush" ? "bg-blush-100" : "bg-sage-100";
  const iconColor = variant === "blush" ? "text-rose-pink" : "text-sage-700";

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-pale-sage bg-white hover:border-forest-green/20 transition-all">
      <div className={cn("flex items-center justify-center rounded-full p-2", bg, iconColor)}>
        {icon}
      </div>
      <h4 className="font-serif font-semibold text-forest-green text-sm leading-none">{title}</h4>
      <p className="text-xs text-sage-600 leading-5 text-center">{description}</p>
    </div>
  );
}
