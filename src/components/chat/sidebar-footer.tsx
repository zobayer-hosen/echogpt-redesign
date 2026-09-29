"use client";

import { BookMarked, Puzzle, Settings } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoUser } from "@/lib/data/user";
import { useUiStore } from "@/store/ui.store";

/** Secondary navigation + signed-in demo user. */
export function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const setSettingsOpen = useUiStore((state) => state.setSettingsOpen);
  const setPromptLibraryOpen = useUiStore((state) => state.setPromptLibraryOpen);

  return (
    <div className="grid gap-0.5 border-t p-2">
      <Button variant="ghost" className="justify-start" onClick={() => setPromptLibraryOpen(true)}>
        <BookMarked /> Prompt library
      </Button>
      <Button asChild variant="ghost" className="justify-start">
        <Link href="/extension" onClick={onNavigate}>
          <Puzzle /> Chrome extension
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" onClick={() => setSettingsOpen(true)}>
        <Settings /> Settings
      </Button>

      <div className="mt-1 flex items-center gap-2.5 rounded-xl px-2 py-2">
        <UserAvatar />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{demoUser.name}</p>
          <Badge size="sm" variant="accent">
            {demoUser.plan === "pro" ? "Pro plan" : "Free plan"}
          </Badge>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
