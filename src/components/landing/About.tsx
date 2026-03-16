"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "For Founders",
    description:
      "Whether you're just starting out or scaling up — come meet people who get the journey.",
  },
  {
    title: "For Builders",
    description:
      "Developers, designers, creators — find your next co-founder or collaborator.",
  },
  {
    title: "For the Ecosystem",
    description:
      "Growing Mangalore's startup community, one social at a time.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            A space for the people
            <br />
            building the future.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/40">
            The Startup Social is a relaxed evening for Mangalore&apos;s tech
            and startup crowd — share ideas, meet interesting people, and push
            the ecosystem forward.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-background p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-white/40">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
