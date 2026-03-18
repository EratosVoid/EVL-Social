"use client";

import Image from "next/image";
import React from "react";

const marqueeStyle = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track {
    animation: marquee 40s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

// ─── Attendee companies ───────────────────────────────────────────────────────
// logo: path in /public — null shows the name as text instead
const companies: {
  name: string;
  logo: string | null;
  filter?: string;
  blendMode?: React.CSSProperties["mixBlendMode"];
}[] = [
  {
    name: "LightAutoAI",
    logo: "/logos/lightautoai.svg",
    filter: "none",
  },
  {
    name: "DevLayer",
    logo: "/logos/logo__1___1_-removebg-preview.png",
    filter: "grayscale(100%) invert(1) brightness(1.4)",
  },
  {
    name: "Singularity",
    logo: "/logos/Singularity.svg",
    filter: "invert(1)",
    blendMode: "screen" as const,
  },
  {
    name: "Oriv",
    logo: "/logos/oriv_logo_b.svg",
    filter: "grayscale(100%) invert(1) brightness(1.3)",
  },
  {
    name: "Evlogia",
    logo: "/logos/evlogia logomark (black).png",
    filter: "invert(1)",
    blendMode: "screen" as const,
  },
  {
    name: "Creator Insights",
    logo: "/logos/creatorinsights.webp",
    filter: "grayscale(100%) invert(1) brightness(1.3)",
    blendMode: "screen" as const,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const track = [...companies, ...companies]; // duplicate for seamless loop

function Dot() {
  return (
    <span
      className="mx-6 inline-block h-1 w-1 shrink-0 rounded-full bg-subtle"
      aria-hidden
    />
  );
}

export default function CompanyMarquee() {
  return (
    <>
      <style>{marqueeStyle}</style>
      <section
        className="relative overflow-hidden border-y py-6"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        {/* Label */}
        <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-subtle">
          Founders from
        </p>

        <div className="relative">
          {/* Left fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
            style={{
              background:
                "linear-gradient(to right, var(--color-background), transparent)",
            }}
          />
          {/* Right fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
            style={{
              background:
                "linear-gradient(to left, var(--color-background), transparent)",
            }}
          />

          {/* Scrolling track */}
          <div className="marquee-track flex w-max items-center">
            {track.map((company, i) => (
              <span key={i} className="inline-flex items-center">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={160}
                    height={56}
                    className="h-10 w-28 object-contain"
                    style={{
                      filter: company.filter ?? "grayscale(100%)",
                      opacity: 0.55,
                      mixBlendMode: company.blendMode,
                    }}
                  />
                ) : (
                  <span className="whitespace-nowrap text-[13px] font-medium text-muted">
                    {company.name}
                  </span>
                )}
                <Dot />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
