"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

/** Returns every 2nd Saturday of each month for the next N months */
function getSecondSaturdays(count: number): Date[] {
  const result: Date[] = [];
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  while (result.length < count) {
    const saturdays: Date[] = [];
    const d = new Date(year, month, 1);
    // Advance to first Saturday
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
    while (d.getMonth() === month) {
      saturdays.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    if (saturdays[1]) result.push(saturdays[1]);
    month++;
    if (month > 11) { month = 0; year++; }
  }
  return result;
}

const EVL_DATES = getSecondSaturdays(12);

function getEmbedUrl(mapUrl: string): string | null {
  if (!mapUrl) return null;
  if (mapUrl.includes("/embed")) return mapUrl;

  try {
    const url = new URL(mapUrl);

    const placeMatch = mapUrl.match(/\/place\/([^/@]+)/);
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(place)}!5e0!3m2!1sen!2sin`;
    }

    const coordMatch = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`;
    }

    if (url.hostname.includes("goo.gl") || url.hostname.includes("maps.app")) {
      return null;
    }

    const qParam = url.searchParams.get("q");
    if (qParam) {
      return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(qParam)}`;
    }
  } catch {
    // Invalid URL
  }

  return null;
}

export default function Venue() {
  const event = useQuery(api.events.getActiveEvent);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(EVL_DATES[0]);

  const venueName = event?.venue || "Mangalore, Karnataka";
  const location = event?.location || "";
  const mapUrl = event?.mapUrl || "";

  const embedUrl =
    getEmbedUrl(mapUrl) ||
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124448.60506538498!2d74.81097!3d12.91416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1`;

  return (
    <section id="venue" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
            Location
          </p>
          <h2
            className="font-bold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            The venue
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Card 1 — Venue + map */}
          <motion.div
            className="flex flex-col overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col justify-center bg-surface p-8">
              <h3 className="text-xl font-bold text-foreground">{venueName}</h3>
              {location && (
                <p className="mt-2 text-sm text-muted">{location}</p>
              )}
              {!event && (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The exact venue is shared with registered attendees closer to
                  the event date.
                </p>
              )}
              <div className="mt-6 space-y-2 text-sm text-muted">
                {event?.date && (
                  <p>
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    &middot;{" "}
                    {new Date(event.date).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}
                <p className="text-accent">Free entry</p>
              </div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-dim"
                >
                  Open in Google Maps →
                </a>
              )}
            </div>
            <div className="relative min-h-[220px] flex-1" style={{ background: "var(--color-surface)" }}>
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: "grayscale(20%) invert(85%) hue-rotate(180deg)" }}
              />
            </div>
          </motion.div>

          {/* Card 2 — Calendar + event list */}
          <motion.div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)", background: "var(--color-surface)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ evl: EVL_DATES }}
                modifiersStyles={{
                  evl: { background: "rgba(74,222,128,0.12)", color: "#4ade80", fontWeight: "600" },
                }}
                className="mx-auto"
              />
            </div>
            <div className="px-4 pb-4">
              <p className="py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                Upcoming
              </p>
              <ul className="space-y-2">
                {EVL_DATES.slice(0, 6).map((d) => {
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <li
                      key={d.toISOString()}
                      onClick={() => setSelectedDate(d)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      style={isSelected ? { background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" } : { border: "1px solid transparent" }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md"
                        style={{ background: isSelected ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)" }}
                      >
                        <span className="text-[10px] font-medium uppercase text-muted">
                          {d.toLocaleDateString("en-IN", { month: "short" })}
                        </span>
                        <span className="text-sm font-bold text-foreground leading-none">
                          {d.getDate()}
                        </span>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-foreground">EVL Startup Social</p>
                        <p className="text-[11px] text-muted">
                          {d.toLocaleDateString("en-IN", { weekday: "long" })} &middot; Mangalore
                        </p>
                      </div>
                      {isSelected && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
