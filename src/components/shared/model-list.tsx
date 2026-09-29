"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useId, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { getProvider, models } from "@/lib/data/models";
import { demoUser } from "@/lib/data/user";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/settings.store";
import type { AIModel } from "@/types";

import { ModelOption } from "./model-option";

interface ModelListProps {
  value: string;
  onSelect: (modelId: string) => void;
  excludeId?: string | null;
  density?: "default" | "compact";
  autoFocus?: boolean;
  className?: string;
}

function matches(model: AIModel, query: string) {
  const haystack =
    `${model.name} ${getProvider(model.provider).name} ${model.bestFor}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

/**
 * Searchable model list with favourites pinned on top, speed/quality tags and
 * Pro locks (A-04, C-04). Arrow keys move between models.
 */
export function ModelList({
  value,
  onSelect,
  excludeId,
  density = "default",
  autoFocus,
  className,
}: ModelListProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const favorites = useSettingsStore((state) => state.favoriteModelIds);
  const toggleFavorite = useSettingsStore((state) => state.toggleFavorite);
  const compact = density === "compact";
  const canUsePro = demoUser.plan === "pro";

  const groups = useMemo(() => {
    const visible = models.filter((model) => model.id !== excludeId && matches(model, query));
    const pinned = visible.filter((model) => favorites.includes(model.id));
    const rest = visible.filter((model) => !favorites.includes(model.id));
    return [
      { label: "Favorites", items: pinned },
      { label: pinned.length ? "All models" : "Models", items: rest },
    ].filter((group) => group.items.length > 0);
  }, [excludeId, favorites, query]);

  const moveFocus = (event: KeyboardEvent, from?: HTMLElement) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const options = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[data-model-option]") ?? [],
    );
    if (!options.length) return;
    event.preventDefault();
    const index = from ? options.indexOf(from) : -1;
    const next =
      event.key === "ArrowDown" ? Math.min(index + 1, options.length - 1) : Math.max(index - 1, 0);
    options[next]?.focus();
  };

  const select = (model: AIModel) => {
    if (model.tier === "pro" && !canUsePro) {
      toast(`${model.name} is a Pro model`, {
        description: "Upgrade to Pro to unlock every model.",
      });
      return;
    }
    onSelect(model.id);
  };

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="relative border-b p-2">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <label htmlFor={`${id}-search`} className="sr-only">
          Search models
        </label>
        <Input
          id={`${id}-search`}
          type="search"
          autoFocus={autoFocus}
          placeholder="Search models"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => moveFocus(event)}
          className="border-transparent bg-muted pl-9"
        />
      </div>

      <div
        ref={listRef}
        className={cn("min-h-0 overflow-y-auto p-1", !compact && "max-h-[min(24rem,60dvh)]")}
      >
        {groups.map((group, index) => (
          <div
            key={group.label}
            role="group"
            aria-labelledby={`${id}-group-${index}`}
            className="py-1"
          >
            <p
              id={`${id}-group-${index}`}
              className="px-2 pt-1 pb-1.5 text-xs font-medium text-muted-foreground"
            >
              {group.label}
            </p>
            <ul className="grid gap-0.5">
              {group.items.map((model) => (
                <ModelOption
                  key={model.id}
                  model={model}
                  selected={model.id === value}
                  locked={model.tier === "pro" && !canUsePro}
                  favorite={favorites.includes(model.id)}
                  compact={compact}
                  pillId={`${id}-active`}
                  onSelect={() => select(model)}
                  onToggleFavorite={() => toggleFavorite(model.id)}
                  onArrowKey={(event) => moveFocus(event, event.currentTarget)}
                />
              ))}
            </ul>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            No models match “{query}”.
          </p>
        )}
      </div>

      {!canUsePro && (
        <p className="border-t px-3 py-2.5 text-xs text-muted-foreground">
          Pro models are locked on the Free plan.{" "}
          <Link
            href="/#pricing"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            See plans
          </Link>
        </p>
      )}
    </div>
  );
}
