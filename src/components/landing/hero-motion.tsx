"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { drift, heroCopy, heroItem, hoverNudge, tapPress, underlineDraw } from "@/lib/motion";

/*
 * Motion islands for the hero (B-01). They accept server-rendered children, so
 * hero.tsx stays a Server Component and only the choreography ships as JS.
 */

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

/** Staggers its HeroItem children in once the page hydrates. */
export function HeroCopy({ children, className }: WrapperProps) {
  return (
    <m.div variants={heroCopy} initial="hidden" animate="show" className={className}>
      {children}
    </m.div>
  );
}

export function HeroItem({ children, className }: WrapperProps) {
  return (
    <m.div variants={heroItem} className={className}>
      {children}
    </m.div>
  );
}

/** Lift on hover, press on tap, for the hero CTAs. */
export function HeroPress({ children, className }: WrapperProps) {
  return (
    <m.div whileHover={hoverNudge} whileTap={tapPress} className={className}>
      {children}
    </m.div>
  );
}

/** Hand-drawn stroke under the headline accent; decorative. */
export function HeroUnderline() {
  return (
    <m.svg
      variants={underlineDraw}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-x-0 -bottom-[0.12em] h-[0.18em] w-full origin-left text-primary/50"
    >
      <path
        d="M2 9 C 50 3, 120 2, 198 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </m.svg>
  );
}

const glowA = drift(40, 24, 18);
const glowB = drift(-36, 30, 22);
const glowC = drift(28, -20, 26);

/** Dot grid fading out from the top, with slowly drifting colour glows. */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[22px_22px]" />
      <m.div
        animate={glowA}
        className="absolute -top-56 left-1/2 size-160 -translate-x-1/2 rounded-full bg-accent opacity-80 blur-3xl"
      />
      <m.div
        animate={glowB}
        className="absolute top-1/4 -right-48 size-120 rounded-full bg-primary/15 blur-3xl"
      />
      <m.div
        animate={glowC}
        className="absolute -bottom-48 -left-40 size-104 rounded-full bg-primary/10 blur-3xl"
      />
      {/* Fades the glows into the page so the section has no hard bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
