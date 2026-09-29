"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef } from "react";

import { useAutoResize } from "@/hooks/use-auto-resize";
import { useSlashMenu } from "@/hooks/use-slash-menu";
import { cn } from "@/lib/utils";
import type { PromptTemplate } from "@/types";

import { PromptInputActions } from "./prompt-input-actions";
import { SlashMenu, slashOptionId } from "./slash-menu";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isStreaming?: boolean;
  /** Accessible label for the textarea (visually hidden). */
  label: string;
  placeholder?: string;
  maxLength?: number;
  maxRows?: number;
  /** Enables the "/" saved-prompts menu. */
  prompts?: PromptTemplate[];
  /** Change this number to move focus into the textarea. */
  focusNonce?: number;
  density?: "default" | "compact";
  topSlot?: ReactNode;
  startSlot?: ReactNode;
  className?: string;
}

function focusTextareaEnd(textarea: HTMLTextAreaElement | null) {
  textarea?.focus();
  textarea?.setSelectionRange(textarea.value.length, textarea.value.length);
}

/** Shared composer used by /chat and /extension (A-06, C-03). */
export function PromptInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming = false,
  label,
  placeholder,
  maxLength = 4000,
  maxRows = 8,
  prompts,
  focusNonce = 0,
  density = "default",
  topSlot,
  startSlot,
  className,
}: PromptInputProps) {
  const id = useId();
  const menuId = `${id}-prompts`;
  const limitId = `${id}-limit`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutoResize(textareaRef, value, maxRows);

  const focusAtEnd = () => focusTextareaEnd(textareaRef.current);

  useEffect(() => {
    if (focusNonce > 0) focusTextareaEnd(textareaRef.current);
  }, [focusNonce]);

  const slash = useSlashMenu(value, prompts, (prompt) => {
    onChange(prompt.content);
    requestAnimationFrame(focusAtEnd);
  });

  const overLimit = value.length > maxLength;
  const canSend = value.trim().length > 0 && !overLimit && !isStreaming;
  const compact = density === "compact";

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (slash.handleKeyDown(event)) return;
    // Enter sends, Shift+Enter adds a line; never send mid IME composition.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-input bg-card shadow-sm transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
    >
      {slash.open && (
        <SlashMenu
          id={menuId}
          prompts={slash.matches}
          activeIndex={slash.activeIndex}
          onSelect={slash.pick}
          onHover={slash.setActiveIndex}
        />
      )}
      {topSlot && <div className={compact ? "px-2 pt-2" : "px-3 pt-3"}>{topSlot}</div>}

      <label htmlFor={`${id}-input`} className="sr-only">
        {label}
      </label>
      <textarea
        id={`${id}-input`}
        ref={textareaRef}
        rows={1}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
          slash.reset();
        }}
        onKeyDown={onKeyDown}
        aria-invalid={overLimit || undefined}
        aria-describedby={overLimit ? limitId : undefined}
        aria-controls={slash.open ? menuId : undefined}
        aria-autocomplete={prompts ? "list" : undefined}
        aria-activedescendant={slash.open ? slashOptionId(menuId, slash.activeIndex) : undefined}
        className={cn(
          "block w-full resize-none bg-transparent leading-6 outline-none placeholder:text-muted-foreground",
          compact ? "px-3 pt-2.5 text-base sm:text-sm" : "px-4 pt-3.5 text-base",
        )}
      />

      <div className={cn("flex items-center gap-1", compact ? "px-1.5 pb-1.5" : "px-2 pb-2")}>
        {startSlot}
        <PromptInputActions
          length={value.length}
          maxLength={maxLength}
          limitId={limitId}
          canSend={canSend}
          isStreaming={isStreaming}
          onSubmit={onSubmit}
          onStop={onStop}
        />
      </div>
    </div>
  );
}
