import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { DateGroup, Message, Turn } from "@/types";

/** Merge Tailwind classes, letting later utilities win (PRD §11.1). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Group items into Today / Yesterday / Previous 7 days / Older (A-02, C-05). */
export function groupByDate<T>(
  items: T[],
  getTime: (item: T) => number,
  now: Date = new Date(),
): DateGroup<T>[] {
  const today = startOfDay(now);
  const yesterday = today - DAY;
  const weekAgo = today - 7 * DAY;

  const groups: DateGroup<T>[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 days", items: [] },
    { label: "Older", items: [] },
  ];

  for (const item of items) {
    const t = getTime(item);
    const index = t >= today ? 0 : t >= yesterday ? 1 : t >= weekAgo ? 2 : 3;
    groups[index].items.push(item);
  }

  return groups.filter((group) => group.items.length > 0);
}

const timeFormatter = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" });
const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
const fullFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" });

/** "3:42 PM" today, otherwise "Sep 24". */
export function formatDate(timestamp: number, now: Date = new Date()) {
  const date = new Date(timestamp);
  return startOfDay(date) === startOfDay(now)
    ? timeFormatter.format(date)
    : dateFormatter.format(date);
}

export function formatTime(timestamp: number) {
  return timeFormatter.format(new Date(timestamp));
}

export function formatDateTime(timestamp: number) {
  return fullFormatter.format(new Date(timestamp));
}

export function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

/** Title for a new conversation derived from its first prompt. */
export function deriveTitle(prompt: string) {
  const firstLine = prompt.split("\n").find((line) => line.trim().length > 0) ?? "New chat";
  return truncate(firstLine.replace(/^[/#>*\-\s]+/, ""), 48) || "New chat";
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Group messages into turns so compare replies render side by side (A-08). */
export function buildTurns(messages: Message[]): Turn[] {
  const turns: Turn[] = [];
  const byUserId = new Map<string, Turn>();

  for (const message of messages) {
    if (message.role === "user") {
      const turn: Turn = { key: message.id, user: message, replies: [] };
      turns.push(turn);
      byUserId.set(message.id, turn);
      continue;
    }
    const parent = message.parentId ? byUserId.get(message.parentId) : undefined;
    if (parent) parent.replies.push(message);
    else turns.push({ key: message.id, replies: [message] });
  }

  return turns;
}

/** "Good morning" / "Good afternoon" / "Good evening". */
export function greeting(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** "/chat/abc" → "abc"; anything else → undefined. */
export function conversationIdFromPath(pathname: string | null) {
  const match = pathname?.match(/^\/chat\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** True on macOS/iOS, used to show ⌘ instead of Ctrl. Safe on the server. */
export function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
}
