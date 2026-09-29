"use client";

import { m } from "motion/react";

import { MessageBubble } from "@/components/shared/message-bubble";
import { messageIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { regenerate } from "@/store/chat.actions";
import type { Message, Turn } from "@/types";

import { MessageActions } from "./message-actions";

function Reply({ conversationId, message }: { conversationId: string; message: Message }) {
  return (
    <MessageBubble
      message={message}
      onRetry={() => regenerate(conversationId, message.id)}
      actions={<MessageActions conversationId={conversationId} message={message} />}
    />
  );
}

/**
 * A prompt and its replies. Two replies (compare mode, A-08) sit side by side
 * from 768 px and stack on mobile.
 */
export function MessageTurn({ conversationId, turn }: { conversationId: string; turn: Turn }) {
  const compare = turn.replies.length > 1;

  return (
    <m.div variants={messageIn} initial="hidden" animate="show" className="grid gap-4">
      {turn.user && <MessageBubble message={turn.user} />}
      {turn.replies.length > 0 && (
        <div
          role={compare ? "group" : undefined}
          aria-label={compare ? `${turn.replies.length} answers compared` : undefined}
          className={cn("grid gap-4", compare && "md:grid-cols-2")}
        >
          {turn.replies.map((reply) => (
            <Reply key={reply.id} conversationId={conversationId} message={reply} />
          ))}
        </div>
      )}
    </m.div>
  );
}
