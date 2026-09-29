import { create } from "zustand";

/**
 * Live text of replies that are still streaming, keyed by message id.
 * Kept out of the persisted chat store so localStorage is written once per
 * reply (on completion) instead of once per token.
 */
interface StreamState {
  streams: Record<string, string>;
  setStream: (messageId: string, text: string) => void;
  clearStream: (messageId: string) => void;
}

export const useStreamStore = create<StreamState>()((set) => ({
  streams: {},
  setStream: (messageId, text) =>
    set((state) => ({ streams: { ...state.streams, [messageId]: text } })),
  clearStream: (messageId) =>
    set((state) => {
      const { [messageId]: _removed, ...rest } = state.streams;
      return { streams: rest };
    }),
}));
