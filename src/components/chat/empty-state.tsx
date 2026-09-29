"use client";

import { m } from "motion/react";

import { LogoMark } from "@/components/shared/logo";
import { suggestedPrompts } from "@/lib/data/suggestions";
import { fadeUp, stagger } from "@/lib/motion";
import { greeting } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";

/** Greeting + four suggestion cards that fill the composer (A-05). */
export function EmptyState() {
  const insertIntoComposer = useUiStore((state) => state.insertIntoComposer);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8 sm:justify-center">
      <LogoMark className="size-12" />
      <p className="mt-5 text-muted-foreground">
        {greeting()} <span aria-hidden="true">👋</span>
      </p>
      <h1 className="mt-1 text-center font-display text-4xl text-balance sm:text-5xl">
        How can I help you today?
      </h1>

      <m.ul
        variants={stagger}
        initial="hidden"
        animate="show"
        aria-label="Suggested prompts"
        className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-2"
      >
        {suggestedPrompts.map(({ id, title, prompt, icon: Icon }) => (
          <m.li key={id} variants={fadeUp}>
            <button
              type="button"
              onClick={() => insertIntoComposer(prompt)}
              className="flex h-full w-full items-start gap-3 rounded-2xl border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{title}</span>
                <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{prompt}</span>
              </span>
            </button>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
