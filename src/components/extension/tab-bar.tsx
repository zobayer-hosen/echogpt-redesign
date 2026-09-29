"use client";

import { History, type LucideIcon, MessageSquare, Settings, Zap } from "lucide-react";
import { m } from "motion/react";
import { type KeyboardEvent, useRef } from "react";

import { pillTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { type ExtensionTab, extensionTabs, useExtensionStore } from "@/store/extension.store";

const tabMeta: Record<ExtensionTab, { label: string; icon: LucideIcon }> = {
  chat: { label: "Chat", icon: MessageSquare },
  actions: { label: "Actions", icon: Zap },
  history: { label: "History", icon: History },
  settings: { label: "Settings", icon: Settings },
};

/**
 * Bottom navigation (C-02): roving focus with ←/→/Home/End, `aria-current`
 * on the active tab, and a `layoutId` indicator that glides between tabs.
 */
export function TabBar() {
  const active = useExtensionStore((state) => state.tab);
  const setTab = useExtensionStore((state) => state.setTab);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const current = extensionTabs.indexOf(active);
    const last = extensionTabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % extensionTabs.length
        : event.key === "ArrowLeft"
          ? (current - 1 + extensionTabs.length) % extensionTabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setTab(extensionTabs[next]);
    buttons.current[next]?.focus();
  };

  return (
    <nav aria-label="EchoGPT sections" className="shrink-0 border-t bg-card">
      <ul className="grid grid-cols-4" onKeyDown={onKeyDown}>
        {extensionTabs.map((tab, index) => {
          const { label, icon: Icon } = tabMeta[tab];
          const selected = tab === active;
          return (
            <li key={tab}>
              <button
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                type="button"
                tabIndex={selected ? 0 : -1}
                aria-current={selected ? "page" : undefined}
                onClick={() => setTab(tab)}
                className={cn(
                  "relative flex h-14 w-full flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors",
                  selected ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <m.span
                    layoutId="extension-tab-indicator"
                    transition={pillTransition}
                    aria-hidden="true"
                    className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary"
                  />
                )}
                <Icon aria-hidden="true" className="size-5" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
