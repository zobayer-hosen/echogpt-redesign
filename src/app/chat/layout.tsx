import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/chat/app-shell";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with GPT, Claude, Gemini and more — compare answers side by side.",
  alternates: { canonical: "/chat" },
};

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
