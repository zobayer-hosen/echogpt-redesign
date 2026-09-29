"use client";

import { Ellipsis, Globe, Link2, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { useConversationActions } from "@/hooks/use-conversation-actions";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";

import { RenameDialog } from "./rename-dialog";

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onNavigate?: () => void;
}

/** Sidebar row: link to the chat + menu with pin, rename, share and delete (A-02). */
export function ConversationItem({ conversation, active, onNavigate }: ConversationItemProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const actions = useConversationActions(conversation);
  const fromExtension = conversation.origin.surface === "extension";

  return (
    <li className="group relative">
      <Link
        href={`/chat/${conversation.id}`}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={cn(
          "flex h-10 items-center gap-2 rounded-lg pr-10 pl-2.5 text-sm transition-colors pointer-coarse:h-11",
          active ? "bg-accent font-medium text-accent-foreground" : "hover:bg-muted",
        )}
      >
        {fromExtension && (
          <>
            <Globe aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="sr-only">From the extension: </span>
          </>
        )}
        <span className="truncate">{conversation.title}</span>
      </Link>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <IconButton
            label={`Options for “${conversation.title}”`}
            tooltip={false}
            size="icon-sm"
            className="absolute top-1/2 right-1 -translate-y-1/2 data-[state=open]:opacity-100 pointer-fine:opacity-0 pointer-fine:group-focus-within:opacity-100 pointer-fine:group-hover:opacity-100"
          >
            <Ellipsis />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={actions?.togglePin}>
            {conversation.pinned ? <PinOff /> : <Pin />}
            {conversation.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
            <Pencil /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={actions?.copyLink}>
            <Link2 /> Copy link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={actions?.remove}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameDialog conversation={conversation} open={renameOpen} onOpenChange={setRenameOpen} />
    </li>
  );
}
