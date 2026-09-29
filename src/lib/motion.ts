import type { Transition, Variants } from "motion/react";

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
export const tapPress = { scale: 0.97 } as const;

export const inViewOnce = { once: true, amount: 0.2 } as const;
