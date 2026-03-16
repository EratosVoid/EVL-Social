"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          EVL Startup
          <br />
          Social
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-lg text-lg text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Where Mangalore&apos;s founders and builders come together.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            href="/register"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black transition-all hover:bg-white/90"
          >
            Sign Up
          </Link>
          <a
            href="#about"
            className="rounded-full border border-white/10 px-8 py-3.5 text-base font-semibold text-white/60 transition-all hover:border-white/25 hover:text-white/80"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
