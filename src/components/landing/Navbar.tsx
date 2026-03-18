"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Events", href: "#venue" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#why" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (scrolled && menuOpen) setMenuOpen(false);
  }, [scrolled, menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(9,9,11,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.5)" : "none",
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-accent"
              style={{ boxShadow: "0 0 14px rgba(74,222,128,0.35)" }}
            >
              <span
                className="text-[9px] font-black tracking-widest text-background"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                EVL
              </span>
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-foreground/70 transition-colors group-hover:text-foreground">
              Startup Social
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/admin/login"
              className="text-[13px] text-muted transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-accent px-4 py-1.5 text-[13px] font-semibold text-background transition-all hover:bg-accent-dim"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(74,222,128,0.5), 0 4px 20px rgba(74,222,128,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.15)";
              }}
            >
              Apply to join
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground md:hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="flex h-4 w-4 flex-col justify-between"
            >
              <motion.span
                className="block h-px w-full rounded-full bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-full rounded-full bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-full rounded-full bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 },
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[60px] z-40 px-5 pb-6 pt-3 md:hidden"
            style={{
              background: "rgba(9,9,11,0.95)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div
              className="mt-4 flex flex-col gap-2 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-background"
              >
                Apply to join
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
