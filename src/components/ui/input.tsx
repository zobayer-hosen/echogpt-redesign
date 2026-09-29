import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Shared look for text fields; `border-input` keeps 3:1 non-text contrast. */
export const fieldClass =
  "w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(fieldClass, "h-10 pointer-coarse:h-11", className)} {...props} />;
}
