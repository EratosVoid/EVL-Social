"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "start 0.25"],
  });
  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative", className)}>
      <div className="flex flex-wrap gap-x-[0.25em] gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#3f3f46", "#fafafa"]);
  return (
    <motion.span style={{ opacity, color }}>
      {children}
    </motion.span>
  );
}
