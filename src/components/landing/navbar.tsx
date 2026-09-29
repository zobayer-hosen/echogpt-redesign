import Link from "next/link";

import { ChromeIcon } from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { landingNav } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/site";

import { MobileNav } from "./mobile-nav";
import { containerClass } from "./section";

/** B-00: sticky, blurred navbar with anchor links, theme toggle and both CTAs. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className={`${containerClass} flex h-16 items-center justify-between gap-4`}>
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {landingNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/chat">Open app</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href={siteConfig.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
              <ChromeIcon />
              Add to Chrome
              <span className="sr-only">(opens Chrome Web Store in a new tab)</span>
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
