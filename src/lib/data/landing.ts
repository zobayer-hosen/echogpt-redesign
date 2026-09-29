import type { SectionCopy } from "@/types";

/** Section copy for the landing page (NFR-Q4: content lives in lib/data, not JSX). */

export const hero = {
  eyebrow: "New · Side panel for Chrome",
  titleWords: ["Every", "top", "AI", "model."],
  titleAccent: "One sidebar.",
  description:
    "Ask GPT, Claude, Gemini and more without leaving the page you're on. Summarize articles, explain any selection and compare answers side by side.",
  primaryCta: "Add to Chrome — it's free",
  secondaryCta: "Start chatting",
  trust: "Free on the Chrome Web Store",
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
