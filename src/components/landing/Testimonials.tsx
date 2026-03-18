"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I've been to every startup event in Mangalore. EVL is the first one where I left thinking about the conversations instead of the keynote.",
    name: "Aditya Kamath",
    role: "Founder",
    company: "Buildstack",
    initial: "A",
  },
  {
    quote:
      "I found my CTO at an EVL dinner. We'd been 20 minutes into a conversation about distribution before either of us mentioned we were looking.",
    name: "Shreya Nambiar",
    role: "CEO",
    company: "Loopform",
    initial: "S",
  },
  {
    quote:
      "I've seen 'exclusive founder communities' before. They're usually just expensive LinkedIn. EVL is the first one where the curation is actually real.",
    name: "Rahul D'Souza",
    role: "Operator",
    company: "Coastal Labs",
    initial: "R",
  },
  {
    quote:
      "I came expecting to pitch. I spent most of the night listening. Nobody at EVL is performing. People actually say what's not working.",
    name: "Priya Shetty",
    role: "Founder",
    company: "Vernova",
    initial: "P",
  },
  {
    quote:
      "EVL is what the Mangalore ecosystem has needed for a long time. It's early. The founders who show up now are the ones who'll matter later.",
    name: "Vikram Alva",
    role: "Angel & Former Founder",
    company: "",
    initial: "V",
  },
];

export default function Testimonials() {
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
            From the community
          </p>
          <h2
            className="font-bold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            We&apos;ll let them say it.
          </h2>
        </motion.div>

        {/* Top row — 3 cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.08} />
          ))}
        </div>

        {/* Bottom row — 2 cards, centered */}
        <div className="mt-3 grid gap-3 sm:mx-auto sm:max-w-[66.67%] sm:grid-cols-2">
          {testimonials.slice(3).map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
  delay,
}: {
  t: (typeof testimonials)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className="group flex h-full flex-col justify-between rounded-2xl p-7 transition-all duration-300"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background: "var(--color-surface)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        }}
      >
        <div className="relative">
          {/* Large ghost opening quote */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-3 -left-1 select-none leading-none"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "5rem",
              color: "rgba(74,222,128,0.18)",
              lineHeight: 1,
            }}
          >
            &ldquo;
          </div>
          <p className="relative z-10 pt-7 text-[14px] leading-relaxed text-foreground/85">
            {t.quote}
          </p>
        </div>
        <div
          className="mt-6 flex items-center gap-3 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-accent"
            style={{
              background: "rgba(74,222,128,0.1)",
              fontFamily: "var(--font-syne)",
            }}
          >
            {t.initial}
          </div>
          <div>
            <div className="text-[13px] font-semibold text-foreground">
              {t.name}
            </div>
            <div className="text-[12px] text-muted">
              {t.role}
              {t.company ? ` · ${t.company}` : ""}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
