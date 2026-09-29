import type { PromptTemplate } from "@/types";

/** Built-in prompt templates (A-09, C-03 "/" menu). */
export const builtInPrompts: PromptTemplate[] = [
  {
    id: "p-improve",
    title: "Improve writing",
    category: "Writing",
    content: "Improve the clarity and flow of the text below while keeping my voice:\n\n",
    builtIn: true,
  },
  {
    id: "p-shorter",
    title: "Make it shorter",
    category: "Writing",
    content: "Rewrite the text below in half the words without losing the key message:\n\n",
    builtIn: true,
  },
  {
    id: "p-email",
    title: "Professional email",
    category: "Writing",
    content: "Write a friendly, professional email that says:\n\n",
    builtIn: true,
  },
  {
    id: "p-explain-code",
    title: "Explain this code",
    category: "Coding",
    content: "Explain what this code does step by step, then point out any risks:\n\n```\n\n```",
    builtIn: true,
  },
  {
    id: "p-tests",
    title: "Write unit tests",
    category: "Coding",
    content: "Write unit tests covering the edge cases of this function:\n\n",
    builtIn: true,
  },
  {
    id: "p-summarize",
    title: "Summarize article",
    category: "Research",
    content: "Summarize the article below in 5 bullet points and one takeaway:\n\n",
    builtIn: true,
  },
  {
    id: "p-pros-cons",
    title: "Pros and cons",
    category: "Research",
    content: "Compare the pros and cons of the following, as a table:\n\n",
    builtIn: true,
  },
  {
    id: "p-actions",
    title: "Meeting notes → action items",
    category: "Productivity",
    content: "Turn these meeting notes into a list of action items with owners and due dates:\n\n",
    builtIn: true,
  },
  {
    id: "p-week",
    title: "Plan my week",
    category: "Productivity",
    content: "Help me plan my week. My priorities are:\n\n",
    builtIn: true,
  },
];
