import { FileText, Languages, ListChecks, Reply, TextSelect, WandSparkles } from "lucide-react";

import type { QuickAction } from "@/types";

/** Extension quick actions (C-06). `{{selection}}` / `{{page}}` are filled in at run time. */
export const quickActions: QuickAction[] = [
  {
    id: "summarize",
    label: "Summarize page",
    description: "Short summary of this page",
    icon: FileText,
    prompt: "Summarize this page: {{page}}",
    requires: "page",
  },
  {
    id: "explain",
    label: "Explain selection",
    description: "Plain-language explanation",
    icon: TextSelect,
    prompt: "Explain this in simple terms: “{{selection}}”",
    requires: "selection",
  },
  {
    id: "translate",
    label: "Translate",
    description: "Into your chosen language",
    icon: Languages,
    prompt: "Translate the opening of this page: {{page}}",
    requires: "page",
  },
  {
    id: "rewrite",
    label: "Rewrite / improve",
    description: "Clearer, tighter wording",
    icon: WandSparkles,
    prompt: "Rewrite and improve: “{{selection}}”",
    requires: "selection",
  },
  {
    id: "key-points",
    label: "Key points",
    description: "Bullet list of main ideas",
    icon: ListChecks,
    prompt: "List the key points of: {{page}}",
    requires: "page",
  },
  {
    id: "reply-email",
    label: "Reply to email",
    description: "Draft a reply in your tone",
    icon: Reply,
    prompt: "Draft a reply to the email on this page: {{page}}",
    requires: "page",
  },
];

/** Replace template tokens with the current page / selection. */
export function fillActionPrompt(prompt: string, values: { page: string; selection: string }) {
  return prompt.replaceAll("{{page}}", values.page).replaceAll("{{selection}}", values.selection);
}
