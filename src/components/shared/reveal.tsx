"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { fadeUp, hoverLift, inViewOnce, stagger } from "@/lib/motion";

/*
 * Scroll-reveal wrappers (NFR-M1). Client islands that accept server-rendered
 * children, so landing sections stay Server Components.
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function RevealList({ children, className }: RevealProps) {
  return (
    <m.ul
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className={className}
    >
      {children}
    </m.ul>
  );
}

export function RevealItem({ children, className, lift }: RevealProps & { lift?: boolean }) {
  return (
    <m.li variants={fadeUp} whileHover={lift ? hoverLift : undefined} className={className}>
      {children}
    </m.li>
  );
}
