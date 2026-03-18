"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="flex h-[60px] w-[60px] items-center justify-center rounded-xl text-2xl font-bold tabular-nums text-foreground"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          fontFamily: "var(--font-space-mono)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        className="text-[10px] uppercase tracking-[0.15em] text-muted"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CTA() {
  const event = useQuery(api.events.getActiveEvent);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!event?.date) return;
    const target = new Date(event.date).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event?.date]);

  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* Section-level ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(74,222,128,0.07) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-12 text-center"
        style={{
          border: "1px solid rgba(74,222,128,0.18)",
          background:
            "radial-gradient(ellipse 140% 90% at 50% 110%, rgba(74,222,128,0.1) 0%, transparent 55%), #111113",
          boxShadow:
            "0 0 0 1px rgba(74,222,128,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(74,222,128,0.06)",
        }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Border beam */}
        <BorderBeam duration={10} colorFrom="#4ade80" colorTo="transparent" borderWidth={1.5} />

        {/* Top line glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(74,222,128,0.55), transparent)",
          }}
        />

        {/* Bottom glow orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full"
          style={{
            background: "rgba(74,222,128,0.12)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            The standard matters
          </p>
          <h2
            className="font-bold tracking-[-0.035em] text-foreground"
            style={{ fontSize: "clamp(1.875rem, 5vw, 2.875rem)" }}
          >
            Not everyone gets in.
            <br />
            <span className="text-muted">That&apos;s the point.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            EVL&apos;s inner circle is built by referral and community vote. The
            bar exists because the value depends on it. If you&apos;re building
            something real and you&apos;re ready to be in the right room,
            apply.
          </p>

          {event?.date && (
            <div className="mt-10 flex justify-center gap-4">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Mins" />
              <CountdownUnit value={timeLeft.seconds} label="Secs" />
            </div>
          )}

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link href="/register">
              <ShimmerButton
                shimmerColor="#09090b"
                background="rgba(74, 222, 128, 1)"
                borderRadius="100px"
                shimmerDuration="3s"
                className="h-12 px-9 text-sm font-semibold text-background"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(74,222,128,0.45), 0 4px 36px rgba(74,222,128,0.3)",
                }}
              >
                Apply to join
              </ShimmerButton>
            </Link>
            <p className="text-xs text-muted">
              Events are open. The community is earned. Both are worth your
              time.
            </p>
          </div>

          <p
            className="mt-7 text-[11px] text-subtle"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "1.25rem",
            }}
          >
            Membership reviewed on a rolling basis &middot; Applications from
            the current cohort close when the next event fills
          </p>
        </div>
      </motion.div>
    </section>
  );
}
