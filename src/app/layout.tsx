import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/shared/providers";
import { SkipLink } from "@/components/shared/skip-link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { displayFont, geistMono, geistSans } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "EchoGPT",
    "AI chat",
    "multi-model AI",
    "Chrome extension",
    "side panel",
    "GPT",
    "Claude",
    "Gemini",
    "summarize page",
  ],
  authors: [{ name: "AppifyDevs" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets mobile browsers shrink the layout when the keyboard opens, keeping the composer visible.
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e12" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(displayFont.variable, geistSans.variable, geistMono.variable)}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <SkipLink />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
