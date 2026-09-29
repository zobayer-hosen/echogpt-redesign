import Link from "next/link";

import { GithubIcon } from "@/components/shared/brand-icons";
import { Logo } from "@/components/shared/logo";
import { footerColumns, socialLinks } from "@/lib/data/navigation";
import type { NavLink } from "@/types";

import { containerClass } from "./section";

function FooterLink({ link }: { link: NavLink }) {
  const className = "text-sm text-muted-foreground transition-colors hover:text-foreground";
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

/** B-10: logo, link columns, socials, copyright. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className={`${containerClass} grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]`}>
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            Every top AI model in one sidebar. Chat, summarize and compare without leaving the page.
          </p>
          <ul className="mt-5 flex gap-2" aria-label="Social links">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-lg border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-sans text-sm font-semibold tracking-normal">{column.title}</h2>
            <ul className="mt-4 grid gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t">
        <div
          className={`${containerClass} flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>© {year} EchoGPT. Made by AppifyDevs.</p>
          <p>Redesign concept — models, prices and testimonials are sample content.</p>
        </div>
      </div>
    </footer>
  );
}
