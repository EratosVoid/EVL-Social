"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-white/30">
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
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [event?.date]);

  return (
    <section className="px-6 py-32">
      <motion.div
        className="mx-auto max-w-3xl rounded-3xl border border-white/5 bg-white/[0.02] p-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Don&apos;t miss this one
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-white/40">
          Spots fill up fast. Sign up now and bring your founder friends along.
        </p>

        {event?.date && (
          <div className="mt-10 flex justify-center gap-6 sm:gap-10">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/register"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-semibold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
