"use client";

import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useSelectedEvent() {
  const searchParams = useSearchParams();
  const eventIdParam = searchParams.get("event");

  const allEvents = useQuery(api.events.listEvents);
  const activeEvent = useQuery(api.events.getActiveEvent);

  // If an event ID is in the URL, use that; otherwise default to active event
  const selectedEvent = eventIdParam
    ? allEvents?.find((e) => e._id === eventIdParam) ?? null
    : activeEvent ?? null;

  const selectedEventId = selectedEvent?._id as Id<"events"> | undefined;

  return {
    event: selectedEvent,
    eventId: selectedEventId,
    allEvents: allEvents ?? [],
    isLoading: allEvents === undefined,
  };
}
