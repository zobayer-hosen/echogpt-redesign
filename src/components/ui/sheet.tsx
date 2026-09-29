"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "motion/react";
import type { ReactNode } from "react";

import { slideInLeft, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { DialogOverlay } from "./dialog";

/** Slide-over drawer built on the Radix dialog (mobile sidebar, mobile nav). */

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  title: string;
  className?: string;
  /** Runs after the close animation; call preventDefault() to manage focus yourself. */
  onCloseAutoFocus?: (event: Event) => void;
  children: ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  side = "left",
  title,
  className,
  onCloseAutoFocus,
  children,
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogOverlay />
            <DialogPrimitive.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onCloseAutoFocus={onCloseAutoFocus}
            >
              <m.div
                variants={side === "left" ? slideInLeft : slideInRight}
                initial="hidden"
                animate="show"
                exit="exit"
                className={cn(
                  "fixed inset-y-0 z-50 flex h-dvh w-[min(20rem,86vw)] flex-col bg-card shadow-2xl",
                  side === "left" ? "left-0 border-r" : "right-0 border-l",
                  className,
                )}
              >
                <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
                {children}
              </m.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

export const SheetClose = DialogPrimitive.Close;
