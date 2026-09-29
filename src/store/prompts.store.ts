import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createId } from "@/lib/services/ids";
import type { CustomAction, PromptTemplate } from "@/types";

interface PromptsState {
  /** User-created templates; built-ins live in lib/data/prompts.ts. */
  templates: PromptTemplate[];
  /** User-created extension quick actions (C-06 "Create custom action"). */
  customActions: CustomAction[];
  addTemplate: (template: Omit<PromptTemplate, "id" | "builtIn">) => void;
  removeTemplate: (id: string) => void;
  addCustomAction: (action: Omit<CustomAction, "id">) => void;
  removeCustomAction: (id: string) => void;
}

export const usePromptsStore = create<PromptsState>()(
  persist(
    (set) => ({
      templates: [],
      customActions: [],
      addTemplate: (template) =>
        set((state) => ({ templates: [{ ...template, id: createId("p") }, ...state.templates] })),
      removeTemplate: (id) =>
        set((state) => ({ templates: state.templates.filter((template) => template.id !== id) })),
      addCustomAction: (action) =>
        set((state) => ({
          customActions: [...state.customActions, { ...action, id: createId("a") }],
        })),
      removeCustomAction: (id) =>
        set((state) => ({
          customActions: state.customActions.filter((action) => action.id !== id),
        })),
    }),
    {
      name: "echogpt-prompts",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ templates, customActions }) => ({ templates, customActions }),
    },
  ),
);
