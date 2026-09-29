import { faqs } from "@/lib/data/faq";
import { sections } from "@/lib/data/landing";

import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { Section } from "./section";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/** B-07: accessible accordion + FAQPage structured data. */
export function Faq() {
  return (
    <Section id="faq" copy={sections.faq}>
      <FaqAccordion />
      <JsonLd data={faqSchema} />
    </Section>
  );
}
