"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BoutiqueImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function BoutiqueImage({
  src,
  webpSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: BoutiqueImageProps) {
  const baseClasses = cn(
    "block object-cover",
    priority ? "" : "opacity-0 transition-opacity duration-500",
    fill ? "absolute inset-0 w-full h-full" : "",
    className,
  );

  if (webpSrc) {
    return (
      <picture>
        <source
          srcSet={webpSrc}
          type="image/webp"
          width={width}
          height={height}
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={baseClasses}
          priority={priority}
          fill={fill}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={baseClasses}
      priority={priority}
      fill={fill}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

interface ImageFrameProps {
  children: React.ReactNode;
  className?: string;
  aspect?: "4-3" | "3-2" | "16-9" | "square" | "portrait";
  variant?: "sage" | "blush" | "none";
}

export function ImageFrame({
  children,
  className,
  aspect = "4-3",
  variant = "none",
}: ImageFrameProps) {
  const aspects = {
    "4-3": "aspect-[4/3]",
    "3-2": "aspect-[3/2]",
    "16-9": "aspect-[16/9]",
    square: "aspect-[1/1]",
    portrait: "aspect-[3/4]",
  };
  const variants = {
    sage: "border border-sage-200 shadow-sm",
    blush: "border border-blush-200 shadow-sm",
    none: "border border-pale-sage/50",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        aspects[aspect],
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
