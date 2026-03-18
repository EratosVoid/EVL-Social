"use client";

import Link from "next/link";

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

const navLinks = [
  { label: "Events", href: "#venue" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#why" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden px-6 py-14"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full"
        style={{
          background: "rgba(74,222,128,0.04)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-accent"
                style={{ boxShadow: "0 0 10px rgba(74,222,128,0.28)" }}
              >
                <span
                  className="text-[9px] font-black tracking-widest text-background"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  EVL
                </span>
              </div>
              <span className="text-[13px] font-semibold text-foreground/60 transition-colors group-hover:text-foreground/80">
                Startup Social
              </span>
            </Link>
            <p className="mt-3 text-[12px] leading-relaxed text-subtle">
              Built in Mangalore.
              <br />
              Built for founders.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Link
              href="/register"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-dim"
            >
              Apply to join
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-start justify-between gap-2 pt-7 sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-[11px] text-subtle">
            &copy; {new Date().getFullYear()} EVL Startup Social &middot;
            Mangalore, Karnataka
          </span>
          <span className="text-[11px] text-subtle">Built with intention</span>
        </div>
      </div>
    </footer>
  );
}
