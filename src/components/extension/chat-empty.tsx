"use client";

import { LogoMark } from "@/components/shared/logo";
import { demoArticle } from "@/lib/data/demo-article";
import { quickActions } from "@/lib/data/quick-actions";
import { truncate } from "@/lib/utils";
import { runQuickAction } from "@/store/extension.actions";
import { useExtensionStore } from "@/store/extension.store";

const SUGGESTED = ["summarize", "key-points", "explain"];

/** Empty chat tab: a greeting and one-tap actions for the current page. */
export function ChatEmpty() {
  const selection = useExtensionStore((state) => state.selection);
  const suggestions = quickActions.filter(
    (action) => SUGGESTED.includes(action.id) && (action.requires !== "selection" || selection),
  );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
      <LogoMark className="size-10" />
      <div>
        <h3 className="font-semibold">Ask about this page</h3>
        <p className="mt-1 text-sm text-muted-foreground">{truncate(demoArticle.title, 60)}</p>
      </div>
      <ul className="mt-1 flex flex-wrap justify-center gap-2">
        {suggestions.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              onClick={() => runQuickAction(action)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-card px-3 text-xs font-medium hover:border-primary/50 hover:bg-accent/40 pointer-coarse:h-11"
            >
              <action.icon aria-hidden="true" className="size-3.5 text-primary" />
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
