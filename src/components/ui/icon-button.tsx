"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button } from "./button";
import { Tooltip } from "./tooltip";

interface IconButtonProps extends Omit<ComponentProps<typeof Button>, "aria-label"> {
  /** Required accessible name (NFR-A4); also shown as a tooltip. */
  label: string;
  tooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
}

export function IconButton({
  label,
  tooltip = true,
  tooltipSide,
  size = "icon",
  variant = "ghost",
  children,
  ...props
}: IconButtonProps) {
  const button = (
    <Button aria-label={label} size={size} variant={variant} {...props}>
      {children}
    </Button>
  );

  if (!tooltip) return button;
  return (
    <Tooltip content={label} side={tooltipSide}>
      {button}
    </Tooltip>
  );
}
