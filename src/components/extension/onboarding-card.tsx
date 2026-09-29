"use client";

import { m } from "motion/react";

import { Button } from "@/components/ui/button";
import { onboardingSteps } from "@/lib/data/extension";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useExtensionStore } from "@/store/extension.store";
import { useSettingsStore } from "@/store/settings.store";

/** Three-step first-run card: pick a model, try an action, pin the extension (C-10). */
export function OnboardingCard() {
  const step = useExtensionStore((state) => state.onboardingStep);
  const setStep = useExtensionStore((state) => state.setOnboardingStep);
  const setOverlay = useExtensionStore((state) => state.setOverlay);
  const setTab = useExtensionStore((state) => state.setTab);
  const updateSettings = useSettingsStore((state) => state.update);

  const current = onboardingSteps[step] ?? onboardingSteps[0];
  const Icon = current.icon;
  const isLast = step === onboardingSteps.length - 1;

  const finish = () => {
    updateSettings({ extensionOnboarded: true });
    setStep(0);
  };

  const act = () => {
    if (isLast) return finish();
    setStep(step + 1);
    if (current.id === "model") setOverlay("models");
    if (current.id === "action") setTab("actions");
  };

  return (
    <m.section
      key={current.id}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      aria-labelledby="ext-onboarding-title"
      className="rounded-2xl border bg-card p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-primary">
          Welcome · Step {step + 1} of {onboardingSteps.length}
        </p>
        <button
          type="button"
          onClick={finish}
          className="rounded text-xs text-muted-foreground underline-offset-2 hover:underline"
        >
          Skip tour
        </button>
      </div>
      <span className="mt-4 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <h3 id="ext-onboarding-title" className="mt-3 font-semibold">
        {current.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{current.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <ol aria-label="Progress" className="flex gap-1.5">
          {onboardingSteps.map((item, index) => (
            <li
              key={item.id}
              aria-current={index === step ? "step" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === step ? "w-5 bg-primary" : "w-1.5 bg-input",
              )}
            >
              <span className="sr-only">{item.title}</span>
            </li>
          ))}
        </ol>
        <div className="flex gap-1.5">
          {step > 0 && (
            <Button size="sm" variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button size="sm" onClick={act}>
            {current.action}
          </Button>
        </div>
      </div>
    </m.section>
  );
}
