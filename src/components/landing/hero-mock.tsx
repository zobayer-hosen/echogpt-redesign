"use client";

import { ChevronDown, Columns2, SendHorizontal } from "lucide-react";
import { m } from "motion/react";

import { LogoMark } from "@/components/shared/logo";
import { ProviderMark } from "@/components/shared/provider-mark";
import { getModel } from "@/lib/data/models";
import { lineGrow, popIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const left = getModel("claude-sonnet");
const right = getModel("gemini-flash");

const ANSWER_LINES = ["w-full", "w-11/12", "w-4/5", "w-full", "w-3/5"];

function Lines({ widths, delay }: { widths: string[]; delay: number }) {
  return (
    <div className="grid gap-1.5">
      {widths.map((width, index) => (
        <m.span
          key={index}
          variants={lineGrow}
          custom={delay + index * 0.08}
          className={cn("h-2 origin-left rounded-full bg-muted", width)}
        />
      ))}
    </div>
  );
}

/**
 * Product illustration (B-01): a page with the side panel comparing two
 * models. Pieces pop in and the answers "stream" in as the hero variants
 * cascade down from HeroVisual. Decorative; HeroVisual labels it for AT.
 */
export function HeroMock() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl ring-1 shadow-primary/15 ring-primary/5">
      <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-provider-mistral/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
        <span className="ml-3 h-6 flex-1 rounded-md bg-card" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.35fr]">
        <div className="hidden content-start gap-5 border-r p-5 sm:grid">
          <m.span
            variants={lineGrow}
            custom={0.5}
            className="h-4 w-3/4 origin-left rounded-full bg-foreground/15"
          />
          <Lines widths={["w-full", "w-11/12", "w-4/5", "w-full", "w-2/3"]} delay={0.6} />
          <m.span variants={popIn} custom={0.9} className="h-20 rounded-xl bg-accent" />
          <Lines widths={["w-full", "w-5/6", "w-3/4"]} delay={1} />
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <LogoMark className="size-6" /> EchoGPT
            </span>
            <span className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground">
              <Columns2 className="size-3" /> Compare
            </span>
          </div>

          <m.span
            variants={popIn}
            custom={0.8}
            className="ml-auto rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs text-primary-foreground shadow-sm"
          >
            Summarize this page
          </m.span>

          <div className="grid grid-cols-2 gap-2">
            {[left, right].map((model, index) => (
              <m.div
                key={model.id}
                variants={popIn}
                custom={1.05 + index * 0.15}
                className="rounded-xl border bg-background p-2.5"
              >
                <span className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium">
                  <ProviderMark provider={model.provider} size="xs" />
                  {model.name}
                </span>
                <Lines widths={ANSWER_LINES} delay={1.25 + index * 0.2} />
              </m.div>
            ))}
          </div>

          <m.div
            variants={popIn}
            custom={0.65}
            className="mt-1 flex items-center gap-2 rounded-xl border bg-background px-3 py-2"
          >
            <span className="flex-1 text-xs text-muted-foreground">Ask anything…</span>
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[0.625rem] text-muted-foreground">
              {left.name} <ChevronDown className="size-3" />
            </span>
            <span className="grid size-6 place-items-center rounded-lg bg-primary text-primary-foreground">
              <SendHorizontal className="size-3" />
            </span>
          </m.div>
        </div>
      </div>
    </div>
  );
}
