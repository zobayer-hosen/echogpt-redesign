"use client";

import { AnimatePresence, m } from "motion/react";
import type { ComponentType } from "react";

import { crossFade } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { type ExtensionTab, useExtensionStore } from "@/store/extension.store";

import { POPUP_ID } from "./browser-frame";
import { ChatTab } from "./chat-tab";
import { CustomActionForm } from "./custom-action-form";
import { HistoryTab } from "./history-tab";
import { ModelPanel } from "./model-panel";
import { PopupHeader } from "./popup-header";
import { QuickActionsTab } from "./quick-actions-tab";
import { SettingsTab } from "./settings-tab";
import { SignedOut } from "./signed-out";
import { TabBar } from "./tab-bar";

const panels: Record<ExtensionTab, ComponentType> = {
  chat: ChatTab,
  actions: QuickActionsTab,
  history: HistoryTab,
  settings: SettingsTab,
};

/**
 * The extension UI (C-01): 380 × 600 popup, or a full-height side panel (C-09).
 * Same components and tokens as the web app, just denser.
 */
export function Popup({ className }: { className?: string }) {
  const tab = useExtensionStore((state) => state.tab);
  const overlay = useExtensionStore((state) => state.overlay);
  const signedIn = useExtensionStore((state) => state.signedIn);
  const Panel = panels[tab];

  return (
    <section
      id={POPUP_ID}
      aria-label="EchoGPT extension"
      className={cn("flex flex-col overflow-hidden bg-background text-foreground", className)}
    >
      <PopupHeader />
      <div className="relative min-h-0 flex-1">
        {signedIn ? (
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab}
              variants={crossFade}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute inset-0"
            >
              <Panel />
            </m.div>
          </AnimatePresence>
        ) : (
          <SignedOut />
        )}
        {signedIn && overlay === "models" && <ModelPanel />}
        {signedIn && overlay === "custom-action" && <CustomActionForm />}
      </div>
      {signedIn && <TabBar />}
    </section>
  );
}
