"use client";

import { Command } from "cmdk";
import {
  BookMarked,
  House,
  type LucideIcon,
  MessageSquare,
  Moon,
  Puzzle,
  Search,
  Settings,
  SquarePen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { ProviderMark } from "@/components/shared/provider-mark";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { getProvider, models } from "@/lib/data/models";
import { conversationIdFromPath } from "@/lib/utils";
import { useChatStore } from "@/store/chat.store";
import { useUiStore } from "@/store/ui.store";

const groupClass =
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

function Item({
  value,
  onSelect,
  icon: Icon,
  children,
}: {
  value: string;
  onSelect: () => void;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2.5 text-sm data-[selected=true]:bg-muted pointer-coarse:min-h-11"
    >
      {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
      {children}
    </Command.Item>
  );
}

/** Ctrl/Cmd+K: new chat, switch model, search chats, toggle theme (A-11). */
export function CommandPalette() {
  const open = useUiStore((state) => state.commandOpen);
  const setOpen = useUiStore((state) => state.setCommandOpen);
  const ui = useUiStore.getState;
  const router = useRouter();
  const activeId = conversationIdFromPath(usePathname());
  const { resolvedTheme, setTheme } = useTheme();
  const conversations = useChatStore((state) => state.conversations);
  const setModel = useChatStore((state) => state.setModel);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  const switchModel = (modelId: string, name: string) =>
    run(() => {
      if (activeId) setModel(activeId, modelId);
      else {
        const compare = ui().newChatCompareModelId;
        ui().setNewChatModels(modelId, compare === modelId ? null : compare);
      }
      toast.success(`Switched to ${name}`);
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent title="Command palette" bare className="top-[12dvh] max-w-xl">
        <Command label="Command palette" loop className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2 border-b px-4">
            <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <Command.Input
              placeholder="Search chats, models and actions…"
              className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-sm"
            />
            <Kbd className="hidden sm:inline-flex">Esc</Kbd>
          </div>
          <Command.List className="max-h-[min(26rem,60dvh)] overflow-y-auto p-2">
            <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Actions" className={groupClass}>
              <Item
                value="new chat"
                icon={SquarePen}
                onSelect={() => run(() => router.push("/chat"))}
              >
                New chat
              </Item>
              <Item
                value="toggle theme dark light mode"
                icon={Moon}
                onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
              >
                Toggle theme
              </Item>
              <Item
                value="open settings"
                icon={Settings}
                onSelect={() => run(() => ui().setSettingsOpen(true))}
              >
                Open settings
              </Item>
              <Item
                value="prompt library templates"
                icon={BookMarked}
                onSelect={() => run(() => ui().setPromptLibraryOpen(true))}
              >
                Prompt library
              </Item>
              <Item
                value="chrome extension concept"
                icon={Puzzle}
                onSelect={() => run(() => router.push("/extension"))}
              >
                Chrome extension concept
              </Item>
              <Item
                value="home landing page"
                icon={House}
                onSelect={() => run(() => router.push("/"))}
              >
                Go to home page
              </Item>
            </Command.Group>

            <Command.Group heading="Switch model" className={groupClass}>
              {models
                .filter((model) => model.tier === "free")
                .map((model) => (
                  <Item
                    key={model.id}
                    value={`model ${model.name} ${getProvider(model.provider).name}`}
                    onSelect={() => switchModel(model.id, model.name)}
                  >
                    <ProviderMark provider={model.provider} size="xs" />
                    {model.name}
                    <span className="ml-auto text-xs text-muted-foreground">{model.bestFor}</span>
                  </Item>
                ))}
            </Command.Group>

            {conversations.length > 0 && (
              <Command.Group heading="Chats" className={groupClass}>
                {conversations.map((conversation) => (
                  <Item
                    key={conversation.id}
                    value={`chat ${conversation.title} ${conversation.id}`}
                    icon={MessageSquare}
                    onSelect={() => run(() => router.push(`/chat/${conversation.id}`))}
                  >
                    <span className="truncate">{conversation.title}</span>
                  </Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
