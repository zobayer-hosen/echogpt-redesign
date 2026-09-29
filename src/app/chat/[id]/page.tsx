import type { Metadata } from "next";

import { ChatView } from "@/components/chat/chat-view";

// Conversations live in the visitor's browser, so individual chats are not indexed.
export const metadata: Metadata = {
  title: "Conversation",
  robots: { index: false, follow: false },
};

/** Existing conversation; ChatView reads the id from the URL. */
export default function ConversationPage() {
  return <ChatView />;
}
