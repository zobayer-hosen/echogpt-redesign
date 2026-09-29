import Link from "next/link";

import { cn } from "@/lib/utils";

/** EchoGPT mark: a source dot with two echo waves. Decorative; the link carries the name. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <circle cx="11" cy="16" r="3.2" className="fill-primary-foreground" />
      <path
        d="M15.18 11.02A6.5 6.5 0 0 1 15.18 20.98"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-primary-foreground"
      />
      <path
        d="M18.78 8.22A11 11 0 0 1 18.78 23.78"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-primary-foreground opacity-60"
      />
    </svg>
  );
}

interface LogoProps {
  href?: string;
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}

export function Logo({ href = "/", className, markClassName, showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="EchoGPT home"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-semibold tracking-tight",
        className,
      )}
    >
      <LogoMark className={markClassName} />
      {showWordmark && <span className="text-lg">EchoGPT</span>}
    </Link>
  );
}
