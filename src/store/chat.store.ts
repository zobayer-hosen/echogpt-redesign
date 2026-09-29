import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createSeedConversations } from "@/lib/data/seed-conversations";
import { createId } from "@/lib/services/ids";
import type { Conversation, ConversationOrigin, Message } from "@/types";

export interface NewConversationInput {
  modelId: string;
  compareModelId?: string | null;
  title?: string;
  origin?: ConversationOrigin;
}

interface ChatState {
  conversations: Conversation[];
  createConversation: (input: NewConversationInput) => string;
  renameConversation: (id: string, title: string) => void;
  /** Removes a conversation and returns it so the caller can offer "Undo". */
  deleteConversation: (id: string) => Conversation | undefined;
  restoreConversation: (conversation: Conversation) => void;
  togglePin: (id: string) => void;
  setModel: (id: string, modelId: string) => void;
  setCompareModel: (id: string, modelId: string | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, patch: Partial<Message>) => void;
  clearHistory: () => void;
}

function mapConversation(
  conversations: Conversation[],
  id: string,
  fn: (conversation: Conversation) => Conversation,
) {
  return conversations.map((conversation) =>
    conversation.id === id ? fn(conversation) : conversation,
  );
}

/** A reload mid-stream leaves messages "streaming" forever; mark them stopped instead. */
function settleInterruptedStreams(conversations: Conversation[]) {
  return conversations.map((conversation) => ({
    ...conversation,
    messages: conversation.messages.map((message) =>
      message.status === "streaming" ? { ...message, status: "stopped" as const } : message,
    ),
  }));
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: createSeedConversations(),

      createConversation: ({ modelId, compareModelId = null, title = "New chat", origin }) => {
        const now = Date.now();
        const conversation: Conversation = {
          id: createId("c"),
          title,
          modelId,
          compareModelId,
          messages: [],
          pinned: false,
          createdAt: now,
          updatedAt: now,
          origin: origin ?? { surface: "web" },
        };
        set({ conversations: [conversation, ...get().conversations] });
        return conversation.id;
      },

      renameConversation: (id, title) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, id, (c) => ({ ...c, title })),
        })),

      deleteConversation: (id) => {
        const removed = get().conversations.find((c) => c.id === id);
        set((state) => ({ conversations: state.conversations.filter((c) => c.id !== id) }));
        return removed;
      },

      restoreConversation: (conversation) =>
        set((state) =>
          state.conversations.some((c) => c.id === conversation.id)
            ? state
            : { conversations: [conversation, ...state.conversations] },
        ),

      togglePin: (id) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, id, (c) => ({
            ...c,
            pinned: !c.pinned,
          })),
        })),

      setModel: (id, modelId) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, id, (c) => ({
            ...c,
            modelId,
            compareModelId: c.compareModelId === modelId ? null : c.compareModelId,
          })),
        })),

      setCompareModel: (id, compareModelId) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, id, (c) => ({
            ...c,
            compareModelId,
          })),
        })),

      addMessage: (conversationId, message) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, conversationId, (c) => ({
            ...c,
            messages: [...c.messages, message],
            updatedAt: message.createdAt,
          })),
        })),

      updateMessage: (conversationId, messageId, patch) =>
        set((state) => ({
          conversations: mapConversation(state.conversations, conversationId, (c) => ({
            ...c,
            messages: c.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m)),
          })),
        })),

      clearHistory: () => set({ conversations: [] }),
    }),
    {
      name: "echogpt-chat",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ conversations: state.conversations }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<ChatState> | undefined;
        if (!saved?.conversations) return current;
        return { ...current, conversations: settleInterruptedStreams(saved.conversations) };
      },
    },
  ),
);

export function selectConversation(id: string | undefined) {
  return (state: ChatState) => (id ? state.conversations.find((c) => c.id === id) : undefined);
}

export function isConversationStreaming(conversation: Conversation | undefined) {
  return Boolean(conversation?.messages.some((message) => message.status === "streaming"));
}
