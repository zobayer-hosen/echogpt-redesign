"use client";

import { ArrowRight, Lock } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";

import { ProviderMark } from "@/components/shared/provider-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { modelShowcase as copy } from "@/lib/data/landing";
import { getProvider, qualityLabels, speedLabels } from "@/lib/data/models";
import { lineGrow, swapItem } from "@/lib/motion";
import type { AIModel, ModelSpeed, ModelTask } from "@/types";

/** Faster models fill more of the speed meter. */
const speedLevel: Record<ModelSpeed, number> = { fast: 3, balanced: 2, deep: 1 };
const STEPS = [1, 2, 3];

/** Three-step meter whose bars grow in; the text label next to it carries the value. */
function Meter({ value, delay }: { value: number; delay: number }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {STEPS.map((step) => (
        <span key={step} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          {step <= value && (
            <m.span
              variants={lineGrow}
              custom={delay + step * 0.08}
              className="block h-full origin-left rounded-full bg-primary"
            />
          )}
        </span>
      ))}
    </span>
  );
}

interface ModelSpotlightProps {
  model: AIModel;
  task: ModelTask;
}

/**
 * B-03 spotlight for the selected task's model. Each block is a `swapItem`, so
 * it staggers in whenever the parent `swap` container is keyed to a new model.
 */
export function ModelSpotlight({ model, task }: ModelSpotlightProps) {
  const provider = getProvider(model.provider);

  return (
    <>
      <m.div variants={swapItem} className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <ProviderMark provider={model.provider} size="lg" />
          <span className="grid leading-tight">
            <span className="text-sm font-semibold">{provider.name}</span>
            <span className="text-sm text-muted-foreground">{model.bestFor}</span>
          </span>
        </span>
        {model.tier === "pro" ? (
          <Badge variant="primary">
            <Lock aria-hidden="true" /> {copy.pro}
          </Badge>
        ) : (
          <Badge variant="accent">{copy.free}</Badge>
        )}
      </m.div>

      <m.h3
        variants={swapItem}
        className="mt-6 font-display text-4xl leading-none tracking-tight sm:text-5xl"
      >
        {model.name}
      </m.h3>
      <m.p variants={swapItem} className="mt-3 text-lg text-pretty text-muted-foreground">
        {model.description}
      </m.p>

      <m.figure variants={swapItem} className="mt-6 rounded-2xl border bg-muted/50 p-4">
        <figcaption className="text-xs font-semibold tracking-wide text-primary uppercase">
          {copy.promptLabel}
        </figcaption>
        <blockquote className="mt-1.5 text-base">“{task.prompt}”</blockquote>
      </m.figure>

      <m.dl variants={swapItem} className="mt-6 grid grid-cols-3 gap-4 sm:gap-6">
        <div className="grid content-start gap-2">
          <dt className="text-xs text-muted-foreground">{copy.speed}</dt>
          <dd className="grid gap-2">
            <Meter value={speedLevel[model.speed]} delay={0.2} />
            <span className="text-sm font-medium">{speedLabels[model.speed]}</span>
          </dd>
        </div>
        <div className="grid content-start gap-2">
          <dt className="text-xs text-muted-foreground">{copy.quality}</dt>
          <dd className="grid gap-2">
            <Meter value={model.quality} delay={0.3} />
            <span className="text-sm font-medium">{qualityLabels[model.quality]}</span>
          </dd>
        </div>
        <div className="grid content-start gap-1">
          <dt className="text-xs text-muted-foreground">{copy.context}</dt>
          <dd className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl leading-none text-primary">
              {model.contextWindow}
            </span>
            <span className="text-xs text-muted-foreground">{copy.contextUnit}</span>
          </dd>
        </div>
      </m.dl>

      <m.div variants={swapItem} className="mt-8">
        <Button asChild variant="outline" className="group">
          <Link href="/chat">
            {copy.cta}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </m.div>
    </>
  );
}
