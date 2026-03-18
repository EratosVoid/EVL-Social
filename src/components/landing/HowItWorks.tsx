"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Attend",
    body: "Show up to an EVL event. Open to anyone, paid entry, no prerequisites.",
  },
  {
    number: "02",
    title: "Get vetted",
    body: "If the room is right for you, a member refers you to the inner circle. Existing members review and vote. That's how the room stays worth being in.",
  },
  {
    number: "03",
    title: "Belong",
    body: "Full community access, private dinners, and the founders worth knowing in Mangalore. Then across India.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            Simple
          </p>
          <h2
            className="font-bold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            Three steps. No ambiguity.
          </h2>
        </motion.div>

        <div className="relative grid gap-12 sm:grid-cols-3 sm:gap-8">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[2.2rem] hidden h-px sm:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(74,222,128,0.12) 25%, rgba(74,222,128,0.12) 75%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.11 }}
            >
              {/* Giant ghost number */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-4 -left-2 select-none font-bold leading-none"
                style={{
                  fontSize: "clamp(5rem, 12vw, 9rem)",
                  color: "rgba(74,222,128,0.045)",
                  fontFamily: "var(--font-syne)",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>

              {/* Step circle */}
              <div className="relative mb-8 flex h-[46px] w-[46px] items-center justify-center rounded-full text-sm font-bold text-accent"
                style={{
                  border: "1px solid rgba(74,222,128,0.28)",
                  background: "rgba(74,222,128,0.07)",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                {step.number}
              </div>

              <h3 className="mb-2.5 text-[18px] font-bold text-foreground tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
