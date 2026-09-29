"use client";

import { Plus, Sparkles, X } from "lucide-react";
import { m } from "motion/react";

import { demoArticle } from "@/lib/data/demo-article";
import { quickActions } from "@/lib/data/quick-actions";
import { tapPress } from "@/lib/motion";
import { cn, truncate } from "@/lib/utils";
import { attachedContext, runExtensionPrompt, runQuickAction } from "@/store/extension.actions";
import { useExtensionStore } from "@/store/extension.store";
import { usePromptsStore } from "@/store/prompts.store";

const SAMPLE_SELECTION = demoArticle.paragraphs[1].split(". ")[1] ?? demoArticle.paragraphs[1];
const tileClass =
  "flex h-full w-full flex-col items-start gap-1.5 rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/30";

/** Grid of six quick actions, custom actions and "Create custom action" (C-06). */
export function QuickActionsTab() {
  const selection = useExtensionStore((state) => state.selection);
  const setSelection = useExtensionStore((state) => state.setSelection);
  const setOverlay = useExtensionStore((state) => state.setOverlay);
  const customActions = usePromptsStore((state) => state.customActions);
  const removeCustomAction = usePromptsStore((state) => state.removeCustomAction);

  return (
    <div className="h-full overflow-y-auto p-3">
      <h3 className="text-sm font-semibold">Quick actions</h3>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">
        Runs on “{truncate(demoArticle.title, 36)}”{selection ? " and your selection" : ""}.
      </p>

      <ul className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => {
          const needsSelection = action.requires === "selection" && !selection;
          return (
            <li key={action.id}>
              <m.button
                type="button"
                whileTap={needsSelection ? undefined : tapPress}
                aria-disabled={needsSelection || undefined}
                aria-describedby={needsSelection ? "ext-selection-hint" : undefined}
                onClick={() => !needsSelection && runQuickAction(action)}
                className={cn(
                  tileClass,
                  needsSelection &&
                    "cursor-not-allowed opacity-60 hover:border-border hover:bg-card",
                )}
              >
                <action.icon aria-hidden="true" className="size-4 text-primary" />
                <span className="text-sm font-medium">{action.label}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </m.button>
            </li>
          );
        })}

        {customActions.map((action) => (
          <li key={action.id} className="relative">
            <m.button
              type="button"
              whileTap={tapPress}
              onClick={() =>
                runExtensionPrompt({
                  content: action.prompt,
                  context: attachedContext(),
                  title: action.label,
                })
              }
              className={cn(tileClass, "pr-8")}
            >
              <Sparkles aria-hidden="true" className="size-4 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
              <span className="line-clamp-1 text-xs text-muted-foreground">{action.prompt}</span>
            </m.button>
            <button
              type="button"
              aria-label={`Delete custom action ${action.label}`}
              onClick={() => removeCustomAction(action.id)}
              className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted pointer-coarse:size-10"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </li>
        ))}

        <li className="col-span-2">
          <button
            type="button"
            onClick={() => setOverlay("custom-action")}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-input text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Plus aria-hidden="true" className="size-4" /> Create custom action
          </button>
        </li>
      </ul>

      {!selection && (
        <p id="ext-selection-hint" className="mt-3 text-xs text-muted-foreground">
          Select text in the article to enable selection actions, or{" "}
          <button
            type="button"
            onClick={() => setSelection(SAMPLE_SELECTION)}
            className="font-medium text-primary underline underline-offset-2"
          >
            use a sample sentence
          </button>
          .
        </p>
      )}
    </div>
  );
}
