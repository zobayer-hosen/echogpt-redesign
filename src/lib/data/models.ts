import type { AIModel, ModelSpeed, Provider, ProviderId } from "@/types";

/*
 * Sample model lineup for the concept. Names, tiers and context sizes are
 * illustrative; the real list comes from the EchoGPT API via lib/services.
 */

export const providers: Record<ProviderId, Provider> = {
  openai: { id: "openai", name: "OpenAI", monogram: "O", colorClass: "bg-provider-openai" },
  anthropic: {
    id: "anthropic",
    name: "Anthropic",
    monogram: "A",
    colorClass: "bg-provider-anthropic",
  },
  google: { id: "google", name: "Google", monogram: "G", colorClass: "bg-provider-google" },
  meta: { id: "meta", name: "Meta", monogram: "M", colorClass: "bg-provider-meta" },
  mistral: { id: "mistral", name: "Mistral", monogram: "Mi", colorClass: "bg-provider-mistral" },
  deepseek: { id: "deepseek", name: "DeepSeek", monogram: "D", colorClass: "bg-provider-deepseek" },
};

export const models: AIModel[] = [
  {
    id: "gpt-mini",
    name: "GPT mini",
    provider: "openai",
    description: "Quick, capable everyday assistant.",
    bestFor: "Everyday questions",
    speed: "fast",
    quality: 2,
    tier: "free",
    contextWindow: "128K",
  },
  {
    id: "gpt-flagship",
    name: "GPT",
    provider: "openai",
    description: "OpenAI's flagship model for complex, multi-step work.",
    bestFor: "Complex reasoning",
    speed: "balanced",
    quality: 3,
    tier: "pro",
    contextWindow: "256K",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "anthropic",
    description: "Thoughtful writing and careful analysis of long documents.",
    bestFor: "Writing & long docs",
    speed: "balanced",
    quality: 3,
    tier: "free",
    contextWindow: "200K",
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    provider: "anthropic",
    description: "Anthropic's most capable model for deep research and code.",
    bestFor: "Deep research & code",
    speed: "deep",
    quality: 3,
    tier: "pro",
    contextWindow: "200K",
  },
  {
    id: "gemini-flash",
    name: "Gemini Flash",
    provider: "google",
    description: "Very fast answers with a huge context window.",
    bestFor: "Summarizing pages",
    speed: "fast",
    quality: 2,
    tier: "free",
    contextWindow: "1M",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "google",
    description: "Strong multimodal reasoning across text and data.",
    bestFor: "Research & data",
    speed: "balanced",
    quality: 3,
    tier: "pro",
    contextWindow: "1M",
  },
  {
    id: "llama",
    name: "Llama",
    provider: "meta",
    description: "Open-weight model, great value for general tasks.",
    bestFor: "Brainstorming",
    speed: "fast",
    quality: 2,
    tier: "free",
    contextWindow: "128K",
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    description: "Efficient European model, strong at multilingual text.",
    bestFor: "Translation",
    speed: "balanced",
    quality: 2,
    tier: "free",
    contextWindow: "128K",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "deepseek",
    description: "Reasoning-focused model that shines at maths and code.",
    bestFor: "Maths & code",
    speed: "deep",
    quality: 3,
    tier: "free",
    contextWindow: "128K",
  },
];

export const DEFAULT_MODEL_ID = "claude-sonnet";
export const DEFAULT_COMPARE_MODEL_ID = "gemini-flash";

const modelIndex = new Map(models.map((model) => [model.id, model]));

/** Falls back to the default model so stale persisted ids never crash the UI. */
export function getModel(id: string | null | undefined): AIModel {
  return modelIndex.get(id ?? "") ?? modelIndex.get(DEFAULT_MODEL_ID)!;
}

export function getProvider(id: ProviderId): Provider {
  return providers[id];
}

export const speedLabels: Record<ModelSpeed, string> = {
  fast: "Fast",
  balanced: "Balanced",
  deep: "Deep",
};

export const qualityLabels: Record<AIModel["quality"], string> = {
  1: "Good",
  2: "Great",
  3: "Best",
};

/** Per-word delay (ms) used by the mock streaming service. */
export const speedDelayMs: Record<ModelSpeed, number> = {
  fast: 18,
  balanced: 28,
  deep: 40,
};
