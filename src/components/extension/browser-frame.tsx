"use client";

import { ArrowLeft, ArrowRight, Lock, Newspaper, Puzzle, RotateCw } from "lucide-react";
import type { ReactNode } from "react";

import { LogoMark } from "@/components/shared/logo";
import { Tooltip } from "@/components/ui/tooltip";
import { demoArticle } from "@/lib/data/demo-article";
import { cn } from "@/lib/utils";
import { useExtensionStore } from "@/store/extension.store";

export const POPUP_ID = "echogpt-extension";

function ToolbarButton() {
  const open = useExtensionStore((state) => state.open);
  const toggleOpen = useExtensionStore((state) => state.toggleOpen);

  return (
    <Tooltip content="EchoGPT (Ctrl/Cmd+Shift+E)">
      <button
        type="button"
        aria-label="EchoGPT extension"
        aria-expanded={open}
        aria-controls={POPUP_ID}
        onClick={toggleOpen}
        className={cn(
          "grid size-8 place-items-center rounded-md transition-colors hover:bg-muted pointer-coarse:size-11",
          open && "bg-accent",
        )}
      >
        <LogoMark className="size-5" />
      </button>
    </Tooltip>
  );
}

/** A lightweight Chrome window: tab strip, address bar and the extension icon. */
export function BrowserFrame({ children }: { children: ReactNode }) {
  const url = demoArticle.url.replace(/^https:\/\//, "");

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
      <div className="flex items-end gap-3 bg-muted px-3 pt-2" aria-hidden="true">
        <span className="mb-3 flex gap-1.5">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-provider-mistral/70" />
          <span className="size-3 rounded-full bg-success/70" />
        </span>
        <span className="flex max-w-64 min-w-0 items-center gap-2 rounded-t-lg bg-card px-3 py-2 text-xs">
          <Newspaper className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{demoArticle.title}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 border-b px-2 py-1.5 sm:px-3">
        <span
          className="hidden items-center gap-3 px-1 text-muted-foreground sm:flex"
          aria-hidden="true"
        >
          <ArrowLeft className="size-4" />
          <ArrowRight className="size-4" />
          <RotateCw className="size-4" />
        </span>
        <p className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          <Lock aria-hidden="true" className="size-3 shrink-0" />
          <span className="sr-only">Address:</span>
          <span className="truncate">{url}</span>
        </p>
        <Puzzle aria-hidden="true" className="hidden size-4 text-muted-foreground sm:block" />
        <ToolbarButton />
      </div>

      {children}
    </div>
  );
}
