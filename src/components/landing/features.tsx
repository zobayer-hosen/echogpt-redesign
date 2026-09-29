import { RevealItem, RevealList } from "@/components/shared/reveal";
import { features } from "@/lib/data/features";
import { sections } from "@/lib/data/landing";

import { Section } from "./section";

/** B-02: six feature cards. */
export function Features() {
  return (
    <Section id="features" copy={sections.features}>
      <RevealList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {features.map(({ id, title, description, icon: Icon }) => (
          <RevealItem key={id} className="rounded-2xl border bg-card p-6">
            <span className="mb-5 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
