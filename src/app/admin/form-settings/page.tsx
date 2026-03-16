"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelectedEvent } from "@/lib/useSelectedEvent";
import { useState, useEffect } from "react";

function formatDateForDisplay(dateStr: string, timeStr: string): string {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T${timeStr || "19:00"}`);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) + " — " + d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function parseDateFromStored(stored: string): { date: string; time: string } {
  // Try to parse an ISO-ish string or a stored datetime-local value
  const d = new Date(stored);
  if (!isNaN(d.getTime())) {
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().slice(0, 5);
    return { date, time };
  }
  return { date: "", time: "19:00" };
}

export default function FormSettingsPage() {
  const { event, allEvents, isLoading } = useSelectedEvent();
  const createEvent = useMutation(api.events.createEvent);
  const updateEvent = useMutation(api.events.updateEvent);
  const toggleActive = useMutation(api.events.toggleEventActive);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "19:00",
    venue: "",
    location: "",
    mapUrl: "",
  });

  useEffect(() => {
    if (event) {
      const parsed = parseDateFromStored(event.date);
      setForm({
        title: event.title,
        description: event.description,
        date: parsed.date,
        time: parsed.time,
        venue: event.venue,
        location: event.location,
        mapUrl: event.mapUrl || "",
      });
    }
  }, [event]);

  const getDateString = () => {
    if (!form.date) return "";
    return formatDateForDisplay(form.date, form.time);
  };

  const getISODate = () => {
    if (!form.date) return "";
    return `${form.date}T${form.time || "19:00"}`;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await createEvent({
      title: form.title,
      description: form.description,
      date: getISODate(),
      venue: form.venue,
      location: form.location,
      mapUrl: form.mapUrl || undefined,
    });
    setSaving(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setSaving(true);
    await updateEvent({
      id: event._id,
      title: form.title,
      description: form.description,
      date: getISODate(),
      venue: form.venue,
      location: form.location,
      mapUrl: form.mapUrl || undefined,
    });
    setSaving(false);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none transition-colors";

  const dateInputClass =
    "w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/25 focus:outline-none transition-colors [color-scheme:dark]";

  if (!event) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Title</label>
            <input type="text" className={inputClass} placeholder="EVL Startup Social #2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Description</label>
            <textarea className={inputClass} rows={3} placeholder="A gathering of founders and builders..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">Date</label>
              <input type="date" className={dateInputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">Time</label>
              <input type="time" className={dateInputClass} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
            </div>
          </div>
          {form.date && (
            <p className="text-sm text-white/40">{getDateString()}</p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">Venue</label>
              <input type="text" className={inputClass} placeholder="Sahodaya Hall, St. Aloysius" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">Location / Address</label>
              <input type="text" className={inputClass} placeholder="Hampankatta, Mangaluru" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Google Maps Link</label>
            <input type="url" className={inputClass} placeholder="https://maps.app.goo.gl/..." value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} />
            <p className="mt-1 text-xs text-white/20">Paste a Google Maps share link for the venue</p>
          </div>
          <button type="submit" disabled={saving} className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50">
            {saving ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Event Settings</h1>
        <button
          onClick={() => toggleActive({ id: event._id })}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/20"
        >
          {event.isActive ? "Close Registration" : "Open Registration"}
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">Title</label>
          <input type="text" className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">Description</label>
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Date</label>
            <input type="date" className={dateInputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Time</label>
            <input type="time" className={dateInputClass} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </div>
        </div>
        {form.date && (
          <p className="text-sm text-white/40">{getDateString()}</p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Venue</label>
            <input type="text" className={inputClass} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">Location / Address</label>
            <input type="text" className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">Google Maps Link</label>
          <input type="url" className={inputClass} placeholder="https://maps.app.goo.gl/..." value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} />
          <p className="mt-1 text-xs text-white/20">Paste a Google Maps share link for the venue</p>
        </div>
        <button type="submit" disabled={saving} className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="rounded-2xl border border-white/5 p-6">
        <h2 className="font-semibold">Registration Form Fields</h2>
        <p className="mt-1 text-sm text-white/40">
          Default fields: Name, Email, Phone, WhatsApp, Company, Role
        </p>
        <div className="mt-4 space-y-2">
          {event.formFields
            .sort((a, b) => a.order - b.order)
            .map((field) => (
              <div key={field.id} className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3">
                <div>
                  <span className="font-medium">{field.label}</span>
                  <span className="ml-2 text-xs text-white/30">({field.type})</span>
                </div>
                <span className={`text-xs ${field.required ? "text-white/60" : "text-white/30"}`}>
                  {field.required ? "Required" : "Optional"}
                </span>
              </div>
            ))}
        </div>
      </div>

      {allEvents && allEvents.length > 1 && (
        <div className="rounded-2xl border border-white/5 p-6">
          <h2 className="font-semibold">All Events</h2>
          <div className="mt-4 space-y-2">
            {allEvents.map((ev) => (
              <div key={ev._id} className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3">
                <div>
                  <span className="font-medium">{ev.title}</span>
                  <span className="ml-2 text-xs text-white/30">{ev.date}</span>
                </div>
                <span className={`text-xs ${ev.isActive ? "text-white" : "text-white/30"}`}>
                  {ev.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
