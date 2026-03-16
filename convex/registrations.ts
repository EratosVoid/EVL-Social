import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRegistrations = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("registrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .order("desc")
      .collect();
  },
});

export const getRegistrationStats = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("registrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();

    const todayCount = all.filter((r) => r.createdAt >= todayStart).length;

    return {
      total: all.length,
      today: todayCount,
      recent: all.slice(0, 5),
    };
  },
});

export const createRegistration = mutation({
  args: {
    eventId: v.id("events"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    whatsappNumber: v.string(),
    company: v.string(),
    role: v.string(),
    customFields: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found");
    if (!event.isActive) throw new Error("Registration is closed");

    return await ctx.db.insert("registrations", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
