"use client";

import { useEffect, useRef } from "react";

interface HotkeyOptions {
  enabled?: boolean;
  /** Fire even when focus is inside an input or textarea. */
  allowInInputs?: boolean;
}

/**
 * Global keyboard shortcut. `combo` is like "mod+k" or "mod+shift+e";
 * `mod` means ⌘ on Apple platforms and Ctrl elsewhere.
 */
export function useHotkeys(
  combo: string,
  handler: (event: KeyboardEvent) => void,
  { enabled = true, allowInInputs = true }: HotkeyOptions = {},
) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;
    const parts = combo.toLowerCase().split("+");
    const key = parts.at(-1);
    const wantMod = parts.includes("mod");
    const wantShift = parts.includes("shift");
    const wantAlt = parts.includes("alt");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() !== key) return;
      const mod = event.metaKey || event.ctrlKey;
      if (mod !== wantMod || event.shiftKey !== wantShift || event.altKey !== wantAlt) return;

      const target = event.target as HTMLElement | null;
      const inInput = target?.closest("input, textarea, [contenteditable='true']");
      if (inInput && !allowInInputs) return;

      event.preventDefault();
      handlerRef.current(event);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [combo, enabled, allowInInputs]);
}
