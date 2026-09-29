import Link from "next/link";

import { ChromeIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { finalCta } from "@/lib/data/landing";
import { siteConfig } from "@/lib/site";

import { containerClass } from "./section";

/** B-09: full-width closing call to action. */
export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 md:py-28">
      <div className={containerClass}>
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary-foreground/10 blur-2xl"
          />
          <h2 id="cta-heading" className="text-h2 text-balance">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty opacity-90">{finalCta.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 focus-visible:outline-primary-foreground"
            >
              <a href={siteConfig.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                <ChromeIcon className="size-5" />
                {finalCta.cta}
                <span className="sr-only">(opens Chrome Web Store in a new tab)</span>
              </a>
            </Button>
            <Link
              href="/chat"
              className="rounded-lg px-2 py-2 font-medium underline underline-offset-4 hover:no-underline focus-visible:outline-primary-foreground"
            >
              {finalCta.secondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
