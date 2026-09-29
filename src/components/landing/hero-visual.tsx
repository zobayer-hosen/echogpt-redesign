"use client";

import { Sparkles } from "lucide-react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { ProviderMark } from "@/components/shared/provider-mark";
import { Kbd } from "@/components/ui/kbd";
import { hero } from "@/lib/data/landing";
import { providers } from "@/lib/data/models";
import { heroVisual, idleFloat, popIn, tiltSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { HeroMock } from "./hero-mock";

const MAX_TILT = 7;
const providerList = Object.values(providers);
const { summary, providers: providersCopy, shortcut } = hero.highlights;

const mockFloat = idleFloat(7, 6);
const floatA = idleFloat(5);
const floatB = idleFloat(6.5, 10);
const floatC = idleFloat(5.5, 7);

interface ChipProps {
  className: string;
  delay: number;
  float: ReturnType<typeof idleFloat>;
  children: ReactNode;
}

/** A floating card around the mock: springs in, then bobs gently. */
function FloatingChip({ className, delay, float, children }: ChipProps) {
  return (
    <m.div
      variants={popIn}
      custom={delay}
      className={cn("absolute z-10 hidden sm:block", className)}
    >
      <m.div
        animate={float}
        className="flex items-center gap-3 rounded-2xl border bg-card/90 px-3.5 py-2.5 shadow-xl shadow-primary/10 backdrop-blur-md"
      >
        {children}
      </m.div>
    </m.div>
  );
}

/**
 * B-01 visual: the product mock tilts toward the pointer in 3D, floats, and is
 * surrounded by highlight cards. The whole group is one image to AT.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), tiltSpring);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), tiltSpring);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <m.div
      role="img"
      aria-label="EchoGPT side panel beside a web page, comparing answers from Claude Sonnet and Gemini Flash"
      variants={heroVisual}
      initial="hidden"
      animate="show"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
    >
      <m.div style={{ rotateX, rotateY, transformPerspective: 1200 }}>
        <m.div animate={mockFloat}>
          <HeroMock />
        </m.div>
      </m.div>

      <FloatingChip delay={1.5} float={floatA} className="top-14 -left-6 lg:-left-10">
        <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Sparkles className="size-4.5" />
        </span>
        <span className="grid leading-tight">
          <span className="text-sm font-semibold">{summary.title}</span>
          <span className="text-xs text-muted-foreground">{summary.detail}</span>
        </span>
      </FloatingChip>

      <FloatingChip delay={1.75} float={floatB} className="-bottom-8 left-4 lg:-left-6">
        <span className="font-display text-4xl leading-none text-primary">
          {providerList.length}
        </span>
        <span className="grid gap-1.5">
          <span className="flex -space-x-1">
            {providerList.map((provider) => (
              <ProviderMark
                key={provider.id}
                provider={provider.id}
                size="sm"
                className="ring-2 ring-card"
              />
            ))}
          </span>
          <span className="text-xs whitespace-pre-line text-muted-foreground">
            {providersCopy.label}
          </span>
        </span>
      </FloatingChip>

      <FloatingChip delay={2} float={floatC} className="top-1/2 -right-4 lg:-right-8">
        <span className="grid gap-1.5">
          <span className="flex items-center gap-1">
            {shortcut.keys.map((key) => (
              <Kbd key={key}>{key}</Kbd>
            ))}
          </span>
          <span className="text-xs text-muted-foreground">{shortcut.label}</span>
        </span>
      </FloatingChip>
    </m.div>
  );
}
