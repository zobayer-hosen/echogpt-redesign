import { ArrowLeft, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

/** Custom 404 (NFR-Q6). */
export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <Logo />
      <p className="font-display text-8xl text-primary" aria-hidden="true">
        404
      </p>
      <h1 className="text-h2 text-balance">This page drifted out of range</h1>
      <p className="max-w-md text-muted-foreground">
        The link may be broken or the page may have moved. Try the home page or start a new chat.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            <ArrowLeft /> Back to home
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/chat">
            <MessageSquare /> Open the app
          </Link>
        </Button>
      </div>
    </main>
  );
}
