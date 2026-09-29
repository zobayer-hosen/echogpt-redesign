"use client";

import { Check, Lock, Star } from "lucide-react";
import { m } from "motion/react";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { getProvider, qualityLabels, speedLabels } from "@/lib/data/models";
import { pillTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { AIModel } from "@/types";

import { ProviderMark } from "./provider-mark";

interface ModelOptionProps {
  model: AIModel;
  selected: boolean;
  locked: boolean;
  favorite: boolean;
  compact: boolean;
  /** Shared layoutId so the active highlight glides between rows. */
  pillId: string;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onArrowKey: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/** One row of the model list: select button + separate favourite toggle. */
export function ModelOption({
  model,
  selected,
  locked,
  favorite,
  compact,
  pillId,
  onSelect,
  onToggleFavorite,
  onArrowKey,
}: ModelOptionProps) {
  return (
    <li className="relative flex items-center">
      {selected && (
        <m.span
          layoutId={pillId}
          transition={pillTransition}
          aria-hidden="true"
          className="absolute inset-0 rounded-lg bg-accent"
        />
      )}
      <button
        type="button"
        data-model-option
        aria-current={selected || undefined}
        aria-disabled={locked || undefined}
        onClick={onSelect}
        onKeyDown={onArrowKey}
        className={cn(
          "relative flex min-w-0 flex-1 items-center gap-3 rounded-lg px-2 text-left hover:bg-muted/70",
          compact ? "min-h-11 py-1.5" : "min-h-12 py-2",
          locked && "opacity-70",
        )}
      >
        <ProviderMark provider={model.provider} size={compact ? "sm" : "md"} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <span className="truncate">{model.name}</span>
            {locked && (
              <Badge size="sm" variant="outline">
                <Lock aria-hidden="true" /> Pro
              </Badge>
            )}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {getProvider(model.provider).name} · {model.bestFor}
          </span>
        </span>
        <span className="flex shrink-0 gap-1">
          <Badge size="sm">{speedLabels[model.speed]}</Badge>
          {!compact && (
            <Badge size="sm" className="hidden sm:inline-flex">
              {qualityLabels[model.quality]}
            </Badge>
          )}
        </span>
        {selected && <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />}
        {selected && <span className="sr-only">(current model)</span>}
      </button>
      <button
        type="button"
        aria-pressed={favorite}
        aria-label={`${favorite ? "Remove" : "Add"} ${model.name} ${favorite ? "from" : "to"} favorites`}
        onClick={onToggleFavorite}
        className="relative grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground pointer-coarse:size-11"
      >
        <Star
          aria-hidden="true"
          className={cn("size-4", favorite && "fill-primary text-primary")}
        />
      </button>
    </li>
  );
}
