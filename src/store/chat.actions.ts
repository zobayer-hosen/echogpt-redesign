import { ChatServiceError, hashString, streamReply } from "@/lib/services/chat.service";
import { isAbortError } from "@/lib/services/delay";
import { createId } from "@/lib/services/ids";
import { deriveTitle } from "@/lib/utils";
import type { Attachment, Message, PageContext } from "@/types";

import { type NewConversationInput, useChatStore } from "./chat.store";
import { useSettingsStore } from "./settings.store";
import { useStreamStore } from "./stream.store";

/*
 * Chat orchestration shared by /chat and /extension. Components call these
 * plain functions; the stores stay simple and the service stays swappable.
 */

/** One AbortController per streaming message, so "Stop" works from anywhere. */
const controllers = new Map<string, AbortController>();

export interface SendMessageInput {
  conversationId?: string;
  content: string;
  /** Used when `conversationId` is missing: the conversation is created first. */
  newConversation?: Omit<NewConversationInput, "title"> & { title?: string };
  attachments?: Attachment[];
  context?: PageContext;
  actionId?: string;
  selection?: string;
}

export function sendMessage(input: SendMessageInput): string {
  const chat = useChatStore.getState();
  const conversationId =
    input.conversationId ??
    chat.createConversation({
      modelId: input.newConversation?.modelId ?? useSettingsStore.getState().defaultModelId,
      compareModelId: input.newConversation?.compareModelId ?? null,
      origin: input.newConversation?.origin,
      title: input.newConversation?.title ?? deriveTitle(input.content),
    });

  const conversation = useChatStore.getState().conversations.find((c) => c.id === conversationId);
  if (!conversation) return conversationId;

  if (conversation.messages.length === 0 && conversation.title === "New chat") {
    chat.renameConversation(conversationId, deriveTitle(input.content));
  }

  const userMessage: Message = {
    id: createId("m"),
    role: "user",
    content: input.content,
    createdAt: Date.now(),
    attachments: input.attachments?.length ? input.attachments : undefined,
    context: input.context,
    actionId: input.actionId,
  };
  chat.addMessage(conversationId, userMessage);

  const modelIds = [conversation.modelId, conversation.compareModelId].filter(
    (id): id is string => Boolean(id),
  );
  const isCompare = modelIds.length > 1;

  modelIds.forEach((modelId, slot) => {
    const variant = isCompare ? slot : hashString(modelId) % 2;
    void runReply({ conversationId, parent: userMessage, modelId, variant, selection: input.selection });
  });

  return conversationId;
}

interface RunReplyInput {
  conversationId: string;
  parent: Message;
  modelId: string;
  variant: number;
  selection?: string;
  /** Reuse an existing assistant message (regenerate / retry). */
  messageId?: string;
}

async function runReply({ conversationId, parent, modelId, variant, selection, messageId }: RunReplyInput) {
  const chat = useChatStore.getState();
  const stream = useStreamStore.getState();
  const id = messageId ?? createId("m");
  const reset: Partial<Message> = {
    content: "",
    status: "streaming",
    error: undefined,
    feedback: null,
    createdAt: Date.now(),
    variant,
  };

  if (messageId) {
    chat.updateMessage(conversationId, id, reset);
  } else {
    chat.addMessage(conversationId, {
      id,
      role: "assistant",
      modelId,
      parentId: parent.id,
      content: "",
      status: "streaming",
      feedback: null,
      createdAt: Date.now(),
      variant,
    });
  }

  const controller = new AbortController();
  controllers.set(id, controller);
  let text = "";

  try {
    const chunks = streamReply({
      prompt: parent.content,
      modelId,
      variant,
      actionId: parent.actionId,
      selection: selection ?? (parent.context?.kind === "selection" ? parent.context.text : undefined),
      language: useSettingsStore.getState().language,
      signal: controller.signal,
    });
    for await (const chunk of chunks) {
      text += chunk;
      stream.setStream(id, text);
    }
    useChatStore.getState().updateMessage(conversationId, id, { content: text, status: "done" });
  } catch (error) {
    const stopped = isAbortError(error);
    useChatStore.getState().updateMessage(conversationId, id, {
      content: text,
      status: stopped ? "stopped" : "error",
      error: stopped
        ? undefined
        : error instanceof ChatServiceError
          ? error.message
          : "Something went wrong. Please try again.",
    });
  } finally {
    controllers.delete(id);
    useStreamStore.getState().clearStream(id);
  }
}

/** Stop every reply currently streaming in a conversation (A-07). */
export function stopGenerating(conversationId: string) {
  const conversation = useChatStore.getState().conversations.find((c) => c.id === conversationId);
  conversation?.messages.forEach((message) => controllers.get(message.id)?.abort());
}

/** Regenerate (or retry after an error) an assistant reply in place. */
export function regenerate(conversationId: string, messageId: string) {
  const conversation = useChatStore.getState().conversations.find((c) => c.id === conversationId);
  const message = conversation?.messages.find((m) => m.id === messageId);
  const parent = conversation?.messages.find((m) => m.id === message?.parentId);
  if (!conversation || !message || !parent || message.status === "streaming") return;

  const variant = message.status === "error" ? (message.variant ?? 0) : (message.variant ?? 0) + 1;
  void runReply({
    conversationId,
    parent,
    modelId: message.modelId ?? conversation.modelId,
    variant,
    messageId,
  });
}

/** Delete a conversation after aborting any reply still streaming in it. */
export function deleteConversation(conversationId: string) {
  stopGenerating(conversationId);
  return useChatStore.getState().deleteConversation(conversationId);
}

export function clearAllHistory() {
  useChatStore.getState().conversations.forEach((c) => stopGenerating(c.id));
  useChatStore.getState().clearHistory();
}
