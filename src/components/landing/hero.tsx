import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ChromeIcon } from "@/components/shared/brand-icons";
import { ProviderMark } from "@/components/shared/provider-mark";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/data/landing";
import { providers } from "@/lib/data/models";
import { siteConfig } from "@/lib/site";

import { HeroBackdrop, HeroCopy, HeroItem, HeroPress, HeroUnderline } from "./hero-motion";
import { HeroVisual } from "./hero-visual";
import { containerClass } from "./section";

const WORD_STAGGER_MS = 90;
const providerList = Object.values(providers);

/**
 * B-01. The headline words animate with CSS keyframes instead of Motion so the
 * LCP text is painted before hydration; the rest of the hero is choreographed
 * with Motion islands (hero-motion.tsx, hero-visual.tsx).
 */
export function Hero() {
  const accentDelay = hero.titleWords.length * WORD_STAGGER_MS;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div
        className={`${containerClass} grid items-center gap-16 pt-14 pb-24 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-32`}
      >
        <HeroCopy className="text-center lg:text-left">
          <HeroItem>
            <Link
              href={hero.eyebrow.href}
              className="group mb-7 inline-flex items-center gap-2 rounded-full border bg-card/80 py-1 pr-3 pl-1 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {hero.eyebrow.badge}
              </span>
              {hero.eyebrow.label}
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </HeroItem>

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
              className="relative inline-block animate-fade-up bg-linear-to-r from-primary to-accent-foreground bg-clip-text pe-[0.08em] text-transparent italic"
              style={{ animationDelay: `${accentDelay}ms` }}
            >
              {hero.titleAccent}
              <HeroUnderline />
            </span>
          </h1>

          <HeroItem>
            <p className="mx-auto mt-7 max-w-xl text-lg text-pretty text-muted-foreground lg:mx-0">
              {hero.description}
            </p>
          </HeroItem>

          <HeroItem className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <HeroPress>
              <Button asChild size="lg" className="w-full shadow-lg shadow-primary/25 sm:w-auto">
                <a href={siteConfig.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                  <ChromeIcon className="size-5" />
                  {hero.primaryCta}
                  <span className="sr-only">(opens Chrome Web Store in a new tab)</span>
                </a>
              </Button>
            </HeroPress>
            <HeroPress>
              <Button asChild size="lg" variant="outline" className="group w-full sm:w-auto">
                <Link href="/chat">
                  {hero.secondaryCta}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </HeroPress>
          </HeroItem>

          <HeroItem className="mt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground lg:items-start">
            <p>
              {hero.trust} ·{" "}
              <span className="whitespace-nowrap">
                v{siteConfig.extensionVersion} · Updated {siteConfig.extensionUpdated}
              </span>
            </p>
            <p className="inline-flex items-center gap-2">
              {hero.worksWith}
              <span className="flex -space-x-1">
                {providerList.map((provider) => (
                  <ProviderMark
                    key={provider.id}
                    provider={provider.id}
                    size="sm"
                    className="ring-2 ring-background"
                  />
                ))}
              </span>
              <span className="sr-only">{providerList.map((p) => p.name).join(", ")}</span>
            </p>
          </HeroItem>
        </HeroCopy>

        <HeroVisual />
      </div>
    </section>
  );
}
