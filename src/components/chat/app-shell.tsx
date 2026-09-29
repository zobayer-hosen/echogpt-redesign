"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useEffect, useState } from "react";

import { Sheet } from "@/components/ui/sheet";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useStoresHydrated } from "@/hooks/use-hydrated";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/settings.store";
import { useUiStore } from "@/store/ui.store";

import { ChatSkeleton } from "./chat-skeleton";
import { PromptLibraryDialog } from "./prompt-library-dialog";
import { SettingsDialog } from "./settings-dialog";
import { Sidebar } from "./sidebar";
import { SidebarRail } from "./sidebar-rail";

// Loaded on first open only (NFR-P3).
const CommandPalette = dynamic(
  () => import("./command-palette").then((mod) => mod.CommandPalette),
  {
    ssr: false,
  },
);

/**
 * A-01 responsive shell: full sidebar ≥ 1024 px (collapsible), icon rail at
 * 768–1023 px, slide-over drawer below 768 px. `h-dvh` keeps the composer
 * visible when mobile browser bars or the keyboard change the viewport.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const hydrated = useStoresHydrated();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const collapsed = useSettingsStore((state) => state.sidebarCollapsed);
  const drawerOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setDrawerOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const commandOpen = useUiStore((state) => state.commandOpen);
  const setCommandOpen = useUiStore((state) => state.setCommandOpen);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  if (commandOpen && !paletteLoaded) setPaletteLoaded(true);

  useHotkeys("mod+k", () => setCommandOpen(!useUiStore.getState().commandOpen));

  // The drawer only exists below the desktop breakpoint.
  useEffect(() => {
    if (isDesktop && !collapsed) setDrawerOpen(false);
  }, [isDesktop, collapsed, setDrawerOpen]);

  if (!hydrated) return <ChatSkeleton />;

  const rail = !isDesktop || collapsed;

  return (
    <div className="flex h-dvh overflow-hidden">
      <aside
        aria-label="Chat history"
        className={cn("hidden shrink-0 flex-col border-r bg-card md:flex", rail ? "w-16" : "w-72")}
      >
        {rail ? <SidebarRail isDesktop={isDesktop} /> : <Sidebar />}
      </aside>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen} title="Chat history">
        <Sidebar inSheet />
      </Sheet>

      <main id="main" tabIndex={-1} className="flex min-w-0 flex-1 flex-col outline-none">
        {children}
      </main>

      <SettingsDialog />
      <PromptLibraryDialog />
      {paletteLoaded && <CommandPalette />}
    </div>
  );
}
