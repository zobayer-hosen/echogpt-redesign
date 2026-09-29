import type { TranslationLanguage } from "@/lib/data/extension";
import { actionReplies, replyRules } from "@/lib/data/mock-replies";
import { getModel, speedDelayMs } from "@/lib/data/models";
import { truncate } from "@/lib/utils";

import { delay, randomBetween } from "./delay";

/*
 * Mock chat service. It mirrors the shape a real streaming API would have
 * (async iterator of text chunks + AbortSignal), so swapping in the real
 * EchoGPT endpoint only touches this file.
 */

export class ChatServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatServiceError";
  }
}

export interface ReplyRequest {
  prompt: string;
  modelId: string;
  /** Which canned variant to use (0 or 1) so compare replies differ. */
  variant: number;
  /** Extension quick action id, when the prompt came from one. */
  actionId?: string;
  selection?: string;
  language?: TranslationLanguage;
  signal?: AbortSignal;
}

/** Stable small hash, used to give each model a default reply variant. */
export function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Type "simulate error" in a prompt to see the error + retry state (A-07). */
const ERROR_TRIGGER = /simulate error/i;

function topicFrom(prompt: string) {
  return truncate(prompt.replace(/[?.!]+$/, ""), 80);
}

export function composeReply({ prompt, variant, actionId, selection, language }: ReplyRequest) {
  const actionReply = actionId ? actionReplies[actionId] : undefined;
  if (actionReply) {
    return actionReply({ selection: selection ?? "", language: language ?? "Spanish" });
  }

  const rule = replyRules.find((candidate) => candidate.match.test(prompt)) ?? replyRules.at(-1)!;
  return rule.variants[variant % 2](topicFrom(prompt));
}

/** Streams a reply word by word, like a real token stream. */
export async function* streamReply(request: ReplyRequest): AsyncGenerator<string> {
  const { signal, prompt, modelId } = request;

  // "Thinking" pause before the first token, so the typing indicator shows.
  await delay(randomBetween(450, 900), signal);

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new ChatServiceError("You appear to be offline. Check your connection and try again.");
  }
  if (ERROR_TRIGGER.test(prompt)) {
    throw new ChatServiceError("The model is temporarily unavailable. Please try again.");
  }

  const reply = composeReply(request);
  const wordDelay = speedDelayMs[getModel(modelId).speed];
  const tokens = reply.match(/\S+\s*|\s+/g) ?? [];

  for (const token of tokens) {
    await delay(wordDelay, signal);
    yield token;
  }
}
