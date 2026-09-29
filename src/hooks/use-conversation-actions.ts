"use client";

import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCopy } from "@/hooks/use-copy";
import { conversationIdFromPath } from "@/lib/utils";
import { deleteConversation } from "@/store/chat.actions";
import { useChatStore } from "@/store/chat.store";
import type { Conversation } from "@/types";

/** Pin, delete (with undo) and share actions shared by the sidebar and chat header. */
export function useConversationActions(conversation: Conversation | undefined) {
  const router = useRouter();
  const pathname = usePathname();
  const togglePin = useChatStore((state) => state.togglePin);
  const { copy } = useCopy();

  if (!conversation) return null;
  const { id, title, pinned } = conversation;

  return {
    togglePin: () => {
      togglePin(id);
      toast.success(pinned ? "Chat unpinned" : "Chat pinned");
    },
    remove: () => {
      const removed = deleteConversation(id);
      if (conversationIdFromPath(pathname) === id) router.push("/chat");
      if (!removed) return;
      toast(`Deleted “${title}”`, {
        action: {
          label: "Undo",
          onClick: () => useChatStore.getState().restoreConversation(removed),
        },
      });
    },
    copyLink: () => copy(`${window.location.origin}/chat/${id}`, "Link copied"),
  };
}
