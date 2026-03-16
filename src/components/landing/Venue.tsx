"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function getEmbedUrl(mapUrl: string): string | null {
  if (!mapUrl) return null;

  // If it's already an embed URL, use it
  if (mapUrl.includes("/embed")) return mapUrl;

  // Extract place query from various Google Maps URL formats
  // e.g. https://maps.app.goo.gl/xxx or https://www.google.com/maps/place/...
  // We can use the Maps embed with a place query using the full URL
  // The simplest approach: use Google Maps embed with the "place" mode
  // by extracting coordinates or place name

  // For Google Maps short links and regular links, we can use the
  // "maps/embed" endpoint with a q= parameter pointing to the URL
  try {
    const url = new URL(mapUrl);

    // Handle google.com/maps/place/... URLs
    const placeMatch = mapUrl.match(/\/place\/([^/@]+)/);
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(place)}!5e0!3m2!1sen!2sin`;
    }

    // Handle URLs with coordinates (@lat,lng)
    const coordMatch = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`;
    }

    // For short links (maps.app.goo.gl), just use a search query embed
    if (url.hostname.includes("goo.gl") || url.hostname.includes("maps.app")) {
      // Can't easily resolve short links client-side, so fall back to
      // embedding with the venue name from the event
      return null;
    }

    // Handle google.com/maps URLs with query params
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

  const venueName = event?.venue || "Mangalore, Karnataka";
  const location = event?.location || "";
  const mapUrl = event?.mapUrl || "";

  // Try to get an embed URL, fall back to a search-based embed
  const embedUrl =
    getEmbedUrl(mapUrl) ||
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124448.60506538498!2d74.81097!3d12.91416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1`;

  return (
    <section id="venue" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            The venue
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 overflow-hidden rounded-2xl border border-white/5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center bg-white/[0.02] p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white">{venueName}</h3>
              {location && (
                <p className="mt-2 text-white/40">{location}</p>
              )}
              {!event && (
                <p className="mt-4 text-white/40">
                  The exact venue will be shared with registered attendees closer
                  to the event.
                </p>
              )}
              <div className="mt-6 space-y-3 text-sm text-white/40">
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
                <p>Free entry</p>
              </div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Open in Google Maps &rarr;
                </a>
              )}
            </div>
            <div className="relative min-h-[300px] bg-white/[0.02]">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0 opacity-80"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
