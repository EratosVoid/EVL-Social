"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
// inline wrap — avoids uncertain export from "motion" package
const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  children: React.ReactNode;
  className?: string;
  defaultVelocity?: number;
}

function ParallaxText({
  children,
  baseVelocity = 5,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        className={cn("flex whitespace-nowrap", className)}
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mr-4 block">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  children,
  className,
  defaultVelocity = 5,
}: VelocityScrollProps) {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <ParallaxText baseVelocity={defaultVelocity}>{children}</ParallaxText>
    </section>
  );
}
