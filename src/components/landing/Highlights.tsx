"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Founder Stories",
    description:
      "Real talk from founders who've built products out of Mangalore and beyond.",
  },
  {
    title: "Networking",
    description:
      "Structured + unstructured time to make real connections.",
  },
  {
    title: "Startup Showcase",
    description:
      "See what's being built in the local ecosystem. Demo your own product.",
  },
  {
    title: "Good Vibes",
    description:
      "No hard pitches. Just founders, food, and honest conversations.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Highlights() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white sm:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          What to expect
        </motion.h2>

        <motion.div
          className="mt-20 grid gap-8 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {highlights.map((h) => (
            <motion.div
              key={h.title}
              variants={item}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-white/10"
            >
              <h3 className="text-lg font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-sm text-white/40">{h.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
