"use client";

import { Columns2, Menu, SquarePen, X } from "lucide-react";
import Link from "next/link";

import { ModelSelector } from "@/components/shared/model-selector";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { DEFAULT_COMPARE_MODEL_ID, models } from "@/lib/data/models";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import type { Conversation } from "@/types";

import { ConversationMenu } from "./conversation-menu";

interface ChatHeaderProps {
  conversation?: Conversation;
  modelId: string;
  compareModelId: string | null;
  onModelChange: (modelId: string) => void;
  onCompareChange: (modelId: string | null) => void;
}

function defaultCompareModel(modelId: string) {
  if (DEFAULT_COMPARE_MODEL_ID !== modelId) return DEFAULT_COMPARE_MODEL_ID;
  return models.find((model) => model.tier === "free" && model.id !== modelId)?.id ?? null;
}

/** Title, model selector (A-04), compare toggle (A-08) and conversation menu. */
export function ChatHeader({
  conversation,
  modelId,
  compareModelId,
  onModelChange,
  onCompareChange,
}: ChatHeaderProps) {
  const openDrawer = useUiStore((state) => state.setMobileSidebarOpen);
  const comparing = compareModelId !== null;

  return (
    <div className="shrink-0 border-b bg-background">
      <header className="flex h-14 items-center gap-1 px-2 sm:gap-2 sm:px-4">
        <IconButton
          label="Open chat history"
          tooltip={false}
          className="md:hidden"
          onClick={() => openDrawer(true)}
        >
          <Menu />
        </IconButton>

        {conversation && (
          <h1 className="sr-only max-w-xs truncate font-sans text-sm font-semibold tracking-normal lg:not-sr-only lg:mr-2">
            {conversation.title}
          </h1>
        )}

        <ModelSelector
          value={modelId}
          onChange={onModelChange}
          className="max-w-52 sm:max-w-none"
        />

        <div className="ml-auto flex items-center gap-1">
          <IconButton
            label={comparing ? "Turn off compare mode" : "Compare two models"}
            aria-pressed={comparing}
            onClick={() => onCompareChange(comparing ? null : defaultCompareModel(modelId))}
            className={cn(comparing && "bg-accent text-accent-foreground hover:bg-accent")}
          >
            <Columns2 />
          </IconButton>
          <IconButton label="New chat" asChild className="md:hidden">
            <Link href="/chat">
              <SquarePen />
            </Link>
          </IconButton>
          {conversation && <ConversationMenu conversation={conversation} />}
        </div>
      </header>

      {comparing && (
        <div className="flex items-center gap-2 border-t bg-muted/40 px-3 py-1.5 text-sm sm:px-4">
          <span className="text-muted-foreground">Comparing with</span>
          <ModelSelector
            value={compareModelId}
            excludeId={modelId}
            label="Compare with"
            onChange={(id) => onCompareChange(id)}
            className="h-9 min-w-0"
          />
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => onCompareChange(null)}
          >
            <X /> <span className="hidden sm:inline">Exit compare</span>
            <span className="sr-only sm:hidden">Exit compare mode</span>
          </Button>
        </div>
      )}
    </div>
  );
}
