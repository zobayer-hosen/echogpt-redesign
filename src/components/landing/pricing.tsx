import { sections } from "@/lib/data/landing";

import { PricingPlans } from "./pricing-plans";
import { Section } from "./section";

/** B-06: pricing. */
export function Pricing() {
  return (
    <Section id="pricing" copy={sections.pricing} className="bg-muted/40">
      <PricingPlans />
    </Section>
  );
}
