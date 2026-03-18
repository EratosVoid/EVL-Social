"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const details = [
  {
    label: "Format",
    value: "Founder dinners & small-group conversations",
  },
  {
    label: "Size",
    value: "Intentionally small. Never a crowd.",
  },
  {
    label: "Vibe",
    value: "No decks. No pitches. No performance.",
  },
  {
    label: "Location",
    value: "Mangalore, expanding across India",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-surface px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-accent">
              What it feels like
            </p>
            <h2
              className="font-bold leading-[1.08] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
            >
              A dinner, not an event.
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                Picture a table of 12 founders. No agenda except honest
                conversation. Someone&apos;s working through a go-to-market
                problem they&apos;ve been stuck on for a month. Someone else
                solved it last year. And says so, plainly.
              </p>
              <p>
                That&apos;s an EVL dinner.
              </p>
              <p>
                No speakers. No slides. No one checking their phone to seem
                busy. Just founders talking like people who respect each
                other&apos;s time and intelligence.
              </p>
              <p>
                We&apos;ve had these conversations in Mangalore. About
                fundraising without a Bangalore network. About hiring when
                no one&apos;s heard of your company yet. About building a
                real business in a city that&apos;s still figuring out
                it&apos;s possible.
              </p>
              <p className="font-medium text-foreground/80">
                The follow-through from EVL dinners is higher than any other
                event in Mangalore. Small rooms with real stakes do that.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex h-10 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-dim"
              >
                See the next event
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right — detail tiles */}
          <motion.div
            className="grid grid-cols-2 gap-3 content-start"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                className="rounded-xl p-5 transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "var(--color-background)",
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent/60">
                  {d.label}
                </p>
                <p className="text-[13px] font-medium leading-snug text-foreground">
                  {d.value}
                </p>
              </motion.div>
            ))}

            {/* Quote tile — spans full width */}
            <motion.div
              className="col-span-2 rounded-xl p-6"
              style={{
                border: "1px solid rgba(74,222,128,0.14)",
                background:
                  "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(74,222,128,0.055) 0%, transparent 60%), var(--color-background)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <div
                className="mb-3 leading-none"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "2.5rem",
                  color: "rgba(74,222,128,0.4)",
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </div>
              <p className="text-[14px] leading-relaxed text-foreground/80">
                One good dinner with the right people takes 3 hours and can
                change a year.
              </p>
              <p className="mt-3 text-[12px] text-muted">EVL principle</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
