"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "People who've done the thing",
    body: "Every EVL member is actively running or has run a company. You won't spend 20 minutes figuring out if someone is worth talking to.",
    tag: "Community",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Real conversations, not panel content",
    body: "EVL events are structured dinners and small-group conversations, not talks-and-networking. You leave knowing 3 people properly, not having handed out 30 cards.",
    tag: "Format",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Find someone who can actually build with you",
    body: "The best co-founder relationships start in the right room. EVL puts you next to founders at your stage, with complementary skills and matching standards.",
    tag: "Co-founders",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Be here before it's obvious",
    body: "The founders who join EVL now are building the network before it has a name. Get in early or watch it happen from the outside.",
    tag: "Timing",
  },
];

export default function Highlights() {
  return (
    <section id="community" className="bg-surface px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            What you get
          </p>
          <h2
            className="font-bold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            The room your company actually needs.
          </h2>
          <p className="mt-3 text-[15px] text-muted">
            Founders, operators, and builders in Mangalore who are worth knowing.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "var(--color-background)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.18)";
                (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.025)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.background = "var(--color-background)";
              }}
            >
              {/* Ambient glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 40% at 0% 100%, rgba(74,222,128,0.06) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Icon + tag row */}
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-300 group-hover:text-accent"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-subtle transition-colors duration-300 group-hover:text-muted"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-foreground leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {feature.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
