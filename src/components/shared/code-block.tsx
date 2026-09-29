"use client";

import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";

import { useCopy } from "@/hooks/use-copy";

interface CodeBlockProps {
  language?: string;
  code: string;
  children: ReactNode;
}

/** Highlighted code block with a language label and copy button (A-03). */
export function CodeBlock({ language, code, children }: CodeBlockProps) {
  const { copied, copy } = useCopy();

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-foreground/10 bg-code text-code-foreground">
      <div className="flex items-center justify-between border-b border-code-foreground/10 py-1 pr-1 pl-4">
        <span className="font-mono text-xs text-code-foreground/80">{language ?? "code"}</span>
        <button
          type="button"
          onClick={() => copy(code, "Code copied")}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-code-foreground/80 transition-colors hover:bg-code-foreground/10 hover:text-code-foreground pointer-coarse:h-11"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3.5" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
          <span className="sr-only"> {language ?? ""} code</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6">{children}</pre>
    </div>
  );
}
