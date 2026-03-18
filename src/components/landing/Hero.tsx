"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* Primary ambient glow — top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% -8%, rgba(74,222,128,0.2) 0%, transparent 62%)",
        }}
      />

      {/* Secondary orb — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[600px] w-[600px] translate-y-1/4"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Tertiary orb — right side */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.018,
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide"
          style={{
            borderColor: "rgba(74,222,128,0.22)",
            background: "rgba(74,222,128,0.055)",
            color: "#4ade80",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "#4ade80",
              boxShadow: "0 0 6px rgba(74,222,128,1), 0 0 14px rgba(74,222,128,0.5)",
            }}
          />
          <AnimatedShinyText className="text-accent text-xs font-medium tracking-wide">
            Mangalore &rarr; India
          </AnimatedShinyText>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-bold leading-[0.88] tracking-[-0.045em] text-foreground"
          style={{ fontSize: "clamp(3.5rem, 11.5vw, 7.5rem)" }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          You&apos;ve been in
          <br />
          the{" "}
          <span
            style={{
              color: "#4ade80",
              textShadow: "0 0 40px rgba(74,222,128,0.35)",
            }}
          >
            wrong rooms.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-8 max-w-[500px] text-base leading-relaxed text-muted"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          EVL is a founder community for operators and builders in Mangalore.
          Events are open. The inner circle is earned by referral.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
        >
          <Link
            href="/register"
            className="inline-flex h-11 items-center rounded-full bg-accent px-8 text-sm font-semibold text-background transition-all hover:bg-accent-dim"
            style={{
              boxShadow:
                "0 0 0 1px rgba(74,222,128,0.4), 0 4px 28px rgba(74,222,128,0.22)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(74,222,128,0.6), 0 6px 36px rgba(74,222,128,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(74,222,128,0.4), 0 4px 28px rgba(74,222,128,0.22)";
            }}
          >
            Apply to join
          </Link>
          <a
            href="#why"
            className="inline-flex h-11 items-center rounded-full border px-8 text-sm text-muted transition-all hover:text-foreground"
            style={{
              borderColor: "rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.025)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.09)";
            }}
          >
            Why this exists
          </a>
        </motion.div>

        {/* Proof line */}
        <motion.p
          className="mt-5 text-xs tracking-wide text-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.72 }}
        >
          3 events &middot; 200+ founders &middot; Growing by referral only
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { value: <><NumberTicker value={3} /></>, label: "Events done" },
            { value: <><NumberTicker value={200} />+</>, label: "Founders" },
            { value: "Referral", label: "Only growth" },
          ].map((stat, i) => (
            <div key={i} className="relative flex flex-col items-center px-10 sm:px-14">
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 h-8 w-px -translate-y-1/2"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
              )}
              <div
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div
          className="flex h-9 w-5 items-start justify-center rounded-full border pt-2"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="h-1.5 w-0.5 rounded-full bg-muted"
            animate={{ y: [0, 4, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
