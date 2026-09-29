import { Keyboard, PanelRight, Wallet, Zap } from "lucide-react";

import type { Benefit, ComparisonRow } from "@/types";

export const benefits: Benefit[] = [
  {
    id: "one-place",
    title: "One place, every model",
    description: "No more copying prompts between tabs. Pick the best model for each task.",
    icon: Zap,
  },
  {
    id: "in-context",
    title: "Works where you read",
    description: "The side panel sits beside any page, so your research never loses its place.",
    icon: PanelRight,
  },
  {
    id: "keyboard",
    title: "Keyboard-first",
    description: "Open with Ctrl/Cmd+Shift+E, search with Ctrl/Cmd+K, insert prompts with “/”.",
    icon: Keyboard,
  },
  {
    id: "value",
    title: "One plan, not five",
    description: "A single subscription instead of paying for every AI site separately.",
    icon: Wallet,
  },
];

export const comparisonRows: ComparisonRow[] = [
  { label: "All major models in one place", echogpt: true, separate: false },
  { label: "Works beside any web page", echogpt: true, separate: false },
  { label: "Compare two answers side by side", echogpt: true, separate: false },
  { label: "Prompts saved across models", echogpt: true, separate: false },
  { label: "One account and one bill", echogpt: true, separate: false },
  { label: "Free tier available", echogpt: true, separate: true },
];
