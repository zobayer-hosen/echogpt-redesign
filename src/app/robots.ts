import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Individual conversations only exist in a visitor's browser.
    rules: { userAgent: "*", allow: "/", disallow: "/chat/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
