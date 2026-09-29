"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getModel } from "@/lib/data/models";
import { cn } from "@/lib/utils";

import { ModelList } from "./model-list";
import { ProviderMark } from "./provider-mark";

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
  excludeId?: string | null;
  /** Prefix for the accessible name, e.g. "Model" or "Compare with". */
  label?: string;
  align?: "start" | "center" | "end";
  className?: string;
}

/** Header dropdown showing the current model; opens the searchable ModelList (A-04). */
export function ModelSelector({
  value,
  onChange,
  excludeId,
  label = "Model",
  align = "start",
  className,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const model = getModel(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`${label}: ${model.name}. Change model`}
          className={cn("min-w-0 gap-2 px-2.5 font-semibold", className)}
        >
          <ProviderMark provider={model.provider} size="sm" />
          <span className="truncate">{model.name}</span>
          <ChevronDown aria-hidden="true" className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-104">
        <ModelList
          value={value}
          excludeId={excludeId}
          autoFocus
          onSelect={(id) => {
            onChange(id);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
