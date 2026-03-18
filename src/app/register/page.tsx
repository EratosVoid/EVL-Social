"use client";

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return (
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    " — " +
    d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
}

export default function RegisterPage() {
  const event = useQuery(api.events.getActiveEvent);
  const createRegistration = useMutation(api.registrations.createRegistration);
  const sendEmail = useAction(api.messaging.sendConfirmationEmail);
  const sendWhatsApp = useAction(api.messaging.sendWhatsAppMessage);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Loading
  if (event === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-foreground/10 border-t-accent" />
      </div>
    );
  }

  // No active event
  if (event === null || !event.isActive) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide text-muted"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            No active event
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Registration closed
          </h1>
          <p className="mt-3 text-muted">
            There are no active events right now. Check back soon.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            &larr; Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  const dateDisplay = formatDate(event.date);

  // Success state
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              border: "1px solid rgba(74,222,128,0.3)",
              background: "rgba(74,222,128,0.08)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            You&apos;re in.
          </h1>
          <p className="mt-3 text-muted">
            You&apos;ve registered for{" "}
            <span className="font-medium text-foreground">{event.title}</span>.
          </p>
          <div
            className="mt-6 rounded-xl p-5 text-left"
            style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
              Event details
            </p>
            <p className="mt-3 font-semibold text-foreground">{event.title}</p>
            <p className="mt-1 text-sm text-muted">{dateDisplay}</p>
            <p className="text-sm text-muted">{event.venue}</p>
          </div>
          <p className="mt-5 text-xs text-subtle">
            A confirmation has been sent to your email and WhatsApp.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            &larr; Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await createRegistration({
        eventId: event._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        whatsappNumber: form.phone,
        company: form.company,
        role: form.role,
      });

      sendEmail({
        to: form.email,
        name: form.name,
        eventTitle: event.title,
        eventDate: dateDisplay,
        eventVenue: event.venue,
      }).catch(() => {});

      sendWhatsApp({
        to: form.phone,
        name: form.name,
        eventTitle: event.title,
        eventDate: dateDisplay,
        eventVenue: event.venue,
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border bg-transparent px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none transition-colors";

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-background px-6 py-16"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(74,222,128,0.08) 0%, transparent 60%)",
      }}
    >
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Back
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            {event.title}
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
            Apply to attend
          </h1>
          <p className="mt-2 text-sm text-muted">
            {dateDisplay} &middot; {event.venue}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted">
              Full Name <span className="text-subtle">*</span>
            </label>
            <input
              type="text"
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted">
              Email <span className="text-subtle">*</span>
            </label>
            <input
              type="email"
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted">
              Phone / WhatsApp <span className="text-subtle">*</span>
            </label>
            <input
              type="tel"
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted">
              Company / Startup
            </label>
            <input
              type="text"
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="Your company or startup name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted">
              Your Role
            </label>
            <input
              type="text"
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="Founder, Developer, Designer..."
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          {error && (
            <p
              className="rounded-lg px-4 py-2.5 text-sm text-muted"
              style={{
                border: "1px solid rgba(239,68,68,0.2)",
                background: "rgba(239,68,68,0.05)",
                color: "#f87171",
              }}
            >
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3.5 font-semibold text-background transition-all hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                boxShadow: "0 0 0 1px rgba(74,222,128,0.3), 0 4px 20px rgba(74,222,128,0.15)",
              }}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Registering...
                </span>
              ) : (
                "Register. It's free."
              )}
            </button>
            <p className="mt-3 text-center text-xs text-subtle">
              Confirmation sent to your email and WhatsApp
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
