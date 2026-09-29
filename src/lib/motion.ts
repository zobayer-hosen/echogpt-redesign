import type { SpringOptions, TargetAndTransition, Transition, Variants } from "motion/react";

/*
 * Shared Framer Motion variants (PRD §11.4). Components import from here and
 * never define one-off animation objects. Only opacity and transform animate.
 * <MotionConfig reducedMotion="user"> drops the transforms for users who ask.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const messageIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease } },
};

/** Cross-fade between extension tabs. */
export const crossFade: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12, ease } },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  show: { x: 0, transition: { duration: 0.25, ease } },
  exit: { x: "-100%", transition: { duration: 0.2, ease } },
};

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: 0.25, ease } },
  exit: { x: "100%", transition: { duration: 0.2, ease } },
};

export const dialogIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease } },
  exit: { opacity: 0, scale: 0.98, y: 4, transition: { duration: 0.15, ease } },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Spring used by `layoutId` pills (model selector, tab bar, pricing toggle). */
export const pillTransition: Transition = { type: "spring", stiffness: 500, damping: 40 };

export const hoverLift = { y: -4 } as const;
export const hoverNudge = { y: -2 } as const;
export const tapPress = { scale: 0.97 } as const;

export const inViewOnce = { once: true, amount: 0.2 } as const;

/*
 * Hero (B-01). The headline words stay a CSS animation so the LCP text paints
 * before hydration; everything around them is choreographed here.
 */
export const heroCopy: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const heroVisual: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease, delay: 0.15 } },
};

/** Accent underline under the headline; scaleX keeps it transform-only. */
export const underlineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease, delay: 0.7 } },
};

/** Pieces that pop into the hero visual. `custom` is the delay in seconds. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22, delay },
  }),
};

/** Lines and meter bars grow in from the left. `custom` is the delay. */
export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: (delay: number = 0) => ({ scaleX: 1, transition: { duration: 0.5, ease, delay } }),
};

/** Idle bob for floating elements; different durations keep them out of sync. */
export function idleFloat(duration: number, distance = 8): TargetAndTransition {
  return {
    y: [0, -distance, 0],
    transition: { duration, repeat: Infinity, ease: "easeInOut" },
  };
}

/** Slow ambient drift for the hero's background glows. */
export function drift(x: number, y: number, duration: number): TargetAndTransition {
  return {
    x: [0, x, 0],
    y: [0, y, 0],
    transition: { duration, repeat: Infinity, ease: "easeInOut" },
  };
}

/** Spring that smooths the pointer-driven tilt of the hero visual. */
export const tiltSpring: SpringOptions = { stiffness: 150, damping: 18, mass: 0.4 };

/** Swapped content (model spotlight): fades through, children stagger in. */
export const swap: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease, staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease } },
};

export const swapItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

/** Active-tab indicator bar grows from its centre (transform-only, no layout). */
export const indicatorIn: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.25, ease } },
};
