import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import type { SectionCopy } from "@/types";

export const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

interface SectionProps {
  id: string;
  copy: SectionCopy;
  className?: string;
  children: ReactNode;
}

/** Landing section: anchor id, heading block and consistent spacing (PRD §11.1). */
export function Section({ id, copy, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    // tabIndex={-1} lets in-page navigation move focus to the section.
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={headingId}
      className={cn("py-20 outline-none md:py-28", className)}
    >
      <div className={containerClass}>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">{copy.eyebrow}</p>
          <h2 id={headingId} className="text-h2 text-balance">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">{copy.description}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
