import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// WhatsApp webhook verification
http.route({
  path: "/whatsapp-webhook",
  method: "GET",
  handler: httpAction(async (_ctx, request) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === "subscribe" && token === verifyToken) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }),
});

// WhatsApp webhook for delivery status
http.route({
  path: "/whatsapp-webhook",
  method: "POST",
  handler: httpAction(async (_ctx, request) => {
    const body = await request.json();
    // Log delivery status updates
    console.log("WhatsApp webhook:", JSON.stringify(body));
    return new Response("OK", { status: 200 });
  }),
});

export default http;
