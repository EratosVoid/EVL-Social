"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelectedEvent } from "@/lib/useSelectedEvent";
import {
  getTemplates,
  saveTemplate,
  deleteTemplate,
  type Template,
} from "@/lib/templates";
import { useState, useEffect, useCallback } from "react";

export default function MessagingPage() {
  const { event, eventId, isLoading } = useSelectedEvent();
  const messages = useQuery(
    api.messaging.getMessages,
    eventId ? { eventId } : "skip"
  );
  const stats = useQuery(
    api.registrations.getRegistrationStats,
    eventId ? { eventId } : "skip"
  );
  const sendBulkEmail = useAction(api.messaging.sendBulkEmail);
  const sendBulkWhatsApp = useAction(api.messaging.sendBulkWhatsApp);

  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateName, setTemplateName] = useState("event_reminder");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Template state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    const all = await getTemplates();
    setTemplates(all);
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const emailTemplates = templates.filter((t) => t.channel === "email");
  const whatsappTemplates = templates.filter((t) => t.channel === "whatsapp");
  const currentTemplates = channel === "email" ? emailTemplates : whatsappTemplates;

  const handleLoadTemplate = (t: Template) => {
    if (t.channel === "email") {
      setSubject(t.subject || "");
      setBody(t.body);
    } else {
      setTemplateName(t.body);
    }
    setEditingTemplateId(t.id);
  };

  const handleSaveTemplate = async () => {
    if (!newTemplateName.trim()) return;
    setSavingTemplate(true);
    await saveTemplate({
      id: editingTemplateId || undefined,
      name: newTemplateName.trim(),
      channel,
      subject: channel === "email" ? subject : undefined,
      body: channel === "email" ? body : templateName,
    });
    await loadTemplates();
    setSavingTemplate(false);
    setShowSaveForm(false);
    setNewTemplateName("");
    setEditingTemplateId(null);
  };

  const handleDeleteTemplate = async (id: string) => {
    await deleteTemplate(id);
    await loadTemplates();
    if (editingTemplateId === id) setEditingTemplateId(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!event || !eventId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-white/40">No event selected.</p>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      if (channel === "email") {
        await sendBulkEmail({ eventId, subject, body });
      } else {
        await sendBulkWhatsApp({
          eventId,
          templateName,
          body: `WhatsApp template: ${templateName}`,
        });
      }
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none transition-colors";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Messaging</h1>
        <p className="text-sm text-white/40">{event.title}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Compose */}
        <div className="rounded-2xl border border-white/5 p-6 lg:col-span-2">
          <h2 className="font-semibold">Send to All Registrants</h2>
          <p className="mt-1 text-sm text-white/40">
            {stats?.total ?? 0} recipients
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setChannel("email")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                channel === "email"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setChannel("whatsapp")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                channel === "whatsapp"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              WhatsApp
            </button>
          </div>

          <form onSubmit={handleSend} className="mt-4 space-y-4">
            {channel === "email" ? (
              <>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <textarea
                  className={inputClass}
                  rows={6}
                  placeholder="Email body (HTML supported)..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </>
            ) : (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">
                  Template Name
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. event_reminder"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
                <p className="mt-2 text-xs text-white/30">
                  Must match a pre-approved template in your Meta Business
                  account.
                </p>
              </div>
            )}

            {sent && (
              <p className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white/60">
                Messages sent successfully.
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : `Send ${channel === "email" ? "Email" : "WhatsApp"}`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveForm(true);
                  setNewTemplateName(
                    editingTemplateId
                      ? templates.find((t) => t.id === editingTemplateId)
                          ?.name || ""
                      : ""
                  );
                }}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                {editingTemplateId ? "Update Template" : "Save as Template"}
              </button>
            </div>
          </form>

          {/* Save template form */}
          {showSaveForm && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 p-4">
              <input
                type="text"
                className="flex-1 rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
                placeholder="Template name..."
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                autoFocus
              />
              <button
                onClick={handleSaveTemplate}
                disabled={savingTemplate || !newTemplateName.trim()}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50"
              >
                {savingTemplate ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setNewTemplateName("");
                }}
                className="rounded-lg px-3 py-2 text-sm text-white/40 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Templates sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 p-6">
            <h2 className="font-semibold">Templates</h2>
            <p className="mt-1 text-xs text-white/30">
              Saved locally on this device
            </p>

            {currentTemplates.length > 0 ? (
              <div className="mt-4 space-y-2">
                {currentTemplates.map((t) => (
                  <div
                    key={t.id}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                      editingTemplateId === t.id
                        ? "border-white/20 bg-white/[0.03]"
                        : "border-white/5 hover:border-white/10"
                    }`}
                    onClick={() => handleLoadTemplate(t)}
                  >
                    <p className="text-sm font-medium">{t.name}</p>
                    {t.channel === "email" && t.subject && (
                      <p className="mt-0.5 text-xs text-white/30 truncate">
                        {t.subject}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-white/20 truncate">
                      {t.body.slice(0, 60)}
                      {t.body.length > 60 ? "..." : ""}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs text-white/40">
                        {editingTemplateId === t.id ? "Loaded" : "Click to use"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTemplate(t.id);
                        }}
                        className="ml-auto text-xs text-white/20 hover:text-white/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/20">
                No {channel} templates saved yet.
                <br />
                Compose a message and click &quot;Save as Template&quot;.
              </p>
            )}
          </div>

          {/* Message History */}
          <div className="rounded-2xl border border-white/5 p-6">
            <h2 className="font-semibold">Send History</h2>
            <div className="mt-4 space-y-2">
              {messages && messages.length > 0 ? (
                messages.slice(0, 5).map((msg) => (
                  <div
                    key={msg._id}
                    className="rounded-lg border border-white/5 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-white/60">
                        {msg.type}
                      </span>
                      <span className="text-xs text-white/20">
                        {new Date(msg.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    {msg.subject && (
                      <p className="mt-1.5 text-sm font-medium truncate">
                        {msg.subject}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-white/30">
                      {msg.recipientCount} recipients
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/20">No messages sent yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
