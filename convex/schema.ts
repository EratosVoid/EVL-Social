import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    venue: v.string(),
    location: v.string(),
    isActive: v.boolean(),
    formFields: v.array(
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
    ),
    mapUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
    createdAt: v.number(),
  }),

  registrations: defineTable({
    eventId: v.id("events"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    whatsappNumber: v.string(),
    company: v.string(),
    role: v.string(),
    customFields: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_event", ["eventId"]),

  messages: defineTable({
    eventId: v.id("events"),
    type: v.union(v.literal("email"), v.literal("whatsapp")),
    subject: v.optional(v.string()),
    body: v.string(),
    recipientCount: v.number(),
    sentAt: v.number(),
  }).index("by_event", ["eventId"]),
});
