"use client";

import { type KeyboardEvent, useState } from "react";

import type { PromptTemplate } from "@/types";

const MAX_RESULTS = 6;

/**
 * State + keyboard handling for the "/" saved-prompts menu. The menu opens
 * while the input is a single line starting with "/".
 */
export function useSlashMenu(
  value: string,
  prompts: PromptTemplate[] | undefined,
  onPick: (prompt: PromptTemplate) => void,
) {
  const [rawIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const query =
    value.startsWith("/") && !value.includes("\n") ? value.slice(1).toLowerCase() : null;
  const matches =
    prompts && query !== null
      ? prompts.filter((prompt) => prompt.title.toLowerCase().includes(query)).slice(0, MAX_RESULTS)
      : [];
  const open = matches.length > 0 && !dismissed;
  const activeIndex = Math.min(rawIndex, Math.max(matches.length - 1, 0));

  const pick = (prompt: PromptTemplate) => {
    setDismissed(true);
    onPick(prompt);
  };

  /** Returns true when the key was handled by the menu. */
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!open) return false;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((activeIndex + step + matches.length) % matches.length);
        break;
      }
      case "Enter":
      case "Tab":
        pick(matches[activeIndex]);
        break;
      case "Escape":
        setDismissed(true);
        break;
      default:
        return false;
    }
    event.preventDefault();
    return true;
  };

  /** Call on every input change so the menu can reopen. */
  const reset = () => {
    setDismissed(false);
    setActiveIndex(0);
  };

  return { open, matches, activeIndex, setActiveIndex, handleKeyDown, pick, reset };
}
