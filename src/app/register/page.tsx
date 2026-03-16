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

  if (event === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (event === null || !event.isActive) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold">Registration Closed</h1>
          <p className="mt-4 text-lg text-white/40">
            There are no active events right now. Check back soon!
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full border border-white/10 px-6 py-3 font-medium transition-colors hover:border-white/20"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const dateDisplay = formatDate(event.date);

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
          <h1 className="text-3xl font-bold">You&apos;re In!</h1>
          <p className="mt-4 text-lg text-white/40">
            You&apos;ve successfully registered for{" "}
            <strong className="text-white">{event.title}</strong>.
          </p>
          <div className="mt-6 rounded-xl border border-white/5 p-6 text-left">
            <p className="text-sm text-white/40">Event Details</p>
            <p className="mt-2 font-semibold">{event.title}</p>
            <p className="mt-1 text-white/40">{dateDisplay}</p>
            <p className="text-white/40">{event.venue}</p>
          </div>
          <p className="mt-6 text-sm text-white/30">
            A confirmation has been sent to your email and WhatsApp.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full border border-white/10 px-6 py-3 font-medium transition-colors hover:border-white/20"
          >
            Back to Home
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
    "w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none transition-colors";

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          &larr; Back
        </Link>

        <h1 className="text-3xl font-bold">
          Register for {event.title}
        </h1>
        <p className="mt-2 text-white/40">
          {dateDisplay} &middot; {event.venue}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Full Name <span className="text-white/30">*</span>
            </label>
            <input type="text" className={inputClass} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Email <span className="text-white/30">*</span>
            </label>
            <input type="email" className={inputClass} placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Phone / WhatsApp <span className="text-white/30">*</span>
            </label>
            <input type="tel" className={inputClass} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Company / Startup</label>
            <input type="text" className={inputClass} placeholder="Your company or startup name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Your Role</label>
            <input type="text" className={inputClass} placeholder="Founder, Developer, Designer..." value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>

          {error && (
            <p className="rounded-lg border border-white/5 px-4 py-2 text-sm text-white/60">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3.5 font-semibold text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
