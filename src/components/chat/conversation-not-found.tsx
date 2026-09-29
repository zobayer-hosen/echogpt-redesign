"use client";

import { Menu, MessageSquareX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store/ui.store";

/** Error state for /chat/[id] when the id isn't in this browser's history. */
export function ConversationNotFound() {
  const openDrawer = useUiStore((state) => state.setMobileSidebarOpen);

  return (
    <>
      <div className="flex h-14 shrink-0 items-center border-b px-2 md:hidden">
        <IconButton label="Open chat history" tooltip={false} onClick={() => openDrawer(true)}>
          <Menu />
        </IconButton>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <MessageSquareX aria-hidden="true" className="size-10 text-muted-foreground" />
        <h1 className="font-display text-4xl">Chat not found</h1>
        <p className="max-w-sm text-muted-foreground">
          It may have been deleted, or it was started in another browser — chats are stored on this
          device only.
        </p>
        <Button asChild>
          <Link href="/chat">Start a new chat</Link>
        </Button>
      </div>
    </>
  );
}
