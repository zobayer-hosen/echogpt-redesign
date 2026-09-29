"use client";

import { Ellipsis, ExternalLink, Globe, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { formatDate, hostname } from "@/lib/utils";
import { deleteConversation } from "@/store/chat.actions";
import { useChatStore } from "@/store/chat.store";
import { useExtensionStore } from "@/store/extension.store";
import type { Conversation } from "@/types";

/** History row: source page, open in popup, open in the web app, delete. */
export function HistoryItem({ conversation }: { conversation: Conversation }) {
  const setConversationId = useExtensionStore((state) => state.setConversationId);
  const setTab = useExtensionStore((state) => state.setTab);
  const { origin } = conversation;
  const source = origin.pageUrl ? hostname(origin.pageUrl) : "Web app";
  const Icon = origin.surface === "extension" ? Globe : MessageSquare;

  const remove = () => {
    const removed = deleteConversation(conversation.id);
    if (useExtensionStore.getState().conversationId === conversation.id) setConversationId(null);
    if (!removed) return;
    toast(`Deleted “${conversation.title}”`, {
      action: {
        label: "Undo",
        onClick: () => useChatStore.getState().restoreConversation(removed),
      },
    });
  };

  return (
    <li className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => {
          setConversationId(conversation.id);
          setTab("chat");
        }}
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-muted"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border bg-card text-muted-foreground">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">{conversation.title}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {origin.pageTitle ? `${source} · ` : "Web app · "}
            {formatDate(conversation.updatedAt)}
          </span>
        </span>
      </button>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <IconButton label={`Options for “${conversation.title}”`} size="icon-sm" tooltip={false}>
            <Ellipsis />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/chat/${conversation.id}`}>
              <ExternalLink /> Open in web app
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={remove}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
