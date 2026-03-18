"use client";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  const css = `
    @keyframes shiny-text {
      0%, 90%, 100% { background-position: calc(-100% - var(--shimmer-width)) center; }
      30%, 60%      { background-position: calc(100% + var(--shimmer-width)) center; }
    }
  `;
  return (
    <>
      <style>{css}</style>
      <span
        style={{
          backgroundImage: `linear-gradient(110deg, currentColor 25%, rgba(74,222,128,1) 50%, currentColor 75%)`,
          backgroundSize: `${shimmerWidth}px 100%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(-100% - var(--shimmer-width)) center",
        } as React.CSSProperties}
        className={cn(
          "bg-clip-text text-transparent",
          "[animation:shiny-text_8s_ease-in-out_infinite]",
          className
        )}
      >
        {children}
      </span>
    </>
  );
}
