"use client";

import { FileText, Plus, TextSelect, X } from "lucide-react";

import { demoArticle } from "@/lib/data/demo-article";
import { cn, truncate } from "@/lib/utils";
import { useExtensionStore } from "@/store/extension.store";

const chipClass = "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full text-xs";

/**
 * Shows which page or selection is attached to the next prompt (C-08) and
 * toggles it (C-03). Removing a selection falls back to the whole page.
 */
export function ContextChip() {
  const attached = useExtensionStore((state) => state.contextAttached);
  const selection = useExtensionStore((state) => state.selection);
  const setAttached = useExtensionStore((state) => state.setContextAttached);

  if (!attached) {
    return (
      <button
        type="button"
        onClick={() => setAttached(true)}
        className={cn(
          chipClass,
          "border border-dashed border-input px-2.5 text-muted-foreground hover:text-foreground pointer-coarse:h-9",
        )}
      >
        <Plus aria-hidden="true" className="size-3.5" /> Attach this page
      </button>
    );
  }

  const isSelection = selection.length > 0;
  const Icon = isSelection ? TextSelect : FileText;

  return (
    <span className={cn(chipClass, "border bg-accent pr-0.5 pl-2.5 text-accent-foreground")}>
      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="truncate">
        {isSelection
          ? `Selection · “${truncate(selection, 34)}”`
          : `Page · ${truncate(demoArticle.title, 30)}`}
      </span>
      <button
        type="button"
        aria-label={isSelection ? "Remove selection (use the whole page)" : "Remove page context"}
        onClick={() =>
          isSelection ? useExtensionStore.getState().setSelection("") : setAttached(false)
        }
        className="grid size-6 shrink-0 place-items-center rounded-full hover:bg-background/60 pointer-coarse:size-8"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </span>
  );
}
