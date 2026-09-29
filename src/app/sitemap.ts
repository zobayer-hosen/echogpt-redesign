import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/chat`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/extension`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
