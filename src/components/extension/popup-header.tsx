"use client";

import { ChevronDown, PanelRight, PanelRightClose, Settings, X } from "lucide-react";

import { LogoMark } from "@/components/shared/logo";
import { ProviderMark } from "@/components/shared/provider-mark";
import { IconButton } from "@/components/ui/icon-button";
import { getModel } from "@/lib/data/models";
import { useExtensionStore } from "@/store/extension.store";

import { useExtensionModels } from "./use-extension-models";

export const MODEL_PILL_ID = "ext-model-pill";

/** Logo, model pill, side-panel toggle and settings (C-01). */
export function PopupHeader() {
  const mode = useExtensionStore((state) => state.mode);
  const overlay = useExtensionStore((state) => state.overlay);
  const setOverlay = useExtensionStore((state) => state.setOverlay);
  const setMode = useExtensionStore((state) => state.setMode);
  const setTab = useExtensionStore((state) => state.setTab);
  const setOpen = useExtensionStore((state) => state.setOpen);
  const { modelId, compareModelId } = useExtensionModels();
  const model = getModel(modelId);
  const compare = compareModelId ? getModel(compareModelId) : null;
  const inPanel = mode === "sidepanel";

  return (
    <header className="flex h-13 shrink-0 items-center gap-1.5 border-b px-2">
      <LogoMark className="size-7" />
      <span className="sr-only">EchoGPT</span>
      <button
        id={MODEL_PILL_ID}
        type="button"
        aria-expanded={overlay === "models"}
        aria-label={`Model: ${model.name}${compare ? ` and ${compare.name}` : ""}. Change model`}
        onClick={() => setOverlay(overlay === "models" ? null : "models")}
        className="flex h-8 min-w-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium hover:bg-muted pointer-coarse:h-11"
      >
        <ProviderMark provider={model.provider} size="xs" />
        <span className="truncate">{model.name}</span>
        {compare && <span className="shrink-0 text-muted-foreground">+ {compare.name}</span>}
        <ChevronDown aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
      </button>

      <div className="ml-auto flex shrink-0 items-center">
        <IconButton
          label={inPanel ? "Back to popup" : "Open in side panel"}
          size="icon-sm"
          className="hidden lg:inline-flex"
          onClick={() => setMode(inPanel ? "popup" : "sidepanel")}
        >
          {inPanel ? <PanelRightClose /> : <PanelRight />}
        </IconButton>
        <IconButton label="Settings" size="icon-sm" onClick={() => setTab("settings")}>
          <Settings />
        </IconButton>
        {!inPanel && (
          <IconButton label="Close EchoGPT" size="icon-sm" onClick={() => setOpen(false)}>
            <X />
          </IconButton>
        )}
      </div>
    </header>
  );
}
