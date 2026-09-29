import { Quote } from "lucide-react";

import { RevealItem, RevealList } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { sections } from "@/lib/data/landing";
import { testimonials } from "@/lib/data/testimonials";

import { Section } from "./section";

/** B-08: sample testimonials, clearly labelled as placeholder content. */
export function Testimonials() {
  return (
    <Section id="testimonials" copy={sections.testimonials}>
      <RevealList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((item) => (
          <RevealItem key={item.id}>
            <figure className="flex h-full flex-col rounded-2xl border bg-card p-6">
              <Quote aria-hidden="true" className="mb-4 size-6 text-primary" />
              <blockquote className="flex-1 text-pretty">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 text-sm">
                <span>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="text-muted-foreground">{item.role}</span>
                </span>
                <Badge variant="outline" size="sm">
                  Sample
                </Badge>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
