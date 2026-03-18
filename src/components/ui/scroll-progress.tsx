"use client";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(to right, #4ade80, #22c55e)",
      }}
      className="fixed left-0 top-0 z-[9999] h-[2px] w-full"
    />
  );
}
