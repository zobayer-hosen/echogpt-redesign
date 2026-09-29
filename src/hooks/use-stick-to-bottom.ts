"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const THRESHOLD_PX = 96;

/**
 * Keeps a scroll container pinned to the bottom while its content grows
 * (streaming replies), unless the reader has scrolled up. Honors a `#id`
 * deep link on first render. Re-initialises when `resetKey` changes.
 */
export function useStickToBottom(resetKey: string) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const [atBottom, setAtBottom] = useState(true);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;
    if (target && scroller.contains(target)) {
      stick.current = false;
      target.scrollIntoView({ block: "center" });
    } else {
      stick.current = true;
      scroller.scrollTop = scroller.scrollHeight;
    }

    const observer = new ResizeObserver(() => {
      if (stick.current) scroller.scrollTop = scroller.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, [resetKey]);

  const onScroll = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const near = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < THRESHOLD_PX;
    stick.current = near;
    setAtBottom(near);
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const scroller = scrollRef.current;
    stick.current = true;
    scroller?.scrollTo({ top: scroller.scrollHeight, behavior });
  }, []);

  return { scrollRef, contentRef, atBottom, onScroll, scrollToBottom };
}
