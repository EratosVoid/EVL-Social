"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useSelectedEvent } from "@/lib/useSelectedEvent";
import Link from "next/link";
import { Id } from "../../../convex/_generated/dataModel";

function EventCard({
  event,
  stats,
}: {
  event: {
    _id: Id<"events">;
    title: string;
    date: string;
    venue: string;
    isActive: boolean;
  };
  stats?: { total: number; today: number } | null;
}) {
  const qs = `?event=${event._id}`;
  const dateStr = (() => {
    const d = new Date(event.date);
    if (isNaN(d.getTime())) return event.date;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  })();

  return (
    <div
      className={`rounded-2xl border p-6 transition-colors ${
        event.isActive
          ? "border-white/10 bg-white/[0.03]"
          : "border-white/5 bg-transparent"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="mt-1 text-sm text-white/40">
            {dateStr} &middot; {event.venue}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            event.isActive
              ? "bg-white/10 text-white"
              : "bg-white/5 text-white/30"
          }`}
        >
          {event.isActive ? "Active" : "Closed"}
        </span>
      </div>

      {stats && (
        <div className="mt-4 flex gap-6 text-sm">
          <div>
            <span className="text-2xl font-bold">{stats.total}</span>
            <span className="ml-1 text-white/30">registrations</span>
          </div>
          {event.isActive && stats.today > 0 && (
            <div>
              <span className="text-2xl font-bold">{stats.today}</span>
              <span className="ml-1 text-white/30">today</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/admin/registrations${qs}`}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          Registrations
        </Link>
        <Link
          href={`/admin/form-settings${qs}`}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          Settings
        </Link>
        <Link
          href={`/admin/messaging${qs}`}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          Messaging
        </Link>
      </div>
    </div>
  );
}

function EventCardWithStats({ event }: { event: { _id: Id<"events">; title: string; date: string; venue: string; isActive: boolean } }) {
  const stats = useQuery(api.registrations.getRegistrationStats, {
    eventId: event._id,
  });
  return <EventCard event={event} stats={stats} />;
}

export default function AdminDashboard() {
  const { allEvents, isLoading } = useSelectedEvent();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (allEvents.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 p-12 text-center">
        <h2 className="text-2xl font-bold">No Events Yet</h2>
        <p className="mt-2 text-white/40">Create your first event to get started.</p>
        <Link
          href="/admin/form-settings"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90"
        >
          Create Event
        </Link>
      </div>
    );
  }

  const active = allEvents.filter((e) => e.isActive);
  const inactive = allEvents.filter((e) => !e.isActive);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link
          href="/admin/form-settings"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          New Event
        </Link>
      </div>

      {active.length > 0 && (
        <div className="space-y-4">
          {active.map((event) => (
            <EventCardWithStats key={event._id} event={event} />
          ))}
        </div>
      )}

      {inactive.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-white/30">Past Events</h2>
          {inactive.map((event) => (
            <EventCardWithStats key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
