"use client";

import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faq";

/** Radix accordion: arrow keys, Home/End and aria-expanded come for free. */
export function FaqAccordion() {
  return (
    <Reveal className="mx-auto max-w-3xl rounded-2xl border bg-card px-5 sm:px-8">
      <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  );
}
