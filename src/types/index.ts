import type { LucideIcon } from "lucide-react";

/* ----------------------------------------------------------------------------
 * AI models
 * ------------------------------------------------------------------------- */

export type ProviderId = "openai" | "anthropic" | "google" | "meta" | "mistral" | "deepseek";

export interface Provider {
  id: ProviderId;
  name: string;
  /** Single-letter monogram shown in the provider mark. */
  monogram: string;
  /** Token class for the mark background (see globals.css provider tokens). */
  colorClass: string;
}

export type ModelSpeed = "fast" | "balanced" | "deep";
export type ModelTier = "free" | "pro";

export interface AIModel {
  id: string;
  name: string;
  provider: ProviderId;
  description: string;
  bestFor: string;
  speed: ModelSpeed;
  /** 1–3, shown as a quality tag. */
  quality: 1 | 2 | 3;
  tier: ModelTier;
  contextWindow: string;
}

/* ----------------------------------------------------------------------------
 * Conversations
 * ------------------------------------------------------------------------- */

export type MessageRole = "user" | "assistant";
export type MessageStatus = "streaming" | "done" | "stopped" | "error";
export type Feedback = "up" | "down" | null;

export interface Attachment {
  id: string;
  name: string;
  size: number;
}

/** Page or selection attached to a prompt from the extension. */
export interface PageContext {
  kind: "page" | "selection";
  title: string;
  url: string;
  /** Selected text, or a short excerpt of the page. */
  text: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  /** Assistant only: the model that produced the reply. */
  modelId?: string;
  /** Assistant only: the user message this reply answers (groups compare replies). */
  parentId?: string;
  status?: MessageStatus;
  error?: string;
  feedback?: Feedback;
  attachments?: Attachment[];
  context?: PageContext;
  /** Extension quick action that produced this prompt, if any. */
  actionId?: string;
  /** Assistant only: mock reply variant, bumped on regenerate so the answer changes. */
  variant?: number;
}

/** Where a conversation started; extension chats remember their page. */
export interface ConversationOrigin {
  surface: "web" | "extension";
  pageTitle?: string;
  pageUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  modelId: string;
  /** Second model when compare mode is on (A-08). */
  compareModelId: string | null;
  messages: Message[];
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  origin: ConversationOrigin;
}

/** A user prompt and its replies (two replies in compare mode). */
export interface Turn {
  key: string;
  user?: Message;
  replies: Message[];
}

export interface DateGroup<T> {
  label: string;
  items: T[];
}

/* ----------------------------------------------------------------------------
 * Prompts & quick actions
 * ------------------------------------------------------------------------- */

export const PROMPT_CATEGORIES = ["Writing", "Coding", "Research", "Productivity"] as const;
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  content: string;
  /** Built-in templates cannot be deleted. */
  builtIn?: boolean;
}

export type QuickActionRequirement = "page" | "selection" | "none";

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Prompt sent to the model; `{{selection}}` and `{{page}}` are filled in. */
  prompt: string;
  requires: QuickActionRequirement;
}

export interface CustomAction {
  id: string;
  label: string;
  prompt: string;
}

/* ----------------------------------------------------------------------------
 * Settings
 * ------------------------------------------------------------------------- */

export type FontSize = "sm" | "md" | "lg";
export type ThemePreference = "light" | "dark" | "system";

export interface DemoUser {
  name: string;
  email: string;
  initials: string;
  plan: ModelTier;
}

/* ----------------------------------------------------------------------------
 * Landing content
 * ------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ComparisonRow {
  label: string;
  echogpt: boolean;
  separate: boolean;
}

export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: Record<BillingCycle, number>;
  unit: string;
  features: string[];
  cta: NavLink;
  highlighted?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
  icon: LucideIcon;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}
