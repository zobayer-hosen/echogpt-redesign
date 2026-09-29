"use client";

import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { Toaster as Sonner } from "sonner";

/** Toasts use the design tokens so they match both themes. */
const tokenStyle = {
  "--normal-bg": "var(--card)",
  "--normal-text": "var(--foreground)",
  "--normal-border": "var(--border)",
} as CSSProperties;

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-center"
      closeButton
      style={tokenStyle}
      toastOptions={{ classNames: { toast: "font-sans rounded-xl shadow-lg" } }}
    />
  );
}
