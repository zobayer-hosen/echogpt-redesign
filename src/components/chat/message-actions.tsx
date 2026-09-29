"use client";

import { Check, Copy, RefreshCw, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { IconButton } from "@/components/ui/icon-button";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import { regenerate } from "@/store/chat.actions";
import { useChatStore } from "@/store/chat.store";
import type { Feedback, Message } from "@/types";

interface MessageActionsProps {
  conversationId: string;
  message: Message;
  className?: string;
}

/** Copy, regenerate, like / dislike and share for an assistant reply (A-10). */
export function MessageActions({ conversationId, message, className }: MessageActionsProps) {
  const { copied, copy } = useCopy();
  const updateMessage = useChatStore((state) => state.updateMessage);

  if (message.status === "streaming") return null;

  const setFeedback = (value: Exclude<Feedback, null>) => {
    const next = message.feedback === value ? null : value;
    updateMessage(conversationId, message.id, { feedback: next });
    if (next) toast.success("Thanks for the feedback!");
  };

  const shareUrl = () => `${window.location.origin}/chat/${conversationId}#${message.id}`;

  return (
    <div
      role="group"
      aria-label="Reply actions"
      className={cn("mt-1 flex items-center gap-0.5", className)}
    >
      <IconButton
        label={copied ? "Copied" : "Copy reply"}
        size="icon-sm"
        onClick={() => copy(message.content)}
      >
        {copied ? <Check /> : <Copy />}
      </IconButton>
      <IconButton
        label="Regenerate reply"
        size="icon-sm"
        onClick={() => regenerate(conversationId, message.id)}
      >
        <RefreshCw />
      </IconButton>
      <IconButton
        label="Good response"
        size="icon-sm"
        aria-pressed={message.feedback === "up"}
        onClick={() => setFeedback("up")}
      >
        <ThumbsUp className={cn(message.feedback === "up" && "fill-primary text-primary")} />
      </IconButton>
      <IconButton
        label="Bad response"
        size="icon-sm"
        aria-pressed={message.feedback === "down"}
        onClick={() => setFeedback("down")}
      >
        <ThumbsDown
          className={cn(message.feedback === "down" && "fill-destructive text-destructive")}
        />
      </IconButton>
      <IconButton
        label="Copy link to this reply"
        size="icon-sm"
        onClick={() => copy(shareUrl(), "Link copied")}
      >
        <Share2 />
      </IconButton>
    </div>
  );
}
