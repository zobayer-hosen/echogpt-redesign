import { demoArticle, demoArticleExcerpt } from "@/lib/data/demo-article";
import { DEFAULT_COMPARE_MODEL_ID, models } from "@/lib/data/models";
import { fillActionPrompt } from "@/lib/data/quick-actions";
import { truncate } from "@/lib/utils";
import type { PageContext, QuickAction } from "@/types";

import { sendMessage } from "./chat.actions";
import { useChatStore } from "./chat.store";
import { useExtensionStore } from "./extension.store";
import { useSettingsStore } from "./settings.store";

/*
 * Extension prompts go through the same chat orchestration as the web app, so
 * extension chats appear in /chat history with their source page (C-05).
 */

const pageContext: PageContext = {
  kind: "page",
  title: demoArticle.title,
  url: demoArticle.url,
  text: demoArticleExcerpt,
};

function selectionContext(text: string): PageContext {
  return { kind: "selection", title: demoArticle.title, url: demoArticle.url, text };
}

/** The page or selection currently attached to the prompt box (C-08). */
export function attachedContext(): PageContext | undefined {
  const { contextAttached, selection } = useExtensionStore.getState();
  if (!contextAttached) return undefined;
  return selection ? selectionContext(selection) : pageContext;
}

export function pickCompareModel(modelId: string) {
  const favorites = useSettingsStore.getState().favoriteModelIds;
  const candidates = [...favorites, DEFAULT_COMPARE_MODEL_ID, ...models.map((model) => model.id)];
  return (
    candidates.find(
      (id) => id !== modelId && models.some((m) => m.id === id && m.tier === "free"),
    ) ?? null
  );
}

/** The conversation open in the popup, if it still exists. */
export function activeExtensionConversation() {
  const { conversationId } = useExtensionStore.getState();
  return useChatStore.getState().conversations.find((c) => c.id === conversationId);
}

interface RunPromptInput {
  content: string;
  context?: PageContext;
  actionId?: string;
  title?: string;
}

export function runExtensionPrompt({ content, context, actionId, title }: RunPromptInput) {
  const extension = useExtensionStore.getState();
  const active = activeExtensionConversation();
  const id = sendMessage({
    conversationId: active?.id,
    content,
    context,
    actionId,
    selection: context?.kind === "selection" ? context.text : undefined,
    newConversation: {
      modelId: extension.modelId ?? useSettingsStore.getState().defaultModelId,
      compareModelId: extension.compareModelId,
      origin: { surface: "extension", pageTitle: demoArticle.title, pageUrl: demoArticle.url },
      title,
    },
  });
  extension.setConversationId(id);
  extension.setTab("chat");
}

/** Run a quick action (C-06) with the page or selection it needs. */
export function runQuickAction(action: QuickAction) {
  const { selection } = useExtensionStore.getState();
  const context = action.requires === "selection" ? selectionContext(selection) : pageContext;
  runExtensionPrompt({
    content: fillActionPrompt(action.prompt, {
      page: demoArticle.title,
      selection: truncate(selection, 140),
    }),
    context,
    actionId: action.id,
    title: `${action.label}: ${truncate(demoArticle.title, 28)}`,
  });
}
