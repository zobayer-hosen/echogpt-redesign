"use client";

import { Copy, RefreshCw } from "lucide-react";
import { m } from "motion/react";
import { useMemo } from "react";

import { MessageBubble } from "@/components/shared/message-bubble";
import { IconButton } from "@/components/ui/icon-button";
import { useCopy } from "@/hooks/use-copy";
import { useStickToBottom } from "@/hooks/use-stick-to-bottom";
import { messageIn } from "@/lib/motion";
import { buildTurns } from "@/lib/utils";
import { regenerate } from "@/store/chat.actions";
import type { Conversation, Message } from "@/types";

function CompactActions({ conversationId, message }: { conversationId: string; message: Message }) {
  const { copy } = useCopy();
  if (message.status === "streaming") return null;
  return (
    <div className="mt-0.5 flex gap-0.5">
      <IconButton label="Copy reply" size="icon-sm" onClick={() => copy(message.content)}>
        <Copy />
      </IconButton>
      <IconButton
        label="Regenerate reply"
        size="icon-sm"
        onClick={() => regenerate(conversationId, message.id)}
      >
        <RefreshCw />
      </IconButton>
    </div>
  );
}

/** Compact conversation view for the popup; compare replies stack vertically. */
export function ExtensionThread({ conversation }: { conversation: Conversation }) {
  const { scrollRef, contentRef, onScroll } = useStickToBottom(conversation.id);
  const turns = useMemo(() => buildTurns(conversation.messages), [conversation.messages]);

  return (
    <div ref={scrollRef} onScroll={onScroll} className="h-full overflow-y-auto overscroll-contain">
      <div ref={contentRef} className="grid gap-5 px-3 py-3">
        {turns.map((turn) => (
          <m.div
            key={turn.key}
            variants={messageIn}
            initial="hidden"
            animate="show"
            className="grid gap-3"
          >
            {turn.user && <MessageBubble message={turn.user} density="compact" />}
            {turn.replies.map((reply) => (
              <MessageBubble
                key={reply.id}
                message={reply}
                density="compact"
                onRetry={() => regenerate(conversation.id, reply.id)}
                actions={<CompactActions conversationId={conversation.id} message={reply} />}
              />
            ))}
          </m.div>
        ))}
      </div>
    </div>
  );
}
