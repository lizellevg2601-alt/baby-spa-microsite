"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: "sensory" | "massage" | "movement" | "studio" | "baby";
}

export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className,
  fallback = "studio",
}: ImagePlaceholderProps) {
  const gradients: Record<string, string> = {
    sensory: "from-mint-100 via-sage-50 to-blush-50",
    massage: "from-blush-50 via-sage-50 to-mint-100",
    movement: "from-sage-50 via-mint-100 to-blush-50",
    studio: "from-cream via-sage-50 to-ivory",
    baby: "from-mint-50 via-blush-50 to-sage-50",
  };

  const icons: Record<string, string> = {
    sensory: "🌈",
    massage: "💕",
    movement: "🤸",
    studio: "🏠",
    baby: "👶",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sage-200 bg-sage-50 text-sage-400",
        className,
      )}
      style={{
        width,
        height,
        backgroundImage: `linear-gradient(135deg, ${gradients[fallback]})`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("rounded-lg object-cover", className)}
          priority
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <span className="text-4xl mb-2">{icons[fallback]}</span>
          <p className="text-sm font-medium text-sage-600 uppercase tracking-wider">
            Image coming soon
          </p>
        </div>
      )}
    </div>
  );
}
