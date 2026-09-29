"use client";

import { SquarePen } from "lucide-react";
import { useMemo } from "react";

import { PromptInput } from "@/components/shared/prompt-input";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { builtInPrompts } from "@/lib/data/prompts";
import { isApplePlatform } from "@/lib/utils";
import { stopGenerating } from "@/store/chat.actions";
import { isConversationStreaming, selectConversation, useChatStore } from "@/store/chat.store";
import { attachedContext, runExtensionPrompt } from "@/store/extension.actions";
import { useExtensionStore } from "@/store/extension.store";
import { usePromptsStore } from "@/store/prompts.store";
import { useSettingsStore } from "@/store/settings.store";

import { ChatEmpty } from "./chat-empty";
import { ContextChip } from "./context-chip";
import { ExtensionThread } from "./extension-thread";
import { OnboardingCard } from "./onboarding-card";

/** Popup chat: thread, page-context chip and prompt input with "/" prompts (C-03). */
export function ChatTab() {
  const conversationId = useExtensionStore((state) => state.conversationId);
  const setConversationId = useExtensionStore((state) => state.setConversationId);
  const draft = useExtensionStore((state) => state.draft);
  const setDraft = useExtensionStore((state) => state.setDraft);
  const focusNonce = useExtensionStore((state) => state.focusNonce);
  const conversation = useChatStore(selectConversation(conversationId ?? undefined));
  const onboarded = useSettingsStore((state) => state.extensionOnboarded);
  const userPrompts = usePromptsStore((state) => state.templates);
  const prompts = useMemo(() => [...userPrompts, ...builtInPrompts], [userPrompts]);
  const mod = isApplePlatform() ? "⌘" : "Ctrl";

  const send = () => {
    const content = draft.trim();
    if (!content) return;
    runExtensionPrompt({ content, context: attachedContext() });
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b pr-1 pl-3">
        <h3 className="truncate text-xs font-medium text-muted-foreground">
          {conversation?.title ?? "New chat"}
        </h3>
        {conversation && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 shrink-0 text-xs"
            onClick={() => setConversationId(null)}
          >
            <SquarePen /> New chat
          </Button>
        )}
      </div>

      <div className="relative min-h-0 flex-1">
        {conversation?.messages.length ? (
          <ExtensionThread conversation={conversation} />
        ) : onboarded ? (
          <ChatEmpty />
        ) : (
          <div className="h-full overflow-y-auto p-3">
            <OnboardingCard />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t p-2">
        <PromptInput
          density="compact"
          value={draft}
          onChange={setDraft}
          onSubmit={send}
          onStop={() => conversation && stopGenerating(conversation.id)}
          isStreaming={isConversationStreaming(conversation)}
          label="Ask EchoGPT about this page"
          placeholder="Ask about this page…"
          prompts={prompts}
          focusNonce={focusNonce}
          maxRows={5}
          topSlot={<ContextChip />}
        />
        <p className="mt-1.5 flex items-center justify-between gap-2 px-1 text-[0.6875rem] text-muted-foreground">
          <span>
            Type <Kbd>/</Kbd> for prompts
          </span>
          <span className="hidden items-center gap-0.5 sm:flex">
            <Kbd>{mod}</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>E</Kbd>
            <span className="ml-1">to open</span>
          </span>
        </p>
      </div>
    </div>
  );
}
