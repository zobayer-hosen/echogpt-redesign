"use client";

import { ArrowUp, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromptInputActionsProps {
  length: number;
  maxLength: number;
  limitId: string;
  canSend: boolean;
  isStreaming: boolean;
  onSubmit: () => void;
  onStop?: () => void;
}

/** Character counter + send / stop toggle (A-06, A-07). */
export function PromptInputActions({
  length,
  maxLength,
  limitId,
  canSend,
  isStreaming,
  onSubmit,
  onStop,
}: PromptInputActionsProps) {
  const overLimit = length > maxLength;

  return (
    <div className="ml-auto flex items-center gap-2">
      {length > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            "text-xs tabular-nums",
            overLimit ? "font-medium text-destructive" : "text-muted-foreground",
          )}
        >
          {length.toLocaleString()} / {maxLength.toLocaleString()}
        </span>
      )}
      {overLimit && (
        <span id={limitId} role="status" className="sr-only">
          Message is {length - maxLength} characters over the limit.
        </span>
      )}
      {isStreaming ? (
        <Button
          size="icon"
          variant="outline"
          aria-label="Stop generating"
          onClick={onStop}
          className="rounded-full"
        >
          <Square className="fill-current" />
        </Button>
      ) : (
        <Button
          size="icon"
          aria-label="Send message"
          disabled={!canSend}
          onClick={onSubmit}
          className="rounded-full"
        >
          <ArrowUp />
        </Button>
      )}
    </div>
  );
}
