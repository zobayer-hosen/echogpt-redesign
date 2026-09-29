"use client";

import { PanelLeftClose, Search, SquarePen, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { SheetClose } from "@/components/ui/sheet";
import { conversationIdFromPath } from "@/lib/utils";
import { useSettingsStore } from "@/store/settings.store";
import { useUiStore } from "@/store/ui.store";

import { ConversationList } from "./conversation-list";
import { SidebarFooter } from "./sidebar-footer";

/** Full sidebar: new chat, search, grouped history and footer (A-02). */
export function Sidebar({ inSheet = false }: { inSheet?: boolean }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const updateSettings = useSettingsStore((state) => state.update);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const closeSheet = inSheet ? () => setMobileSidebarOpen(false) : undefined;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 px-3">
        <Logo markClassName="size-7" />
        {inSheet ? (
          <SheetClose asChild>
            <IconButton label="Close sidebar" tooltip={false}>
              <X />
            </IconButton>
          </SheetClose>
        ) : (
          <IconButton
            label="Collapse sidebar"
            onClick={() => updateSettings({ sidebarCollapsed: true })}
          >
            <PanelLeftClose />
          </IconButton>
        )}
      </div>

      <div className="grid shrink-0 gap-2 px-3 pb-2">
        <Button asChild className="justify-start">
          <Link href="/chat" onClick={closeSheet}>
            <SquarePen /> New chat
          </Link>
        </Button>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="sidebar-search" className="sr-only">
            Search chats
          </label>
          <Input
            id="sidebar-search"
            type="search"
            placeholder="Search chats"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-background pl-9"
          />
        </div>
      </div>

      <nav aria-label="Conversations" className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <ConversationList
          query={query}
          activeId={conversationIdFromPath(pathname)}
          onNavigate={closeSheet}
        />
      </nav>

      <SidebarFooter onNavigate={closeSheet} />
    </div>
  );
}
