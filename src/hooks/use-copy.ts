"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/** Copy text to the clipboard with a toast and a temporary `copied` flag. */
export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string, message = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(message);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
      } catch {
        toast.error("Couldn't copy — your browser blocked clipboard access.");
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
