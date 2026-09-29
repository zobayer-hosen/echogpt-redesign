"use client";

import { Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { builtInPrompts } from "@/lib/data/prompts";
import { cn } from "@/lib/utils";
import { usePromptsStore } from "@/store/prompts.store";
import { useUiStore } from "@/store/ui.store";
import { PROMPT_CATEGORIES, type PromptCategory } from "@/types";

import { PromptForm } from "./prompt-form";

type Filter = PromptCategory | "All";
const filters: Filter[] = ["All", ...PROMPT_CATEGORIES];

/** Saved templates with categories; "Insert" fills the composer (A-09). */
export function PromptLibraryDialog() {
  const open = useUiStore((state) => state.promptLibraryOpen);
  const setOpen = useUiStore((state) => state.setPromptLibraryOpen);
  const insertIntoComposer = useUiStore((state) => state.insertIntoComposer);
  const userPrompts = usePromptsStore((state) => state.templates);
  const removeTemplate = usePromptsStore((state) => state.removeTemplate);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const pendingInsert = useRef<string | null>(null);

  const prompts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...userPrompts, ...builtInPrompts].filter(
      (prompt) =>
        (filter === "All" || prompt.category === filter) &&
        (!q || `${prompt.title} ${prompt.content}`.toLowerCase().includes(q)),
    );
  }, [userPrompts, filter, query]);

  const insert = (content: string) => {
    pendingInsert.current = content;
    setOpen(false);
  };

  // Runs after the close animation: send focus to the composer instead of the trigger.
  const onCloseAutoFocus = (event: Event) => {
    if (pendingInsert.current === null) return;
    event.preventDefault();
    insertIntoComposer(pendingInsert.current);
    pendingInsert.current = null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        title="Prompt library"
        description="Reuse your best prompts in any chat."
        className="max-w-2xl"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <div className="grid gap-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <label htmlFor="prompt-search" className="sr-only">
                Search prompts
              </label>
              <Input
                id="prompt-search"
                type="search"
                placeholder="Search prompts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant={creating ? "secondary" : "default"}
              onClick={() => setCreating((value) => !value)}
              aria-expanded={creating}
            >
              <Plus /> New prompt
            </Button>
          </div>

          {creating && <PromptForm onDone={() => setCreating(false)} />}

          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "h-8 rounded-full border px-3 text-sm transition-colors pointer-coarse:h-11",
                  filter === item
                    ? "border-primary bg-accent font-medium text-accent-foreground"
                    : "hover:bg-muted",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <p role="status" className="sr-only">
            {prompts.length} {prompts.length === 1 ? "prompt" : "prompts"}
          </p>
          <ul className="grid gap-2">
            {prompts.map((prompt) => (
              <li key={prompt.id} className="flex items-start gap-3 rounded-xl border p-3">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {prompt.title}
                    <Badge size="sm">{prompt.category}</Badge>
                    {!prompt.builtIn && (
                      <Badge size="sm" variant="accent">
                        Yours
                      </Badge>
                    )}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {prompt.content}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {!prompt.builtIn && (
                    <IconButton
                      label={`Delete ${prompt.title}`}
                      size="icon-sm"
                      onClick={() => removeTemplate(prompt.id)}
                    >
                      <Trash2 />
                    </IconButton>
                  )}
                  <Button size="sm" variant="outline" onClick={() => insert(prompt.content)}>
                    Insert<span className="sr-only"> {prompt.title}</span>
                  </Button>
                </div>
              </li>
            ))}
            {prompts.length === 0 && (
              <li className="py-8 text-center text-sm text-muted-foreground">
                No prompts match your search.
              </li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
