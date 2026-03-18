"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/form-settings", label: "Form Settings" },
  { href: "/admin/messaging", label: "Messaging" },
];

function AdminHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event");

  const buildHref = (base: string) => {
    if (eventParam) return `${base}?event=${eventParam}`;
    return base;
  };

  return (
    <header
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="text-[15px] font-bold tracking-tight text-foreground"
          >
            EVL Social{" "}
            <span className="text-[13px] font-normal text-muted">Admin</span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={buildHref(item.href)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
                style={
                  pathname === item.href
                    ? { background: "rgba(255,255,255,0.06)" }
                    : {}
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <UserButton />
      </div>
    </header>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense>
        <AdminHeader />
      </Suspense>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
