import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/lib/ConvexClientProvider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EVL Startup Social | Mangalore",
  description:
    "Meet founders, builders, and innovators at the EVL Startup Social in Mangalore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" style={{ background: "#09090b" }}>
        <body
          className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
          style={{ background: "#09090b", color: "#fafafa" }}
        >
          <ScrollProgress />
          <SmoothCursor />
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
