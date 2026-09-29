"use client";

import { usePathname } from "next/navigation";

import { conversationIdFromPath } from "@/lib/utils";
import { sendMessage, stopGenerating } from "@/store/chat.actions";
import { isConversationStreaming, selectConversation, useChatStore } from "@/store/chat.store";
import { useSettingsStore } from "@/store/settings.store";
import { useUiStore } from "@/store/ui.store";
import type { Attachment } from "@/types";

import { ChatHeader } from "./chat-header";
import { Composer } from "./composer";
import { ConversationNotFound } from "./conversation-not-found";
import { EmptyState } from "./empty-state";
import { MessageList } from "./message-list";

/**
 * The conversation area for /chat and /chat/[id]. The id comes from the URL so
 * the first message can swap /chat → /chat/[id] with history.replaceState,
 * keeping the stream running without a remount or server round trip.
 */
export function ChatView() {
  const conversationId = conversationIdFromPath(usePathname());
  const conversation = useChatStore(selectConversation(conversationId));
  const setModel = useChatStore((state) => state.setModel);
  const setCompareModel = useChatStore((state) => state.setCompareModel);
  const defaultModelId = useSettingsStore((state) => state.defaultModelId);
  const newChatModelId = useUiStore((state) => state.newChatModelId);
  const newChatCompareModelId = useUiStore((state) => state.newChatCompareModelId);
  const setNewChatModels = useUiStore((state) => state.setNewChatModels);

  if (conversationId && !conversation) return <ConversationNotFound />;

  const modelId = conversation?.modelId ?? newChatModelId ?? defaultModelId;
  const compareModelId = conversation ? conversation.compareModelId : newChatCompareModelId;

  const changeModel = (id: string) =>
    conversation
      ? setModel(conversation.id, id)
      : setNewChatModels(id, compareModelId === id ? null : compareModelId);

  const changeCompare = (id: string | null) =>
    conversation ? setCompareModel(conversation.id, id) : setNewChatModels(modelId, id);

  const send = (content: string, attachments: Attachment[]) => {
    const id = sendMessage({
      conversationId: conversation?.id,
      content,
      attachments,
      newConversation: { modelId, compareModelId },
    });
    if (!conversation) {
      window.history.replaceState(null, "", `/chat/${id}`);
      setNewChatModels(null, null);
    }
  };

  const hasMessages = Boolean(conversation?.messages.length);

  return (
    <>
      <ChatHeader
        conversation={conversation}
        modelId={modelId}
        compareModelId={compareModelId}
        onModelChange={changeModel}
        onCompareChange={changeCompare}
      />
      {conversation && hasMessages ? <MessageList conversation={conversation} /> : <EmptyState />}
      <Composer
        onSend={send}
        onStop={() => conversation && stopGenerating(conversation.id)}
        isStreaming={isConversationStreaming(conversation)}
      />
    </>
  );
}
