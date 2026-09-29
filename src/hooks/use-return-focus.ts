"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Radix only restores focus to a `Dialog.Trigger`. Our dialogs are also opened
 * from state (hotkeys, menus, other buttons), so remember the last element
 * focused outside the dialog and return focus there on close (NFR-A3).
 */
export function useReturnFocus(open: boolean) {
  const target = useRef<HTMLElement | null>(null);

  // Layout effect: runs before the dialog's focus scope moves focus inside.
  useLayoutEffect(() => {
    if (!open) return;
    target.current = document.activeElement as HTMLElement | null;

    // A menu that opened the dialog hands focus back to its trigger as it closes.
    const onFocusIn = (event: FocusEvent) => {
      const element = event.target as HTMLElement;
      if (!element.closest("[role='dialog']")) target.current = element;
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open]);

  return useCallback((event: Event, handler?: (event: Event) => void) => {
    handler?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    const element = target.current;
    target.current = null;
    if (element?.isConnected) element.focus();
  }, []);
}
