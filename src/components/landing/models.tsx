import { Lock } from "lucide-react";

import { ProviderMark } from "@/components/shared/provider-mark";
import { RevealItem, RevealList } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { sections } from "@/lib/data/landing";
import { getProvider, models, qualityLabels, speedLabels } from "@/lib/data/models";

import { Section } from "./section";

/** B-03: model grid with "best for" tags, from lib/data/models.ts. */
export function Models() {
  return (
    <Section id="models" copy={sections.models} className="bg-muted/40">
      <RevealList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <RevealItem key={model.id} lift className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <ProviderMark provider={model.provider} size="lg" />
              <div className="min-w-0 flex-1">
                <h3 className="flex items-center gap-2 font-semibold">
                  {model.name}
                  {model.tier === "pro" && (
                    <Badge variant="accent" size="sm">
                      <Lock aria-hidden="true" /> Pro
                    </Badge>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{getProvider(model.provider).name}</p>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm text-muted-foreground">{model.description}</p>
            <dl className="mt-4 flex flex-wrap gap-2 text-xs">
              <div className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">
                <dt className="sr-only">Best for</dt>
                <dd>{model.bestFor}</dd>
              </div>
              <div className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                <dt className="inline">Speed: </dt>
                <dd className="inline">{speedLabels[model.speed]}</dd>
              </div>
              <div className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                <dt className="inline">Quality: </dt>
                <dd className="inline">{qualityLabels[model.quality]}</dd>
              </div>
            </dl>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
