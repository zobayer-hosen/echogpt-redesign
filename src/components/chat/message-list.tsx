"use client";

import { ArrowDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useStickToBottom } from "@/hooks/use-stick-to-bottom";
import { buildTurns, cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/settings.store";
import type { Conversation, FontSize } from "@/types";

import { MessageTurn } from "./message-turn";

/** Messages rendered at once; older ones load on demand (NFR-P5). */
const PAGE_SIZE = 100;

const fontSizeClass: Record<FontSize, string> = { sm: "text-sm", md: "text-base", lg: "text-lg" };

export function MessageList({ conversation }: { conversation: Conversation }) {
  const fontSize = useSettingsStore((state) => state.fontSize);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { scrollRef, contentRef, atBottom, onScroll, scrollToBottom } = useStickToBottom(
    conversation.id,
  );
  const { messages } = conversation;

  const { turns, hiddenCount, hasCompare } = useMemo(() => {
    const hidden = Math.max(0, messages.length - limit);
    const visibleTurns = buildTurns(messages.slice(hidden));
    return {
      turns: visibleTurns,
      hiddenCount: hidden,
      hasCompare: visibleTurns.some((turn) => turn.replies.length > 1),
    };
  }, [messages, limit]);

  // Sending a new prompt always brings the thread back to the bottom.
  const lastRole = messages.at(-1)?.role;
  useEffect(() => {
    if (lastRole === "user") scrollToBottom("smooth");
  }, [messages.length, lastRole, scrollToBottom]);

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="h-full overflow-y-auto overscroll-contain"
      >
        <div
          ref={contentRef}
          className={cn(
            "mx-auto grid w-full gap-8 px-4 py-6 sm:px-6",
            hasCompare ? "max-w-6xl" : "max-w-3xl",
            fontSizeClass[fontSize],
          )}
        >
          {hiddenCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="mx-auto"
              onClick={() => setLimit((value) => value + PAGE_SIZE)}
            >
              Show {Math.min(PAGE_SIZE, hiddenCount)} earlier messages
            </Button>
          )}
          <AnimatePresence initial={false}>
            {turns.map((turn) => (
              <MessageTurn key={turn.key} conversationId={conversation.id} turn={turn} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {!atBottom && (
        <Button
          variant="outline"
          size="icon"
          aria-label="Scroll to latest message"
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow-lg"
        >
          <ArrowDown />
        </Button>
      )}
    </div>
  );
}
