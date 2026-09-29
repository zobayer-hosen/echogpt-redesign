"use client";

import { m } from "motion/react";
import { useId } from "react";

import { pillTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  legend: string;
  hideLegend?: boolean;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Native radio group styled as a segmented control, so arrow keys and screen
 * readers work out of the box. The active pill animates with `layoutId`.
 */
export function SegmentedControl<T extends string>({
  legend,
  hideLegend,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const id = useId();

  return (
    <fieldset className={className}>
      <legend className={cn("mb-2 text-sm font-medium", hideLegend && "sr-only")}>{legend}</legend>
      <div className="inline-flex w-full rounded-xl border bg-muted p-1">
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring pointer-coarse:h-11",
                checked ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {checked && (
                <m.span
                  layoutId={`${id}-pill`}
                  transition={pillTransition}
                  className="absolute inset-0 rounded-lg bg-card shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
