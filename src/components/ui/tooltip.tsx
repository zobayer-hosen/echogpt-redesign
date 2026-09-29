"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps extends Omit<ComponentProps<typeof TooltipPrimitive.Content>, "content"> {
  content: ReactNode;
  children: ReactNode;
}

/** Small label shown on hover/focus. Never the only accessible name. */
export function Tooltip({ content, children, className, sideOffset = 6, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            "z-50 animate-pop-in rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md",
            className,
          )}
          {...props}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
