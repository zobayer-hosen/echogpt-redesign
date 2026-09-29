"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useStoresHydrated } from "@/hooks/use-hydrated";
import { dialogIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useExtensionStore } from "@/store/extension.store";
import { useSettingsStore } from "@/store/settings.store";

import { BrowserFrame } from "./browser-frame";
import { DemoArticle } from "./demo-article";
import { Popup } from "./popup";

const FRAME_HEIGHT = "lg:h-190";

/**
 * Interactive prototype: a demo page in a browser window with the popup
 * (C-01) or side panel (C-09). Ctrl/Cmd+Shift+E toggles it, like the real one.
 */
export function ExtensionDemo() {
  const hydrated = useStoresHydrated();
  const open = useExtensionStore((state) => state.open);
  const mode = useExtensionStore((state) => state.mode);

  useHotkeys("mod+shift+e", () => {
    const state = useExtensionStore.getState();
    if (state.open) return state.setOpen(false);
    state.setOpen(true);
    state.setTab("chat");
    requestAnimationFrame(() => state.focusInput());
  });

  // Deep link for screenshots and demos: /extension?mode=sidepanel
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "sidepanel") {
      useExtensionStore.getState().setMode("sidepanel");
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      useExtensionStore
        .getState()
        .setContextAttached(useSettingsStore.getState().pageContextDefault);
    }
  }, [hydrated]);

  if (!hydrated) {
    return (
      <div role="status" className="overflow-hidden rounded-2xl border bg-card">
        <span className="sr-only">Loading the extension prototype…</span>
        <Skeleton className="h-24 rounded-none" />
        <div className={cn("grid gap-4 p-8 lg:grid-cols-[1fr_24rem]", FRAME_HEIGHT)}>
          <Skeleton className="h-96" />
          <Skeleton className="h-150" />
        </div>
      </div>
    );
  }

  const sidePanel = mode === "sidepanel";

  return (
    <BrowserFrame>
      <div
        className={cn("relative", FRAME_HEIGHT, sidePanel && "lg:grid lg:grid-cols-[1fr_26rem]")}
      >
        <div className="max-h-112 overflow-y-auto lg:h-full lg:max-h-none">
          <DemoArticle centered={sidePanel} />
        </div>

        <AnimatePresence>
          {open && (
            <m.div
              key={mode}
              variants={dialogIn}
              initial="hidden"
              animate="show"
              exit="exit"
              className={cn(
                "border-t lg:border-t-0",
                sidePanel
                  ? "h-[80dvh] lg:h-full lg:border-l"
                  : "p-3 lg:absolute lg:top-2 lg:right-3 lg:origin-top-right lg:p-0",
              )}
            >
              <Popup
                className={cn(
                  sidePanel
                    ? "h-full"
                    : "mx-auto h-150 max-w-95 rounded-2xl border shadow-2xl lg:w-95",
                )}
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}
