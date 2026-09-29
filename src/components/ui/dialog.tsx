"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { type ComponentProps, createContext, type ReactNode, useContext } from "react";

import { dialogIn, overlayFade } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { IconButton } from "./icon-button";

/*
 * Controlled Radix dialog animated with AnimatePresence. Radix provides the
 * focus trap, Escape handling and focus return on close (NFR-A3).
 */

const OpenContext = createContext(false);

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <OpenContext.Provider value={open}>{children}</OpenContext.Provider>
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function useDialogOpen() {
  return useContext(OpenContext);
}

export function DialogOverlay() {
  return (
    <DialogPrimitive.Overlay asChild forceMount>
      <m.div
        variants={overlayFade}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px] dark:bg-black/60"
      />
    </DialogPrimitive.Overlay>
  );
}

interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  title: string;
  description?: string;
  /** Visually hide the title (it is still announced). */
  hideTitle?: boolean;
}

export function DialogContent({
  title,
  description,
  hideTitle,
  className,
  children,
  ...props
}: DialogContentProps) {
  const open = useDialogOpen();
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogOverlay />
          <DialogPrimitive.Content
            asChild
            forceMount
            {...(description ? {} : { "aria-describedby": undefined })}
            {...props}
          >
            <m.div
              variants={dialogIn}
              initial="hidden"
              animate="show"
              exit="exit"
              className={cn(
                "fixed inset-x-4 top-[max(1rem,8dvh)] z-50 mx-auto flex max-h-[84dvh] w-auto max-w-lg flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-2xl sm:inset-x-6",
                className,
              )}
            >
              <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
                <div className={cn("min-w-0", hideTitle && "sr-only")}>
                  <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title>
                  {description && (
                    <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                </div>
                <DialogPrimitive.Close asChild>
                  <IconButton label="Close dialog" size="icon-sm" tooltip={false} className="-mr-1">
                    <X />
                  </IconButton>
                </DialogPrimitive.Close>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
            </m.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}
