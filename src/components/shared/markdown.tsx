"use client";

import { lazy, Suspense } from "react";

import { cn } from "@/lib/utils";

/*
 * react-markdown + remark-gfm + rehype-highlight are the heaviest chat
 * dependencies, so they load in their own chunk on first use (NFR-P3).
 * Until then the raw text is shown, so replies never flash empty.
 */
const MarkdownRenderer = lazy(() => import("./markdown-renderer"));

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <Suspense fallback={<p className={cn("whitespace-pre-wrap", className)}>{content}</p>}>
      <MarkdownRenderer content={content} className={className} />
    </Suspense>
  );
}
