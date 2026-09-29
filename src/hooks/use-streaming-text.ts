"use client";

import { useStreamStore } from "@/store/stream.store";
import type { Message } from "@/types";

/** Text to display for a message: live stream while streaming, stored content otherwise. */
export function useStreamingText(message: Message) {
  const live = useStreamStore((state) => state.streams[message.id]);
  return message.status === "streaming" ? (live ?? "") : message.content;
}
