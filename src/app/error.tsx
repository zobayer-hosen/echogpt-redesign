"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/** Route-level error boundary with retry (NFR-Q6). */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      role="alert"
      className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center"
    >
      <h1 className="text-h2">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error stopped this page from loading. Your chats are safe in this browser.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>
          <RefreshCw /> Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
