import { create } from "zustand";

/** Transient UI state for the chat app (not persisted). */
interface UiState {
  chatDraft: string;
  /** Incremented to ask the composer to take focus (e.g. after inserting a prompt). */
  composerFocusNonce: number;
  /** Model picked on /chat before the conversation exists. */
  newChatModelId: string | null;
  newChatCompareModelId: string | null;
  mobileSidebarOpen: boolean;
  settingsOpen: boolean;
  promptLibraryOpen: boolean;
  commandOpen: boolean;

  setChatDraft: (draft: string) => void;
  insertIntoComposer: (text: string) => void;
  setNewChatModels: (modelId: string | null, compareModelId: string | null) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setPromptLibraryOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  chatDraft: "",
  composerFocusNonce: 0,
  newChatModelId: null,
  newChatCompareModelId: null,
  mobileSidebarOpen: false,
  settingsOpen: false,
  promptLibraryOpen: false,
  commandOpen: false,

  setChatDraft: (chatDraft) => set({ chatDraft }),
  insertIntoComposer: (text) =>
    set((state) => ({ chatDraft: text, composerFocusNonce: state.composerFocusNonce + 1 })),
  setNewChatModels: (newChatModelId, newChatCompareModelId) =>
    set({ newChatModelId, newChatCompareModelId }),
  setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setPromptLibraryOpen: (promptLibraryOpen) => set({ promptLibraryOpen }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
}));
