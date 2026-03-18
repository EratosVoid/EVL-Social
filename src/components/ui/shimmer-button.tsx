"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#4ade80",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(74, 222, 128, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  const shimmerStyle = `
    @keyframes shimmer-slide {
      to { transform: translate(calc(100cqw - 100%), 0); }
    }
    @keyframes spin-around {
      0%   { transform: translateZ(0) rotate(0); }
      15%, 35% { transform: translateZ(0) rotate(90deg); }
      65%, 85% { transform: translateZ(0) rotate(270deg); }
      100% { transform: translateZ(0) rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{shimmerStyle}</style>
      <button
        {...props}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
            ...props.style,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-2 text-background [background:var(--bg)] [border-radius:var(--radius)] font-semibold text-sm",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
      >
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          <div className="absolute inset-0 h-full w-full animate-[shimmer-slide_var(--speed)_linear_infinite] [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-[spin-around_calc(var(--speed)*2)_linear_infinite] absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}
        <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
      </button>
    </>
  );
}
