"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

interface HyperTextProps {
  children: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

export function HyperText({
  children,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(() => children.split(""));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    if (!animateOnLoad && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!trigger && !animateOnLoad) return;

    const interval = setInterval(() => {
      if (iterations.current < children.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= iterations.current
                ? children[i]
                : alphabets[getRandomInt(26)]
          )
        );
        iterations.current += 0.5;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (children.length * 10));

    return () => clearInterval(interval);
  }, [trigger, children, duration, animateOnLoad]);

  return (
    <span
      className="inline-flex overflow-hidden cursor-default"
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(
              letter === " " ? "w-3" : "",
              className
            )}
            {...framerProps}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
