"use client";

import { BookMarked } from "lucide-react";

import { cn, truncate } from "@/lib/utils";
import type { PromptTemplate } from "@/types";

interface SlashMenuProps {
  id: string;
  prompts: PromptTemplate[];
  activeIndex: number;
  onSelect: (prompt: PromptTemplate) => void;
  onHover: (index: number) => void;
}

export function slashOptionId(menuId: string, index: number) {
  return `${menuId}-option-${index}`;
}

/**
 * "/" saved-prompt menu (C-03). Focus stays in the textarea; the active option
 * is exposed with aria-activedescendant, so arrow keys and screen readers work.
 */
export function SlashMenu({ id, prompts, activeIndex, onSelect, onHover }: SlashMenuProps) {
  return (
    <div className="absolute inset-x-0 bottom-full z-20 mb-2 animate-pop-in overflow-hidden rounded-xl border bg-card shadow-xl">
      <p className="flex items-center gap-1.5 border-b px-3 py-2 text-xs font-medium text-muted-foreground">
        <BookMarked aria-hidden="true" className="size-3.5" /> Saved prompts
      </p>
      <ul
        id={id}
        role="listbox"
        aria-label="Saved prompts"
        className="max-h-64 overflow-y-auto p-1"
      >
        {prompts.map((prompt, index) => (
          <li
            key={prompt.id}
            id={slashOptionId(id, index)}
            role="option"
            aria-selected={index === activeIndex}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(prompt)}
            onMouseEnter={() => onHover(index)}
            className={cn(
              "flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2",
              index === activeIndex && "bg-muted",
            )}
          >
            <span className="flex items-center justify-between gap-2 text-sm font-medium">
              {prompt.title}
              <span className="text-xs font-normal text-muted-foreground">{prompt.category}</span>
            </span>
            <span className="text-xs text-muted-foreground">{truncate(prompt.content, 70)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
