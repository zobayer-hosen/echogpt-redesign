"use client";

import { CircleAlert, FileText, Paperclip, RefreshCw, TextSelect } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useStreamingText } from "@/hooks/use-streaming-text";
import { getModel } from "@/lib/data/models";
import { cn, formatBytes, formatDateTime, formatTime, truncate } from "@/lib/utils";
import type { Message } from "@/types";

import { Markdown } from "./markdown";
import { ProviderMark } from "./provider-mark";
import { TypingIndicator } from "./typing-indicator";

type Density = "default" | "compact";

interface MessageBubbleProps {
  message: Message;
  density?: Density;
  /** Action row rendered under assistant replies. */
  actions?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

function Timestamp({ at }: { at: number }) {
  return (
    <time
      dateTime={new Date(at).toISOString()}
      title={formatDateTime(at)}
      className="text-xs text-muted-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100"
    >
      {formatTime(at)}
    </time>
  );
}

function UserBubble({ message, density }: { message: Message; density: Density }) {
  const { context, attachments } = message;
  return (
    <article
      id={message.id}
      aria-label="Your message"
      className="group ml-auto flex max-w-[85%] flex-col items-end gap-1.5"
    >
      {context && (
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
          {context.kind === "page" ? (
            <FileText aria-hidden="true" className="size-3.5" />
          ) : (
            <TextSelect aria-hidden="true" className="size-3.5" />
          )}
          <span className="truncate">
            {context.kind === "page" ? "Page" : "Selection"} ·{" "}
            {truncate(context.kind === "page" ? context.title : context.text, 48)}
          </span>
        </span>
      )}
      <div
        className={cn(
          "rounded-2xl rounded-br-md bg-accent break-words whitespace-pre-wrap text-accent-foreground",
          density === "compact" ? "px-3 py-2 text-sm" : "px-4 py-2.5",
        )}
      >
        {message.content}
      </div>
      {attachments && (
        <ul className="flex flex-wrap justify-end gap-1.5" aria-label="Attachments">
          {attachments.map((file) => (
            <li
              key={file.id}
              className="inline-flex items-center gap-1 rounded-md border bg-card px-2 py-1 text-xs text-muted-foreground"
            >
              <Paperclip aria-hidden="true" className="size-3" />
              {truncate(file.name, 28)} · {formatBytes(file.size)}
            </li>
          ))}
        </ul>
      )}
      <Timestamp at={message.createdAt} />
    </article>
  );
}

function ErrorNotice({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm"
    >
      <CircleAlert aria-hidden="true" className="size-4 shrink-0 text-destructive" />
      <span className="flex-1">{error ?? "Something went wrong."}</span>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCw /> Retry
        </Button>
      )}
    </div>
  );
}

/** One chat message. Assistant replies stream, render Markdown and show their model (A-03). */
export function MessageBubble({
  message,
  density = "default",
  actions,
  onRetry,
  className,
}: MessageBubbleProps) {
  const text = useStreamingText(message);
  if (message.role === "user") return <UserBubble message={message} density={density} />;

  const model = getModel(message.modelId);
  const streaming = message.status === "streaming";
  const compact = density === "compact";

  return (
    <article
      id={message.id}
      aria-label={`Reply from ${model.name}`}
      className={cn("group min-w-0", className)}
    >
      <header className="mb-1.5 flex items-center gap-2">
        <ProviderMark provider={model.provider} size={compact ? "xs" : "sm"} />
        <span className="text-xs font-semibold">{model.name}</span>
        <Timestamp at={message.createdAt} />
      </header>
      <div
        aria-live="polite"
        aria-busy={streaming}
        className={cn(
          "rounded-2xl rounded-tl-md border bg-card",
          compact ? "px-3 py-2 text-sm" : "px-4 py-3",
        )}
      >
        {streaming && !text ? (
          <TypingIndicator label={`${model.name} is typing`} />
        ) : (
          <Markdown content={text} />
        )}
        {message.status === "stopped" && (
          <p className="mt-2 text-xs text-muted-foreground italic">Response stopped.</p>
        )}
        {message.status === "error" && <ErrorNotice error={message.error} onRetry={onRetry} />}
      </div>
      {actions}
    </article>
  );
}
