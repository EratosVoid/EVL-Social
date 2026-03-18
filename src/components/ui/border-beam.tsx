"use client";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  delay?: number;
}

export function BorderBeam({
  className,
  duration = 8,
  colorFrom = "#4ade80",
  colorTo = "transparent",
  borderWidth = 1.5,
  delay = 0,
}: BorderBeamProps) {
  const animId = `beam-${Math.random().toString(36).slice(2)}`;
  const css = `
    @property --${animId}-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes ${animId} {
      from { --${animId}-angle: 0deg; }
      to   { --${animId}-angle: 360deg; }
    }
    .${animId} {
      animation: ${animId} ${duration}s linear ${-delay}s infinite;
      background: conic-gradient(from var(--${animId}-angle), transparent 0%, transparent 75%, ${colorFrom} 85%, transparent 95%);
    }
  `;
  return (
    <>
      <style>{css}</style>
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", animId, className)}
        style={{
          padding: `${borderWidth}px`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </>
  );
}
