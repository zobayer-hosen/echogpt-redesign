"use client";

import { BookMarked, Paperclip } from "lucide-react";
import { type ChangeEvent, useMemo, useRef, useState } from "react";

import { PromptInput } from "@/components/shared/prompt-input";
import { IconButton } from "@/components/ui/icon-button";
import { Kbd } from "@/components/ui/kbd";
import { builtInPrompts } from "@/lib/data/prompts";
import { createId } from "@/lib/services/ids";
import { usePromptsStore } from "@/store/prompts.store";
import { useUiStore } from "@/store/ui.store";
import type { Attachment } from "@/types";

import { AttachmentChips } from "./attachment-chips";

interface ComposerProps {
  onSend: (content: string, attachments: Attachment[]) => void;
  onStop: () => void;
  isStreaming: boolean;
}

/** Pinned composer: prompt input, attachments (UI only) and saved prompts (A-06). */
export function Composer({ onSend, onStop, isStreaming }: ComposerProps) {
  const draft = useUiStore((state) => state.chatDraft);
  const setDraft = useUiStore((state) => state.setChatDraft);
  const focusNonce = useUiStore((state) => state.composerFocusNonce);
  const setPromptLibraryOpen = useUiStore((state) => state.setPromptLibraryOpen);
  const userPrompts = usePromptsStore((state) => state.templates);
  const prompts = useMemo(() => [...userPrompts, ...builtInPrompts], [userPrompts]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => ({
      id: createId("f"),
      name: file.name,
      size: file.size,
    }));
    setAttachments((current) => [...current, ...files].slice(0, 5));
    event.target.value = "";
  };

  const submit = () => {
    const content = draft.trim();
    if (!content) return;
    onSend(content, attachments);
    setDraft("");
    setAttachments([]);
  };

  return (
    <div className="shrink-0 bg-background px-3 pt-2 pb-3 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <PromptInput
          value={draft}
          onChange={setDraft}
          onSubmit={submit}
          onStop={onStop}
          isStreaming={isStreaming}
          label="Message EchoGPT"
          placeholder="Ask anything — type / for saved prompts"
          prompts={prompts}
          focusNonce={focusNonce}
          topSlot={
            attachments.length > 0 ? (
              <AttachmentChips
                files={attachments}
                onRemove={(id) =>
                  setAttachments((current) => current.filter((file) => file.id !== id))
                }
              />
            ) : undefined
          }
          startSlot={
            <>
              <input
                ref={fileInput}
                type="file"
                multiple
                tabIndex={-1}
                aria-hidden="true"
                className="sr-only"
                onChange={addFiles}
              />
              <IconButton
                label="Attach files (preview only)"
                onClick={() => fileInput.current?.click()}
              >
                <Paperclip />
              </IconButton>
              <IconButton label="Open prompt library" onClick={() => setPromptLibraryOpen(true)}>
                <BookMarked />
              </IconButton>
            </>
          }
        />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Replies are simulated in this demo.
          <span className="hidden sm:inline">
            {" "}
            <Kbd>Enter</Kbd> to send · <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> for a new line
          </span>
        </p>
      </div>
    </div>
  );
}
