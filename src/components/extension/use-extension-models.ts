"use client";

import { selectConversation, useChatStore } from "@/store/chat.store";
import { useExtensionStore } from "@/store/extension.store";
import { useSettingsStore } from "@/store/settings.store";

/**
 * Current primary / compare models of the popup: the open conversation's
 * models, or the models chosen for the next new chat.
 */
export function useExtensionModels() {
  const conversationId = useExtensionStore((state) => state.conversationId);
  const conversation = useChatStore(selectConversation(conversationId ?? undefined));
  const defaultModelId = useSettingsStore((state) => state.defaultModelId);
  const draftModelId = useExtensionStore((state) => state.modelId);
  const draftCompareId = useExtensionStore((state) => state.compareModelId);
  const setModels = useExtensionStore((state) => state.setModels);
  const setModel = useChatStore((state) => state.setModel);
  const setCompareModel = useChatStore((state) => state.setCompareModel);

  const modelId = conversation?.modelId ?? draftModelId ?? defaultModelId;
  const compareModelId = conversation ? conversation.compareModelId : draftCompareId;

  return {
    modelId,
    compareModelId,
    setPrimary: (id: string) =>
      conversation
        ? setModel(conversation.id, id)
        : setModels(id, draftCompareId === id ? null : draftCompareId),
    setCompare: (id: string | null) =>
      conversation ? setCompareModel(conversation.id, id) : setModels(modelId, id),
  };
}
