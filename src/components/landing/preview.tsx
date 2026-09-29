import { sections } from "@/lib/data/landing";

import { PreviewTabs } from "./preview-tabs";
import { Section } from "./section";

/** B-04: product preview. */
export function Preview() {
  return (
    <Section id="preview" copy={sections.preview}>
      <PreviewTabs />
    </Section>
  );
}
