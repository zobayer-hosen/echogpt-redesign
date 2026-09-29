import { CodeXml, Lightbulb, Mail, Newspaper } from "lucide-react";

import type { SuggestedPrompt } from "@/types";

/** Empty-state prompt cards (A-05). */
export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "s-explain",
    title: "Explain a concept",
    prompt: "Explain how large language models work, in simple terms, with an everyday analogy.",
    icon: Lightbulb,
  },
  {
    id: "s-code",
    title: "Write some code",
    prompt:
      "Write a TypeScript function that debounces another function, with a short usage example.",
    icon: CodeXml,
  },
  {
    id: "s-summarize",
    title: "Summarize a topic",
    prompt: "Summarize the key points of the pros and cons of remote work in five bullet points.",
    icon: Newspaper,
  },
  {
    id: "s-email",
    title: "Draft an email",
    prompt: "Draft a polite email to my manager asking to move our 1:1 meeting to Thursday.",
    icon: Mail,
  },
];
