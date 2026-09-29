"use client";

import { MessageSquareDashed } from "lucide-react";
import { useId, useMemo } from "react";

import { groupByDate } from "@/lib/utils";
import { useChatStore } from "@/store/chat.store";
import type { Conversation, DateGroup } from "@/types";

import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
  query: string;
  activeId?: string;
  onNavigate?: () => void;
}

function matchesQuery(conversation: Conversation, query: string) {
  if (!query) return true;
  return (
    conversation.title.toLowerCase().includes(query) ||
    conversation.messages.some((message) => message.content.toLowerCase().includes(query))
  );
}

/** Pinned chats first, then Today / Yesterday / Previous 7 days / Older (A-02). */
export function ConversationList({ query, activeId, onNavigate }: ConversationListProps) {
  const id = useId();
  const conversations = useChatStore((state) => state.conversations);

  const groups = useMemo<DateGroup<Conversation>[]>(() => {
    const normalized = query.trim().toLowerCase();
    const sorted = conversations
      .filter((conversation) => matchesQuery(conversation, normalized))
      .sort((a, b) => b.updatedAt - a.updatedAt);
    const pinned = sorted.filter((conversation) => conversation.pinned);
    const dated = groupByDate(
      sorted.filter((conversation) => !conversation.pinned),
      (conversation) => conversation.updatedAt,
    );
    return pinned.length ? [{ label: "Pinned", items: pinned }, ...dated] : dated;
  }, [conversations, query]);

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-muted-foreground">
        <MessageSquareDashed aria-hidden="true" className="size-6" />
        <p>No conversations yet. Start a new chat to see it here.</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <p role="status" className="px-3 py-8 text-center text-sm text-muted-foreground">
        No chats match “{query}”.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {groups.map((group, index) => (
        <div key={group.label} role="group" aria-labelledby={`${id}-${index}`}>
          <p
            id={`${id}-${index}`}
            className="px-2.5 pb-1 text-xs font-medium text-muted-foreground"
          >
            {group.label}
          </p>
          <ul className="grid gap-0.5">
            {group.items.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                active={conversation.id === activeId}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
