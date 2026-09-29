import { demoArticle, demoArticleExcerpt } from "@/lib/data/demo-article";
import { actionReplies, replyRules } from "@/lib/data/mock-replies";
import type { Conversation, Message } from "@/types";

/*
 * Sample history shown on first visit, spread across the sidebar date groups.
 * Timestamps are relative to "now" so the grouping always looks right.
 */

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function ruleReply(ruleId: string, variant: number, topic: string) {
  const rule = replyRules.find((candidate) => candidate.id === ruleId);
  return rule ? rule.variants[variant % 2](topic) : "";
}

function user(id: string, content: string, createdAt: number, extra: Partial<Message> = {}): Message {
  return { id, role: "user", content, createdAt, ...extra };
}

function reply(
  id: string,
  parentId: string,
  modelId: string,
  content: string,
  createdAt: number,
  extra: Partial<Message> = {},
): Message {
  return { id, role: "assistant", content, createdAt, modelId, parentId, status: "done", variant: 0, ...extra };
}

function conversation(
  data: Omit<Conversation, "createdAt" | "updatedAt" | "compareModelId" | "pinned" | "origin"> &
    Partial<Conversation>,
): Conversation {
  const times = data.messages.map((message) => message.createdAt);
  return {
    compareModelId: null,
    pinned: false,
    origin: { surface: "web" },
    createdAt: Math.min(...times),
    updatedAt: Math.max(...times),
    ...data,
  };
}

export function createSeedConversations(now = Date.now()): Conversation[] {
  const t = (offset: number) => now - offset;

  return [
    conversation({
      id: "seed-debounce",
      title: "Debounce helper in TypeScript",
      modelId: "claude-sonnet",
      pinned: true,
      messages: [
        user(
          "seed-debounce-u1",
          "Write a TypeScript function that debounces another function, with a short usage example.",
          t(42 * MINUTE),
        ),
        reply("seed-debounce-a1", "seed-debounce-u1", "claude-sonnet", ruleReply("debounce", 0, ""), t(41 * MINUTE)),
      ],
    }),
    conversation({
      id: "seed-article",
      title: "Summary: Why side panels matter",
      modelId: "gemini-flash",
      origin: { surface: "extension", pageTitle: demoArticle.title, pageUrl: demoArticle.url },
      messages: [
        user("seed-article-u1", `Summarize this page: ${demoArticle.title}`, t(2 * HOUR), {
          actionId: "summarize",
          context: { kind: "page", title: demoArticle.title, url: demoArticle.url, text: demoArticleExcerpt },
        }),
        reply(
          "seed-article-a1",
          "seed-article-u1",
          "gemini-flash",
          actionReplies.summarize!({ selection: "", language: "Spanish" }),
          t(2 * HOUR - MINUTE),
        ),
      ],
    }),
    conversation({
      id: "seed-compare",
      title: "REST vs GraphQL for a new API",
      modelId: "claude-sonnet",
      compareModelId: "gemini-flash",
      messages: [
        user("seed-compare-u1", "Compare REST vs GraphQL for a new public API", t(DAY + 2 * HOUR)),
        reply(
          "seed-compare-a1",
          "seed-compare-u1",
          "claude-sonnet",
          ruleReply("compare", 0, "REST vs GraphQL for a new public API"),
          t(DAY + 2 * HOUR - MINUTE),
        ),
        reply(
          "seed-compare-a2",
          "seed-compare-u1",
          "gemini-flash",
          ruleReply("compare", 1, "REST vs GraphQL for a new public API"),
          t(DAY + 2 * HOUR - MINUTE),
          { variant: 1 },
        ),
      ],
    }),
    conversation({
      id: "seed-email",
      title: "Move 1:1 to Thursday",
      modelId: "gpt-mini",
      messages: [
        user(
          "seed-email-u1",
          "Draft a polite email to my manager asking to move our 1:1 meeting to Thursday.",
          t(3 * DAY),
        ),
        reply("seed-email-a1", "seed-email-u1", "gpt-mini", ruleReply("meeting-email", 0, ""), t(3 * DAY - MINUTE), {
          feedback: "up",
        }),
      ],
    }),
    conversation({
      id: "seed-llm",
      title: "How LLMs work, simply",
      modelId: "llama",
      messages: [
        user(
          "seed-llm-u1",
          "Explain how large language models work, in simple terms, with an everyday analogy.",
          t(5 * DAY),
        ),
        reply("seed-llm-a1", "seed-llm-u1", "llama", ruleReply("llm", 0, ""), t(5 * DAY - MINUTE)),
      ],
    }),
    conversation({
      id: "seed-remote",
      title: "Remote work pros and cons",
      modelId: "mistral-large",
      messages: [
        user(
          "seed-remote-u1",
          "Summarize the key points of the pros and cons of remote work in five bullet points.",
          t(12 * DAY),
        ),
        reply("seed-remote-a1", "seed-remote-u1", "mistral-large", ruleReply("remote-work", 0, ""), t(12 * DAY - MINUTE)),
      ],
    }),
    conversation({
      id: "seed-hello",
      title: "Getting started",
      modelId: "deepseek",
      messages: [
        user("seed-hello-u1", "Hello! What can you help me with?", t(20 * DAY)),
        reply("seed-hello-a1", "seed-hello-u1", "deepseek", ruleReply("greeting", 0, ""), t(20 * DAY - MINUTE)),
      ],
    }),
  ];
}
