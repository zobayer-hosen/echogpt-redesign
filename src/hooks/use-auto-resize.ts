"use client";

import { type RefObject, useLayoutEffect } from "react";

/** Grow a textarea with its content up to `maxRows`, then scroll (A-06). */
export function useAutoResize(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
  maxRows = 8,
) {
  useLayoutEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    const styles = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(styles.lineHeight) || 24;
    const padding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
    const maxHeight = lineHeight * maxRows + padding;

    textarea.style.height = "auto";
    const next = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${next}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [ref, value, maxRows]);
}
