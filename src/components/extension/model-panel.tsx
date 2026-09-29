"use client";

import { ArrowLeft } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

import { ModelList } from "@/components/shared/model-list";
import { IconButton } from "@/components/ui/icon-button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { getModel } from "@/lib/data/models";
import { pickCompareModel } from "@/store/extension.actions";
import { useExtensionStore } from "@/store/extension.store";

import { MODEL_PILL_ID } from "./popup-header";
import { useExtensionModels } from "./use-extension-models";

type Slot = "primary" | "compare";

/** Compact model picker with favourites and a "compare 2" switch (C-04). */
export function ModelPanel() {
  const setOverlay = useExtensionStore((state) => state.setOverlay);
  const { modelId, compareModelId, setPrimary, setCompare } = useExtensionModels();
  const [slot, setSlot] = useState<Slot>("primary");
  const comparing = compareModelId !== null;
  const editingCompare = comparing && slot === "compare";

  const close = () => {
    setOverlay(null);
    requestAnimationFrame(() => document.getElementById(MODEL_PILL_ID)?.focus());
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
    }
  };

  return (
    <section
      aria-labelledby="ext-model-title"
      onKeyDown={onKeyDown}
      className="absolute inset-0 z-20 flex flex-col bg-background"
    >
      <div className="flex items-center gap-1 border-b px-2 py-1.5">
        <IconButton label="Back" size="icon-sm" tooltip={false} onClick={close}>
          <ArrowLeft />
        </IconButton>
        <h3 id="ext-model-title" className="text-sm font-semibold">
          Choose model
        </h3>
      </div>

      <div className="flex items-center justify-between gap-3 border-b px-3 py-2.5">
        <label htmlFor="ext-compare" className="text-sm">
          <span className="block font-medium">Compare 2 models</span>
          <span className="block text-xs text-muted-foreground">Send each prompt to both</span>
        </label>
        <Switch
          id="ext-compare"
          checked={comparing}
          onCheckedChange={(on) => {
            setCompare(on ? pickCompareModel(modelId) : null);
            setSlot(on ? "compare" : "primary");
          }}
        />
      </div>

      {comparing && (
        <SegmentedControl
          legend="Choosing model for"
          hideLegend
          className="px-3 pt-2.5"
          value={slot}
          onChange={setSlot}
          options={[
            { value: "primary", label: getModel(modelId).name },
            { value: "compare", label: getModel(compareModelId).name },
          ]}
        />
      )}

      <ModelList
        density="compact"
        autoFocus
        className="min-h-0 flex-1"
        value={editingCompare ? (compareModelId ?? "") : modelId}
        excludeId={editingCompare ? modelId : compareModelId}
        onSelect={(id) => {
          if (editingCompare) setCompare(id);
          else setPrimary(id);
          if (!comparing) close();
        }}
      />
    </section>
  );
}
