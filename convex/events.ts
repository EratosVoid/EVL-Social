import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getActiveEvent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
  },
});

export const getEvent = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    venue: v.string(),
    location: v.string(),
    mapUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const defaultFormFields = [
      { id: "name", label: "Full Name", type: "text" as const, required: true, order: 0 },
      { id: "email", label: "Email", type: "email" as const, required: true, order: 1 },
      { id: "phone", label: "Phone Number", type: "phone" as const, required: true, order: 2 },
      { id: "whatsappNumber", label: "WhatsApp Number", type: "phone" as const, required: true, order: 3 },
      { id: "company", label: "Company / Startup", type: "text" as const, required: false, order: 4 },
      { id: "role", label: "Your Role", type: "text" as const, required: false, order: 5 },
    ];

    return await ctx.db.insert("events", {
      ...args,
      isActive: true,
      formFields: defaultFormFields,
      createdAt: Date.now(),
    });
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    date: v.optional(v.string()),
    venue: v.optional(v.string()),
    location: v.optional(v.string()),
    mapUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
    formFields: v.optional(
      v.array(
        v.object({
          id: v.string(),
          label: v.string(),
          type: v.union(
            v.literal("text"),
            v.literal("email"),
            v.literal("phone"),
            v.literal("select"),
            v.literal("textarea")
          ),
          required: v.boolean(),
          options: v.optional(v.array(v.string())),
          order: v.number(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filtered);
  },
});

export const toggleEventActive = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");
    await ctx.db.patch(args.id, { isActive: !event.isActive });
  },
});
