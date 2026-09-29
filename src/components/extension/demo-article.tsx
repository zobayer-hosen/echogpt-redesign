"use client";

import { useEffect, useRef } from "react";

import { demoArticle } from "@/lib/data/demo-article";
import { cn, truncate } from "@/lib/utils";
import { useExtensionStore } from "@/store/extension.store";

const MIN_SELECTION = 3;

/** Sample page inside the browser frame. Text selected here becomes page context. */
export function DemoArticle({ centered = false }: { centered?: boolean }) {
  const articleRef = useRef<HTMLElement>(null);
  const setSelection = useExtensionStore((state) => state.setSelection);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const capture = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().replace(/\s+/g, " ").trim() ?? "";
        const anchor = selection?.anchorNode;
        if (text.length < MIN_SELECTION || !anchor || !articleRef.current?.contains(anchor)) return;
        setSelection(truncate(text, 500));
      }, 250);
    };
    document.addEventListener("selectionchange", capture);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("selectionchange", capture);
    };
  }, [setSelection]);

  // In popup mode the page leaves room on the right, where the popup opens.
  return (
    <article
      ref={articleRef}
      aria-labelledby="demo-article-title"
      className={cn("mx-auto max-w-2xl px-5 py-8 sm:px-10", !centered && "lg:ml-4 xl:ml-10")}
    >
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        {demoArticle.site}
      </p>
      <h2 id="demo-article-title" className="mt-2 text-4xl text-balance">
        {demoArticle.title}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        By {demoArticle.author} · {demoArticle.date} · {demoArticle.readingTime}
      </p>
      <div className="mt-6 grid gap-5 leading-7 selection:bg-primary selection:text-primary-foreground">
        {demoArticle.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
