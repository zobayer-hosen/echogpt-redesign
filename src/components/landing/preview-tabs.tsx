"use client";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { previewTabs } from "@/lib/data/landing";

const SIZES = "(min-width: 1280px) 1152px, (min-width: 640px) 90vw, 100vw";

/**
 * B-04: tabbed screenshots of this build. Light and dark captures swap with the
 * theme; inactive tabs are unmounted so their images only load when selected.
 */
export function PreviewTabs() {
  return (
    <Tabs defaultValue={previewTabs[0].id} className="flex flex-col items-center">
      <TabsList aria-label="Product surfaces" className="max-w-full overflow-x-auto">
        {previewTabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {previewTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-8 w-full">
          <figure>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
              <Image
                src={`/screenshots/${tab.image}-light.png`}
                alt={`${tab.label}: ${tab.caption}`}
                width={tab.width}
                height={tab.height}
                sizes={SIZES}
                className="h-auto w-full dark:hidden"
              />
              <Image
                src={`/screenshots/${tab.image}-dark.png`}
                alt={`${tab.label}: ${tab.caption}`}
                width={tab.width}
                height={tab.height}
                sizes={SIZES}
                className="hidden h-auto w-full dark:block"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {tab.caption}
            </figcaption>
          </figure>
        </TabsContent>
      ))}
    </Tabs>
  );
}
