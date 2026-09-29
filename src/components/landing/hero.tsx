import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ChromeIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/data/landing";
import { siteConfig } from "@/lib/site";

import { HeroMock } from "./hero-mock";
import { containerClass } from "./section";

const WORD_STAGGER_MS = 90;

/**
 * B-01. The headline animates with CSS keyframes instead of Motion so it is
 * painted before hydration: the LCP element never waits for JavaScript.
 */
export function Hero() {
  const accentDelay = hero.titleWords.length * WORD_STAGGER_MS;

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 size-144 -translate-x-1/2 rounded-full bg-accent opacity-70 blur-3xl" />
      </div>

      <div
        className={`${containerClass} grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28`}
      >
        <div className="text-center lg:text-left">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" className="text-display text-balance">
            {hero.titleWords.map((word, index) => (
              <span key={word}>
                <span
                  className="inline-block animate-fade-up"
                  style={{ animationDelay: `${index * WORD_STAGGER_MS}ms` }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
            <span
              className="inline-block animate-fade-up text-primary italic"
              style={{ animationDelay: `${accentDelay}ms` }}
            >
              {hero.titleAccent}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground lg:mx-0">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button asChild size="lg">
              <a href={siteConfig.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                <ChromeIcon className="size-5" />
                {hero.primaryCta}
                <span className="sr-only">(opens Chrome Web Store in a new tab)</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/chat">
                {hero.secondaryCta}
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {hero.trust} · v{siteConfig.extensionVersion} · Updated {siteConfig.extensionUpdated}
          </p>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}
