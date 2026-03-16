"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelectedEvent } from "@/lib/useSelectedEvent";
import { useState } from "react";

export default function RegistrationsPage() {
  const { event, eventId, isLoading } = useSelectedEvent();
  const registrations = useQuery(
    api.registrations.getRegistrations,
    eventId ? { eventId } : "skip"
  );
  const [search, setSearch] = useState("");

  if (isLoading || registrations === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="rounded-2xl border border-white/5 p-12 text-center">
        <p className="text-white/40">No event selected.</p>
      </div>
    );
  }

  const filtered = registrations?.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    if (!registrations || registrations.length === 0) return;
    const headers = ["Name", "Email", "Phone", "WhatsApp", "Company", "Role", "Registered At"];
    const rows = registrations.map((r) => [
      r.name, r.email, r.phone, r.whatsappNumber, r.company, r.role,
      new Date(r.createdAt).toISOString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${event.title.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Registrations</h1>
          <p className="text-sm text-white/40">{event.title}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition-colors hover:border-white/20"
        >
          Export CSV
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, email, or company..."
        className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-hidden rounded-2xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th className="px-6 py-3 font-medium text-white/40">Name</th>
                <th className="px-6 py-3 font-medium text-white/40">Email</th>
                <th className="px-6 py-3 font-medium text-white/40">Phone</th>
                <th className="px-6 py-3 font-medium text-white/40">Company</th>
                <th className="px-6 py-3 font-medium text-white/40">Role</th>
                <th className="px-6 py-3 font-medium text-white/40">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered && filtered.length > 0 ? (
                filtered.map((reg) => (
                  <tr key={reg._id} className="hover:bg-white/[0.02]">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{reg.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-white/40">{reg.email}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-white/40">{reg.phone}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-white/40">{reg.company || "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-white/40">{reg.role || "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-white/40">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                    {search ? "No matching registrations" : "No registrations yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-white/30">
        {filtered?.length ?? 0} of {registrations?.length ?? 0} registrations
      </p>
    </div>
  );
}
