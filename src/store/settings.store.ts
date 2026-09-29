import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_API_ENDPOINT, type TranslationLanguage } from "@/lib/data/extension";
import { DEFAULT_MODEL_ID } from "@/lib/data/models";
import type { FontSize } from "@/types";

export interface SettingsValues {
  defaultModelId: string;
  fontSize: FontSize;
  favoriteModelIds: string[];
  language: TranslationLanguage;
  /** Attach the current page to extension prompts by default. */
  pageContextDefault: boolean;
  sidebarCollapsed: boolean;
  extensionOnboarded: boolean;
  apiEndpoint: string;
}

interface SettingsState extends SettingsValues {
  update: (patch: Partial<SettingsValues>) => void;
  toggleFavorite: (modelId: string) => void;
  reset: () => void;
}

export const defaultSettings: SettingsValues = {
  defaultModelId: DEFAULT_MODEL_ID,
  fontSize: "md",
  favoriteModelIds: ["claude-sonnet", "gemini-flash"],
  language: "Spanish",
  pageContextDefault: true,
  sidebarCollapsed: false,
  extensionOnboarded: false,
  apiEndpoint: DEFAULT_API_ENDPOINT,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      update: (patch) => set(patch),
      toggleFavorite: (modelId) =>
        set((state) => ({
          favoriteModelIds: state.favoriteModelIds.includes(modelId)
            ? state.favoriteModelIds.filter((id) => id !== modelId)
            : [...state.favoriteModelIds, modelId],
        })),
      reset: () => set(defaultSettings),
    }),
    {
      name: "echogpt-settings",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ update: _update, toggleFavorite: _toggle, reset: _reset, ...values }) =>
        values,
    },
  ),
);
