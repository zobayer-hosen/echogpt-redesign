"use client";

import { BookMarked, PanelLeftOpen, Search, Settings, SquarePen } from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserAvatar } from "@/components/shared/user-avatar";
import { IconButton } from "@/components/ui/icon-button";
import { useSettingsStore } from "@/store/settings.store";
import { useUiStore } from "@/store/ui.store";

/**
 * Icon rail: default at 768–1023 px, or on desktop when collapsed (A-01).
 * "Expand" opens the drawer on tablets and restores the full sidebar on desktop.
 */
export function SidebarRail({ isDesktop }: { isDesktop: boolean }) {
  const updateSettings = useSettingsStore((state) => state.update);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const setCommandOpen = useUiStore((state) => state.setCommandOpen);
  const setPromptLibraryOpen = useUiStore((state) => state.setPromptLibraryOpen);
  const setSettingsOpen = useUiStore((state) => state.setSettingsOpen);

  const expand = () =>
    isDesktop ? updateSettings({ sidebarCollapsed: false }) : setMobileSidebarOpen(true);

  return (
    <div className="flex h-full flex-col items-center gap-1 py-3">
      <Link href="/" aria-label="EchoGPT home" className="mb-2 rounded-lg">
        <LogoMark className="size-8" />
      </Link>
      <IconButton label="Expand sidebar" tooltipSide="right" onClick={expand}>
        <PanelLeftOpen />
      </IconButton>
      <IconButton label="New chat" tooltipSide="right" asChild>
        <Link href="/chat">
          <SquarePen />
        </Link>
      </IconButton>
      <IconButton
        label="Search chats and commands"
        tooltipSide="right"
        onClick={() => setCommandOpen(true)}
      >
        <Search />
      </IconButton>
      <IconButton
        label="Prompt library"
        tooltipSide="right"
        onClick={() => setPromptLibraryOpen(true)}
      >
        <BookMarked />
      </IconButton>

      <div className="mt-auto flex flex-col items-center gap-1">
        <ThemeToggle />
        <IconButton label="Settings" tooltipSide="right" onClick={() => setSettingsOpen(true)}>
          <Settings />
        </IconButton>
        <UserAvatar className="mt-2" />
      </div>
    </div>
  );
}
