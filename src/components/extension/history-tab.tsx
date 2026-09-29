"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { groupByDate } from "@/lib/utils";
import { useChatStore } from "@/store/chat.store";

import { HistoryItem } from "./history-item";

/** Searchable history grouped by date, shared with the web app (C-05). */
export function HistoryTab() {
  const conversations = useChatStore((state) => state.conversations);
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = conversations
      .filter(
        (conversation) =>
          !q ||
          conversation.title.toLowerCase().includes(q) ||
          conversation.origin.pageTitle?.toLowerCase().includes(q),
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
    return groupByDate(filtered, (conversation) => conversation.updatedAt);
  }, [conversations, query]);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 p-3 pb-2">
        <h3 className="sr-only">History</h3>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="ext-history-search" className="sr-only">
            Search history
          </label>
          <Input
            id="ext-history-search"
            type="search"
            placeholder="Search history"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-3">
        {groups.map((group, index) => (
          <div
            key={group.label}
            role="group"
            aria-labelledby={`ext-history-${index}`}
            className="mt-2"
          >
            <p
              id={`ext-history-${index}`}
              className="px-2 pb-1 text-xs font-medium text-muted-foreground"
            >
              {group.label}
            </p>
            <ul className="grid gap-0.5">
              {group.items.map((conversation) => (
                <HistoryItem key={conversation.id} conversation={conversation} />
              ))}
            </ul>
          </div>
        ))}
        {groups.length === 0 && (
          <p role="status" className="px-4 py-10 text-center text-sm text-muted-foreground">
            {conversations.length ? `Nothing matches “${query}”.` : "No conversations yet."}
          </p>
        )}
      </div>
    </div>
  );
}
