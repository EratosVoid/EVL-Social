import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const getMessages = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .order("desc")
      .collect();
  },
});

export const logMessage = mutation({
  args: {
    eventId: v.id("events"),
    type: v.union(v.literal("email"), v.literal("whatsapp")),
    subject: v.optional(v.string()),
    body: v.string(),
    recipientCount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      ...args,
      sentAt: Date.now(),
    });
  },
});

export const sendConfirmationEmail = action({
  args: {
    to: v.string(),
    name: v.string(),
    eventTitle: v.string(),
    eventDate: v.string(),
    eventVenue: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("RESEND_API_KEY not set, skipping email");
      return;
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ffffff;">You're in! 🎉</h1>
        <p>Hey ${args.name}! Thanks for signing up — we're really looking forward to meeting you at the <strong>${args.eventTitle}</strong>.</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>📅</strong> ${args.eventDate}</p>
          <p style="margin: 4px 0;"><strong>📍</strong> ${args.eventVenue}</p>
        </div>
        <p>If you have any founder friends who'd love this, bring them along!</p>
        <p>See you there. 🙌</p>
      </div>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Events <onboarding@resend.dev>",
        to: args.to,
        subject: `Registration Confirmed: ${args.eventTitle}`,
        html,
      }),
    });
  },
});

export const sendWhatsAppMessage = action({
  args: {
    to: v.string(),
    name: v.string(),
    eventTitle: v.string(),
    eventDate: v.string(),
    eventVenue: v.string(),
  },
  handler: async (_ctx, args) => {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!accessToken || !phoneNumberId) {
      console.log("WhatsApp credentials not set, skipping message");
      return;
    }

    const phone = args.to.replace(/\D/g, "");

    await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone,
          type: "template",
          template: {
            name: "registration_confirmation",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: args.name },
                  { type: "text", text: args.eventTitle },
                  { type: "text", text: args.eventDate },
                  { type: "text", text: args.eventVenue },
                ],
              },
            ],
          },
        }),
      }
    );
  },
});

export const sendBulkEmail = action({
  args: {
    eventId: v.id("events"),
    subject: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const registrations = await ctx.runQuery(
      api.registrations.getRegistrations,
      { eventId: args.eventId }
    );
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("RESEND_API_KEY not set, skipping bulk email");
      return;
    }

    for (const reg of registrations) {
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Hi ${reg.name},</p>
          ${args.body}
        </div>
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Events <onboarding@resend.dev>",
          to: reg.email,
          subject: args.subject,
          html,
        }),
      });
    }

    await ctx.runMutation(api.messaging.logMessage, {
      eventId: args.eventId,
      type: "email",
      subject: args.subject,
      body: args.body,
      recipientCount: registrations.length,
    });
  },
});

export const sendBulkWhatsApp = action({
  args: {
    eventId: v.id("events"),
    templateName: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const registrations = await ctx.runQuery(
      api.registrations.getRegistrations,
      { eventId: args.eventId }
    );
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!accessToken || !phoneNumberId) {
      console.log("WhatsApp credentials not set, skipping bulk message");
      return;
    }

    for (const reg of registrations) {
      const phone = reg.whatsappNumber.replace(/\D/g, "");
      await fetch(
        `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: phone,
            type: "template",
            template: {
              name: args.templateName,
              language: { code: "en" },
            },
          }),
        }
      );
    }

    await ctx.runMutation(api.messaging.logMessage, {
      eventId: args.eventId,
      type: "whatsapp",
      body: args.body,
      recipientCount: registrations.length,
    });
  },
});
