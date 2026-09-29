import { siteConfig } from "@/lib/site";
import type { PricingPlan } from "@/types";

/** Sample pricing for the concept — clearly labelled on the page. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For trying EchoGPT and light daily use.",
    price: { monthly: 0, yearly: 0 },
    unit: "forever",
    features: [
      "6 free models",
      "Page summaries & explain selection",
      "30 messages per day",
      "Saved history on this device",
    ],
    cta: { label: "Add to Chrome", href: siteConfig.chromeStoreUrl, external: true },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who use AI every day.",
    price: { monthly: 12, yearly: 9 },
    unit: "per month",
    features: [
      "Every model, including Pro models",
      "Compare mode & unlimited prompts",
      "Higher daily limits",
      "Priority speed at peak times",
    ],
    cta: { label: "Start with Pro", href: "/chat" },
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams sharing prompts and workflows.",
    price: { monthly: 20, yearly: 16 },
    unit: "per user / month",
    features: [
      "Everything in Pro",
      "Shared prompt library",
      "Central billing & seats",
      "Admin controls",
    ],
    cta: { label: "Contact sales", href: siteConfig.productUrl, external: true },
  },
];

export const YEARLY_SAVING_LABEL = "Save 25%";
