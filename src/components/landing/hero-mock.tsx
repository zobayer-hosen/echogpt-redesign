import { ChevronDown, Columns2, SendHorizontal } from "lucide-react";

import { LogoMark } from "@/components/shared/logo";
import { ProviderMark } from "@/components/shared/provider-mark";
import { getModel } from "@/lib/data/models";
import { cn } from "@/lib/utils";

const left = getModel("claude-sonnet");
const right = getModel("gemini-flash");

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="grid gap-1.5">
      {widths.map((width, index) => (
        <span key={index} className={cn("h-2 rounded-full bg-muted", width)} />
      ))}
    </div>
  );
}

/**
 * Animated product illustration (B-01): a page with the side panel comparing
 * two models. Pure markup + CSS animation; exposed as a single image to AT.
 */
export function HeroMock() {
  return (
    <div
      role="img"
      aria-label="EchoGPT side panel beside a web page, comparing answers from Claude Sonnet and Gemini Flash"
      className="animate-mock-in"
    >
      <div className="animate-float">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-provider-mistral/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
            <span className="ml-3 h-6 flex-1 rounded-md bg-card" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.35fr]">
            <div className="hidden gap-5 border-r p-5 sm:grid">
              <span className="h-4 w-3/4 rounded-full bg-foreground/15" />
              <Lines widths={["w-full", "w-11/12", "w-4/5", "w-full", "w-2/3"]} />
              <span className="h-20 rounded-xl bg-accent" />
              <Lines widths={["w-full", "w-5/6", "w-3/4"]} />
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

              <span className="ml-auto rounded-2xl rounded-br-md bg-accent px-3 py-2 text-xs text-accent-foreground">
                Summarize this page
              </span>

              <div className="grid grid-cols-2 gap-2">
                {[left, right].map((model) => (
                  <div key={model.id} className="rounded-xl border bg-background p-2.5">
                    <span className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium">
                      <ProviderMark provider={model.provider} size="xs" />
                      {model.name}
                    </span>
                    <Lines widths={["w-full", "w-11/12", "w-4/5", "w-full", "w-3/5"]} />
                  </div>
                ))}
              </div>

              <div className="mt-1 flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                <span className="flex-1 text-xs text-muted-foreground">Ask anything…</span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[0.625rem] text-muted-foreground">
                  {left.name} <ChevronDown className="size-3" />
                </span>
                <span className="grid size-6 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <SendHorizontal className="size-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
