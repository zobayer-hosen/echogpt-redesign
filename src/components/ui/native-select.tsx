import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { fieldClass } from "./input";

/** Native select: accessible and mobile-friendly by default. */
export function NativeSelect({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(fieldClass, "h-10 cursor-pointer pr-8 pointer-coarse:h-11", className)} {...props}>
      {children}
    </select>
  );
}
