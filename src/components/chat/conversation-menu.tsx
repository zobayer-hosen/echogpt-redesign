"use client";

import { Ellipsis, Link2, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
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
import type { Conversation } from "@/types";

import { RenameDialog } from "./rename-dialog";

/** "More" menu in the chat header. */
export function ConversationMenu({ conversation }: { conversation: Conversation }) {
  const [renameOpen, setRenameOpen] = useState(false);
  const actions = useConversationActions(conversation);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <IconButton label="Conversation options">
            <Ellipsis />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
            <Pencil /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={actions?.togglePin}>
            {conversation.pinned ? <PinOff /> : <Pin />}
            {conversation.pinned ? "Unpin" : "Pin to top"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={actions?.copyLink}>
            <Link2 /> Copy link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={actions?.remove}>
            <Trash2 /> Delete chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameDialog conversation={conversation} open={renameOpen} onOpenChange={setRenameOpen} />
    </>
  );
}
