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
  conversationId: string | null;
  /** Last text the user selected in the demo article. */
  selection: string;
  /** Whether the page/selection is attached to the next prompt (C-08). */
  contextAttached: boolean;
  /** Send each prompt to two models (C-04 "compare 2"). */
  compare: boolean;
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
  setSelection: (selection: string) => void;
  setContextAttached: (attached: boolean) => void;
  setCompare: (compare: boolean) => void;
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
  selection: "",
  contextAttached: true,
  compare: false,
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
  setSelection: (selection) => set({ selection, contextAttached: true }),
  setContextAttached: (contextAttached) => set({ contextAttached }),
  setCompare: (compare) => set({ compare }),
  setSignedIn: (signedIn) => set({ signedIn }),
  setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
  setDraft: (draft) => set({ draft }),
  focusInput: () => set((state) => ({ focusNonce: state.focusNonce + 1 })),
}));
