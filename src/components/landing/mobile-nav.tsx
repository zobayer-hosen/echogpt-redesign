"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type MouseEvent, useRef, useState } from "react";

import { ChromeIcon } from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { landingNav } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/site";

/** Hamburger sheet for < 768 px (B-00). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pendingTarget = useRef<string | null>(null);

  // The sheet's scroll lock lasts until its exit animation ends, so remember the
  // anchor and scroll (and move focus) once the sheet has fully closed.
  const onAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    pendingTarget.current = id;
    setOpen(false);
  };

  const onCloseAutoFocus = (event: Event) => {
    const id = pendingTarget.current;
    if (!id) return;
    event.preventDefault();
    pendingTarget.current = null;
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
      window.history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <>
      <IconButton
        label="Open menu"
        tooltip={false}
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="right"
        title="Menu"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo />
          <SheetClose asChild>
            <IconButton label="Close menu" tooltip={false}>
              <X />
            </IconButton>
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
          <ul className="grid gap-1">
            {landingNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => onAnchorClick(event, link.href)}
                  className="flex h-12 items-center rounded-lg px-3 text-base font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-2 border-t p-4">
          <Button asChild size="lg" variant="outline">
            <Link href="/chat">Open app</Link>
          </Button>
          <Button asChild size="lg">
            <a href={siteConfig.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
              <ChromeIcon />
              Add to Chrome
              <span className="sr-only">(opens Chrome Web Store in a new tab)</span>
            </a>
          </Button>
        </div>
      </Sheet>
    </>
  );
}
