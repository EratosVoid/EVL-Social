"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";

const pillars = [
  {
    index: "01",
    title: "Curated, not crowded",
    body: "Every person at an EVL event is actively building a company, running one, or has. We cap attendance so the room stays worth being in.",
  },
  {
    index: "02",
    title: "Earned, not claimed",
    body: "A member vouches for you. The community votes. That referral chain is what keeps the room worth being in.",
  },
  {
    index: "03",
    title: "Local-first, not limited",
    body: "We started in Mangalore because no one else did. We're building the ecosystem Coastal Karnataka deserves. Then India.",
  },
];

export default function About() {
  return (
    <section id="why" className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            The problem
          </p>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            Most founder communities
            <br />
            are barter systems dressed up
            <br />
            <span className="text-muted">as movements.</span>
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted">
            <TextReveal className="text-[15px] leading-relaxed">
              {"You've been to the events. You've done the rounds. You've collected cards from people you'll never talk to again, sat through pitches nobody asked for, and had let's grab coffee conversations that went nowhere."}
            </TextReveal>
            <TextReveal className="text-[15px] leading-relaxed">
              {"It's the format. 300 people in a room isn't a community, it's a crowd. You can't have a real conversation at scale."}
            </TextReveal>
            <TextReveal className="text-[15px] leading-relaxed font-medium text-foreground/80">
              {"EVL is built on a different assumption: the value of a room is determined entirely by who's in it."}
            </TextReveal>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.18)";
                (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
              }}
            >
              {/* Accent left border */}
              <div
                className="absolute left-0 top-8 h-8 w-[2px] rounded-full bg-accent transition-all duration-300 group-hover:h-12"
                style={{ boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
              />

              {/* Index number */}
              <div
                className="pointer-events-none absolute right-6 top-5 select-none text-[3.5rem] font-bold leading-none"
                style={{
                  color: "rgba(255,255,255,0.025)",
                  fontFamily: "var(--font-syne)",
                }}
              >
                {pillar.index}
              </div>

              <h3 className="mt-2 text-[15px] font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
