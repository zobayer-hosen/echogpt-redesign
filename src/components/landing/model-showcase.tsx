"use client";

import { ChevronRight } from "lucide-react";
import { AnimatePresence, m, useInView } from "motion/react";
import { useRef, useState } from "react";

import { ProviderMark } from "@/components/shared/provider-mark";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { modelShowcase, modelTasks } from "@/lib/data/landing";
import { getModel, getProvider } from "@/lib/data/models";
import { fadeUp, indicatorIn, inViewOnce, overlayFade, stagger, swap } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { ModelSpotlight } from "./model-spotlight";

/**
 * B-03: pick a task, see the model we'd use for it. Radix Tabs give arrow-key
 * navigation and tab/tabpanel semantics; one in-view flag drives the entrance
 * so content that swaps in later still animates from its hidden state.
 */
export function ModelShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewOnce);
  const reveal = inView ? "show" : "hidden";
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(modelTasks[0].modelId);

  const task = modelTasks.find((item) => item.modelId === active) ?? modelTasks[0];
  const model = getModel(task.modelId);

  return (
    <Tabs
      ref={ref}
      value={active}
      onValueChange={setActive}
      orientation={isDesktop ? "vertical" : "horizontal"}
      className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-10"
    >
      <TabsList
        asChild
        aria-label={modelShowcase.listLabel}
        className="-mx-4 flex snap-x [scrollbar-width:none] items-stretch gap-2 overflow-x-auto rounded-none border-0 bg-transparent px-4 py-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0"
      >
        <m.div variants={stagger} initial="hidden" animate={reveal}>
          {modelTasks.map(({ modelId, icon: Icon }) => {
            const item = getModel(modelId);
            const selected = modelId === active;
            return (
              <TabsTrigger
                key={modelId}
                value={modelId}
                asChild
                // Classes go through TabsTrigger's cn() so they override its defaults.
                className="group h-auto shrink-0 snap-start justify-start gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-left hover:bg-card/60 data-[state=active]:border-border data-[state=active]:shadow-md lg:w-full lg:px-4 lg:py-3 pointer-coarse:h-auto"
              >
                <m.button variants={fadeUp}>
                  {selected && (
                    <m.span
                      variants={indicatorIn}
                      initial="hidden"
                      animate="show"
                      aria-hidden="true"
                      className="absolute inset-y-3 left-0 hidden w-0.5 rounded-full bg-primary lg:block"
                    />
                  )}
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted transition-colors group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="grid min-w-0 leading-tight">
                    <span className="truncate font-medium text-foreground">{item.bestFor}</span>
                    <span className="mt-0.5 hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex">
                      <ProviderMark provider={item.provider} size="xs" />
                      {item.name}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="ml-auto hidden text-muted-foreground opacity-0 transition-opacity group-data-[state=active]:opacity-100 lg:block"
                  />
                </m.button>
              </TabsTrigger>
            );
          })}
        </m.div>
      </TabsList>

      <m.div variants={fadeUp} initial="hidden" animate={reveal} className="relative isolate">
        {/* Provider-tinted glow that cross-fades as the model changes. */}
        <div aria-hidden="true" className="absolute -inset-4 -z-10 opacity-25 blur-3xl lg:-inset-8">
          <AnimatePresence>
            <m.div
              key={model.provider}
              variants={overlayFade}
              initial="hidden"
              animate="show"
              exit="exit"
              className={cn(
                "absolute inset-0 rounded-full",
                getProvider(model.provider).colorClass,
              )}
            />
          </AnimatePresence>
        </div>

        <TabsContent
          value={active}
          className="overflow-hidden rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <m.div key={model.id} variants={swap} initial="hidden" animate={reveal} exit="exit">
              <ModelSpotlight model={model} task={task} />
            </m.div>
          </AnimatePresence>
        </TabsContent>
      </m.div>
    </Tabs>
  );
}
