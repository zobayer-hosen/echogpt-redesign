import { create } from "zustand";

/** Transient state of the /extension prototype (not persisted). */

export const extensionTabs = ["chat", "actions", "history", "settings"] as const;
export type ExtensionTab = (typeof extensionTabs)[number];
export type ExtensionMode = "popup" | "sidepanel";
export type ExtensionOverlay = "models" | "custom-action" | null;

interface ExtensionState {
  open: boolean;
  mode: ExtensionMode;
  tab: ExtensionTab;
  overlay: ExtensionOverlay;
  /** Conversation shown in the Chat tab (shared with the web app history). */
  conversationId: string | null;
  /** Models for the next new chat; null model means "use the default model". */
  modelId: string | null;
  compareModelId: string | null;
  /** Last text the user selected in the demo article. */
  selection: string;
  /** Whether the page/selection is attached to the next prompt (C-08). */
  contextAttached: boolean;
  signedIn: boolean;
  onboardingStep: number;
  draft: string;
  focusNonce: number;

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setMode: (mode: ExtensionMode) => void;
  setTab: (tab: ExtensionTab) => void;
  setOverlay: (overlay: ExtensionOverlay) => void;
  setConversationId: (id: string | null) => void;
  setModels: (modelId: string | null, compareModelId: string | null) => void;
  setSelection: (selection: string) => void;
  setContextAttached: (attached: boolean) => void;
  setSignedIn: (signedIn: boolean) => void;
  setOnboardingStep: (step: number) => void;
  setDraft: (draft: string) => void;
  focusInput: () => void;
}

export const useExtensionStore = create<ExtensionState>()((set) => ({
  open: true,
  mode: "popup",
  tab: "chat",
  overlay: null,
  conversationId: null,
  modelId: null,
  compareModelId: null,
  selection: "",
  contextAttached: true,
  signedIn: true,
  onboardingStep: 0,
  draft: "",
  focusNonce: 0,

  setOpen: (open) => set({ open }),
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setMode: (mode) => set({ mode, open: true }),
  setTab: (tab) => set({ tab, overlay: null }),
  setOverlay: (overlay) => set({ overlay }),
  setConversationId: (conversationId) => set({ conversationId }),
  setModels: (modelId, compareModelId) => set({ modelId, compareModelId }),
  setSelection: (selection) => set({ selection, contextAttached: true }),
  setContextAttached: (contextAttached) => set({ contextAttached }),
  setSignedIn: (signedIn) => set({ signedIn }),
  setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
  setDraft: (draft) => set({ draft }),
  focusInput: () => set((state) => ({ focusNonce: state.focusNonce + 1 })),
}));
