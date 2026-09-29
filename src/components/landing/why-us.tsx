import { Check, Minus } from "lucide-react";

import { Reveal, RevealItem, RevealList } from "@/components/shared/reveal";
import { sections } from "@/lib/data/landing";
import { benefits, comparisonRows } from "@/lib/data/why-us";

import { Section } from "./section";

function Mark({ value }: { value: boolean }) {
  return value ? (
    <>
      <Check aria-hidden="true" className="mx-auto size-5 text-success" />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <Minus aria-hidden="true" className="mx-auto size-5 text-muted-foreground" />
      <span className="sr-only">No</span>
    </>
  );
}

/** B-05: benefit blocks plus a comparison against using separate AI sites. */
export function WhyUs() {
  return (
    <Section id="why" copy={sections.why}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <RevealList className="grid gap-6 sm:grid-cols-2">
          {benefits.map(({ id, title, description, icon: Icon }) => (
            <RevealItem key={id}>
              <Icon aria-hidden="true" className="mb-3 size-6 text-primary" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-muted-foreground">{description}</p>
            </RevealItem>
          ))}
        </RevealList>

        <Reveal className="overflow-hidden rounded-2xl border bg-card">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">EchoGPT compared with using separate AI sites</caption>
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">
                  Feature
                </th>
                <th scope="col" className="w-24 px-2 py-3 text-center font-semibold text-primary sm:w-28">
                  EchoGPT
                </th>
                <th scope="col" className="w-24 px-2 py-3 text-center font-medium text-muted-foreground sm:w-28">
                  Separate sites
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-4 py-3.5 font-normal">
                    {row.label}
                  </th>
                  <td className="px-2 py-3.5">
                    <Mark value={row.echogpt} />
                  </td>
                  <td className="px-2 py-3.5">
                    <Mark value={row.separate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </Section>
  );
}
