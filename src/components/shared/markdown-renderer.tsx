"use client";

import type { Element, ElementContent } from "hast";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import { CodeBlock } from "./code-block";

function textOf(node: ElementContent | Element): string {
  if (node.type === "text") return node.value;
  if ("children" in node)
    return node.children.map((child) => textOf(child as ElementContent)).join("");
  return "";
}

function languageOf(node: Element | undefined) {
  const code = node?.children.find(
    (child): child is Element => child.type === "element" && child.tagName === "code",
  );
  const classes = code?.properties.className;
  const list = Array.isArray(classes) ? classes.map(String) : [];
  return list.find((name) => name.startsWith("language-"))?.replace("language-", "");
}

const components: Components = {
  pre: ({ node, children }) => (
    <CodeBlock language={languageOf(node)} code={node ? textOf(node) : ""}>
      {children}
    </CodeBlock>
  ),
  // Block code has a language class or a trailing newline; inline code has neither.
  code: ({ className, children, ...props }) =>
    /hljs|language-/.test(className ?? "") || String(children).includes("\n") ? (
      <code className={className} {...props}>
        {children}
      </code>
    ) : (
      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...props}>
        {children}
      </code>
    ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline underline-offset-2"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-left text-[0.95em]">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b bg-muted px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b px-3 py-2 align-top">{children}</td>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-4 border-primary/40 pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-6 marker:text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-6 marker:text-muted-foreground">{children}</ol>
  ),
  p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
  h1: ({ children }) => (
    <h3 className="mt-4 mb-2 font-sans text-[1.15em] font-semibold">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="mt-4 mb-2 font-sans text-[1.1em] font-semibold">{children}</h3>
  ),
  h3: ({ children }) => <h4 className="mt-3 mb-1.5 font-semibold">{children}</h4>,
  hr: () => <hr className="my-4" />,
};

/** Renders assistant replies: GFM tables/lists, highlighted code blocks with copy. */
function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("leading-relaxed break-words", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);
