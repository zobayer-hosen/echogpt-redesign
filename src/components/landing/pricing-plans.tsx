"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { pricingPlans, YEARLY_SAVING_LABEL } from "@/lib/data/pricing";
import { fadeUp, hoverLift, inViewOnce, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BillingCycle, PricingPlan } from "@/types";

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

function PlanCard({ plan, cycle }: { plan: PricingPlan; cycle: BillingCycle }) {
  const price = plan.price[cycle];

  return (
    <m.li
      variants={fadeUp}
      whileHover={hoverLift}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6 lg:p-8",
        plan.highlighted && "border-primary shadow-xl shadow-primary/15 ring-1 ring-primary",
      )}
    >
      {plan.highlighted && (
        <Badge variant="primary" className="absolute -top-3 left-6">
          Most popular
        </Badge>
      )}
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-5xl tracking-tight">${price}</span>
        <span className="text-sm text-muted-foreground">
          {plan.unit}
          {cycle === "yearly" && price > 0 && ", billed yearly"}
        </span>
      </p>
      <ul className="mt-6 grid flex-1 gap-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className="mt-8 w-full"
        variant={plan.highlighted ? "default" : "outline"}
        size="lg"
      >
        {plan.cta.external ? (
          <a href={plan.cta.href} target="_blank" rel="noopener noreferrer">
            {plan.cta.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link href={plan.cta.href}>{plan.cta.label}</Link>
        )}
      </Button>
    </m.li>
  );
}

/** B-06: plan cards with a monthly / yearly toggle (layoutId pill). */
export function PricingPlans() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-xs flex-col items-center gap-2">
        <SegmentedControl
          legend="Billing period"
          hideLegend
          options={cycles}
          value={cycle}
          onChange={setCycle}
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {cycle === "yearly"
            ? `Yearly billing · ${YEARLY_SAVING_LABEL}`
            : `Switch to yearly and ${YEARLY_SAVING_LABEL.toLowerCase()}`}
        </p>
      </div>
      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="grid items-stretch gap-6 md:grid-cols-3"
      >
        {pricingPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} cycle={cycle} />
        ))}
      </m.ul>
    </div>
  );
}
