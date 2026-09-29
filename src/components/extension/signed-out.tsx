"use client";

import { LogoMark } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useExtensionStore } from "@/store/extension.store";

/** Shown after "Sign out" in the demo; signing back in is instant. */
export function SignedOut() {
  const setSignedIn = useExtensionStore((state) => state.setSignedIn);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <LogoMark className="size-12" />
      <div>
        <h3 className="font-semibold">You’re signed out</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to chat with every model and keep your history in sync.
        </p>
      </div>
      <Button onClick={() => setSignedIn(true)} className="w-full">
        Continue with Google
      </Button>
      <p className="text-xs text-muted-foreground">Demo only — no account is contacted.</p>
    </div>
  );
}
