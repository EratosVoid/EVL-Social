"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ─── Add your partners here ───────────────────────────────────────────────────
// logo: path relative to /public  (e.g. "/logos/acme.svg")
// name: shown as alt text and as fallback if no logo yet
const partners: { name: string; logo: string | null }[] = [
  { name: "Partner One",   logo: null },
  { name: "Partner Two",   logo: null },
  { name: "Partner Three", logo: null },
  { name: "Partner Four",  logo: null },
  { name: "Partner Five",  logo: null },
  { name: "Partner Six",   logo: null },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Partners() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            Partners
          </p>
          <h2
            className="font-bold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Who backs the mission.
          </h2>
        </motion.div>

        {/* Grid with faded-line effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          {/* The grid mask — fades lines outward from centre */}
          <div
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
            }}
          >
            {/* Background grid lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), " +
                  "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "calc(100% / 3) calc(100% / 2)",
              }}
            />

            {/* Logo cells */}
            <div className="grid grid-cols-3 grid-rows-2">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  className="group flex items-center justify-center px-8 py-12"
                  style={{
                    borderRight:
                      (i + 1) % 3 !== 0
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    borderBottom:
                      i < 3
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    /* Placeholder — remove once logos are added */
                    <div
                      className="flex h-10 w-32 items-center justify-center rounded-lg"
                      style={{
                        border: "1px dashed rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span className="text-[11px] text-subtle">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
