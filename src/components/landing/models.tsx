import { sections } from "@/lib/data/landing";

import { ModelShowcase } from "./model-showcase";
import { Section } from "./section";

/** B-03: task picker with a model spotlight, from lib/data/models.ts and landing.ts. */
export function Models() {
  return (
    <Section id="models" copy={sections.models} className="overflow-hidden bg-muted/40">
      <ModelShowcase />
    </Section>
  );
}
