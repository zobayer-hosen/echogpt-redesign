import { Cta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { JsonLd } from "@/components/landing/json-ld";
import { Models } from "@/components/landing/models";
import { Preview } from "@/components/landing/preview";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { WhyUs } from "@/components/landing/why-us";
import { siteConfig } from "@/lib/site";

// Fully static: rendered once at build time (NFR-P1).
export const dynamic = "force-static";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  applicationCategory: "BrowserApplication",
  operatingSystem: "Chrome, Web",
  url: siteConfig.url,
  downloadUrl: siteConfig.chromeStoreUrl,
  softwareVersion: siteConfig.extensionVersion,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "AppifyDevs" },
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Models />
      <Preview />
      <WhyUs />
      <Pricing />
      <Faq />
      <Testimonials />
      <Cta />
      <JsonLd data={softwareSchema} />
    </>
  );
}
