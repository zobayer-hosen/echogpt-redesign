import {
  BookMarked,
  Columns2,
  FileText,
  Layers,
  ShieldCheck,
  TextSelect,
} from "lucide-react";

import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id: "multi-model",
    title: "Multi-model chat",
    description: "GPT, Claude, Gemini, Llama, Mistral and DeepSeek in one conversation view.",
    icon: Layers,
  },
  {
    id: "summarize",
    title: "Summarize any page",
    description: "Turn long articles, docs and threads into key points in seconds.",
    icon: FileText,
  },
  {
    id: "explain",
    title: "Explain a selection",
    description: "Highlight a tricky paragraph and get a plain-language explanation.",
    icon: TextSelect,
  },
  {
    id: "compare",
    title: "Compare answers",
    description: "Send one prompt to two models and read the replies side by side.",
    icon: Columns2,
  },
  {
    id: "prompts",
    title: "Prompt library",
    description: "Save your best prompts and insert them anywhere with a single “/”.",
    icon: BookMarked,
  },
  {
    id: "privacy",
    title: "Privacy-first",
    description: "Page content is only shared when you ask. Clear your history any time.",
    icon: ShieldCheck,
  },
];
