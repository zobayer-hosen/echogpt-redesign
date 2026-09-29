"use client";

import { useEffect, useState } from "react";

import { useChatStore } from "@/store/chat.store";
import { usePromptsStore } from "@/store/prompts.store";
import { useSettingsStore } from "@/store/settings.store";

const persistedStores = [useChatStore, useSettingsStore, usePromptsStore];

let hydration: Promise<void> | null = null;

function allHydrated() {
  // `persist` is absent on the server, where localStorage doesn't exist.
  return persistedStores.every((store) => store.persist?.hasHydrated() ?? false);
}

/**
 * Rehydrates the persisted stores from localStorage once, after mount, so the
 * server HTML and the first client render match. Also keeps tabs in sync.
 */
export function useStoresHydrated() {
  const [hydrated, setHydrated] = useState(allHydrated);

  useEffect(() => {
    let active = true;
    hydration ??= Promise.all(persistedStores.map((store) => store.persist.rehydrate())).then(
      () => undefined,
    );
    void hydration.then(() => active && setHydrated(true));

    const onStorage = (event: StorageEvent) => {
      const store = persistedStores.find((s) => s.persist.getOptions().name === event.key);
      void store?.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return hydrated;
}
