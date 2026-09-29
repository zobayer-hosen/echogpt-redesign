import {
  Brain,
  Database,
  FileText,
  Languages,
  Lightbulb,
  MessageCircle,
  Microscope,
  PenLine,
  Sigma,
} from "lucide-react";

import type { ModelTask, SectionCopy } from "@/types";

/** Section copy for the landing page (NFR-Q4: content lives in lib/data, not JSX). */

export const hero = {
  eyebrow: { badge: "New", label: "Side panel for Chrome", href: "/extension" },
  titleWords: ["Every", "top", "AI", "model."],
  titleAccent: "One sidebar.",
  description:
    "Ask GPT, Claude, Gemini and more without leaving the page you're on. Summarize articles, explain any selection and compare answers side by side.",
  primaryCta: "Add to Chrome — it's free",
  secondaryCta: "Start chatting",
  trust: "Free on the Chrome Web Store",
  worksWith: "Works with",
  /** Floating cards around the product mock (decorative, part of the illustration). */
  highlights: {
    summary: { title: "Page summarized", detail: "5 key points · Claude Sonnet" },
    providers: { label: "AI providers,\none side panel" },
    shortcut: { keys: ["Ctrl", "Shift", "E"], label: "Open on any page" },
  },
};

/** B-03 task picker: each task maps to the model we'd recommend for it. */
export const modelTasks: ModelTask[] = [
  { modelId: "gemini-flash", icon: FileText, prompt: "Summarize this article in 5 bullet points." },
  {
    modelId: "claude-sonnet",
    icon: PenLine,
    prompt: "Tighten this 2,000-word report into one clear page.",
  },
  {
    modelId: "claude-opus",
    icon: Microscope,
    prompt: "Review this pull request and flag the risky changes.",
  },
  {
    modelId: "gpt-flagship",
    icon: Brain,
    prompt: "Plan a step-by-step migration from REST to GraphQL.",
  },
  {
    modelId: "gpt-mini",
    icon: MessageCircle,
    prompt: "What's a good gift for someone who loves hiking?",
  },
  {
    modelId: "gemini-pro",
    icon: Database,
    prompt: "Compare these three survey results and spot the trends.",
  },
  { modelId: "deepseek", icon: Sigma, prompt: "Show step by step why this series converges." },
  {
    modelId: "mistral-large",
    icon: Languages,
    prompt: "Translate this email into French and German.",
  },
  { modelId: "llama", icon: Lightbulb, prompt: "Give me 10 names for a coffee subscription." },
];

export const modelShowcase = {
  listLabel: "Choose a task",
  promptLabel: "Try asking",
  speed: "Speed",
  quality: "Quality",
  context: "Context",
  contextUnit: "tokens",
  free: "Free",
  pro: "Pro",
  cta: "Try it in the web app",
};

export const sections: Record<
  "features" | "models" | "preview" | "why" | "pricing" | "faq" | "testimonials",
  SectionCopy
> = {
  features: {
    eyebrow: "Features",
    title: "Built for the way you browse",
    description:
      "Everything you need to read, write and research faster, one keyboard shortcut away.",
  },
  models: {
    eyebrow: "AI models",
    title: "The right model for every task",
    description:
      "Switch models per conversation, or send one prompt to two models and compare. Sample lineup shown.",
  },
  preview: {
    eyebrow: "Product preview",
    title: "One design, three places",
    description:
      "The web app, the extension popup and the side panel share the same components, so everything feels familiar.",
  },
  why: {
    eyebrow: "Why EchoGPT",
    title: "Stop juggling AI tabs",
    description: "One workspace instead of a separate site, account and history for every model.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Start free. Upgrade when you need more.",
    description: "Sample pricing for this concept. See echogpt.live for current plans and limits.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    description: "Can't find what you're looking for? Open the app and ask EchoGPT itself.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Loved by curious people",
    description: "Sample testimonials with placeholder names, shown for layout only.",
  },
};

export const finalCta = {
  title: "Your AI copilot for every tab",
  description: "Install in one click. No credit card, no setup, all your favourite models.",
  cta: "Add to Chrome — it's free",
  secondary: "Or try the web app",
};

export const previewTabs = [
  {
    id: "web",
    label: "Web app",
    caption: "Three-zone chat with streaming replies, compare mode and a prompt library.",
    image: "web-app",
    width: 1440,
    height: 900,
  },
  {
    id: "popup",
    label: "Extension popup",
    caption: "A 380 × 600 popup with quick actions, history and settings a tap away.",
    image: "extension-popup",
    width: 1216,
    height: 847,
  },
  {
    id: "panel",
    label: "Side panel",
    caption: "Expand into a full-height side panel that stays open beside the page.",
    image: "side-panel",
    width: 1216,
    height: 847,
  },
] as const;
