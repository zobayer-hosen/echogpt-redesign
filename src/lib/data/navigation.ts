import { siteConfig } from "@/lib/site";
import type { FooterColumn, NavLink } from "@/types";

export const landingNav: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Models", href: "/#models" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Web app", href: "/chat" },
      { label: "Chrome extension", href: "/extension" },
      { label: "Features", href: "/#features" },
      { label: "AI models", href: "/#models" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "EchoGPT", href: siteConfig.productUrl, external: true },
      { label: "Chrome Web Store", href: siteConfig.chromeStoreUrl, external: true },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/#faq-privacy" },
      { label: "Source code", href: siteConfig.repoUrl, external: true },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "GitHub", href: siteConfig.repoUrl, external: true },
];
