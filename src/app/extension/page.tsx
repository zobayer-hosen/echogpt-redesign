import type { Metadata } from "next";

import { ExtensionDemo } from "@/components/extension/extension-demo";
import { containerClass } from "@/components/landing/section";
import { RevealItem, RevealList } from "@/components/shared/reveal";
import { conceptHighlights, extensionIntro } from "@/lib/data/extension";

export const metadata: Metadata = {
  title: "Chrome extension concept",
  description:
    "Interactive prototype of the redesigned EchoGPT Chrome extension: popup, side panel, quick actions, history and settings.",
  alternates: { canonical: "/extension" },
};

/** Part C: static shell with the interactive prototype as a client island. */
export default function ExtensionPage() {
  return (
    <>
      <section
        aria-labelledby="extension-heading"
        className={`${containerClass} pt-14 pb-10 text-center md:pt-20`}
      >
        <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
          {extensionIntro.eyebrow}
        </p>
        <h1 id="extension-heading" className="text-h2 text-balance">
          {extensionIntro.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">
          {extensionIntro.description}
        </p>
        <ul aria-label="Things to try" className="mt-6 flex flex-wrap justify-center gap-2">
          {extensionIntro.hints.map((hint) => (
            <li
              key={hint}
              className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground"
            >
              {hint}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Interactive extension prototype" className={`${containerClass} pb-16`}>
        <ExtensionDemo />
      </section>

      <section aria-labelledby="concept-heading" className="border-t bg-muted/40 py-20">
        <div className={containerClass}>
          <h2 id="concept-heading" className="text-center text-h2 text-balance">
            What the concept changes
          </h2>
          <RevealList className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {conceptHighlights.map(({ id, title, description, icon: Icon }) => (
              <RevealItem key={id} className="rounded-2xl border bg-card p-5">
                <Icon aria-hidden="true" className="mb-3 size-5 text-primary" />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>
    </>
  );
}
