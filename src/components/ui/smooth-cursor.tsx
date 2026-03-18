"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function SmoothCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const isTouchDevice = useRef(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice.current);
    if (isTouchDevice.current) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
        )
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Main dot */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: hovering
            ? "rgba(74,222,128,0.9)"
            : "rgba(250,250,250,0.9)",
          boxShadow: hovering
            ? "0 0 12px rgba(74,222,128,0.6)"
            : "0 0 8px rgba(250,250,250,0.3)",
        }}
        animate={{
          scale: clicking ? 0.85 : hovering ? 1.5 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full"
      />
      {/* Trailing ring */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          border: hovering
            ? "1.5px solid rgba(74,222,128,0.4)"
            : "1.5px solid rgba(250,250,250,0.2)",
        }}
        animate={{
          scale: clicking ? 0.9 : hovering ? 1.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", damping: 30, stiffness: 150 },
          opacity: { duration: 0.2 },
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full"
      />
    </>
  );
}
