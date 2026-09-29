"use client";

import { Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { models } from "@/lib/data/models";
import { demoUser } from "@/lib/data/user";
import { clearAllHistory } from "@/store/chat.actions";
import { useSettingsStore } from "@/store/settings.store";
import { useUiStore } from "@/store/ui.store";
import type { FontSize, ThemePreference } from "@/types";

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const fontOptions: { value: FontSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Default" },
  { value: "lg", label: "Large" },
];

/** Theme, default model, font size and clear history (A-12). Changes apply instantly. */
export function SettingsDialog() {
  const open = useUiStore((state) => state.settingsOpen);
  const setOpen = useUiStore((state) => state.setSettingsOpen);
  const { theme = "system", setTheme } = useTheme();
  const defaultModelId = useSettingsStore((state) => state.defaultModelId);
  const fontSize = useSettingsStore((state) => state.fontSize);
  const update = useSettingsStore((state) => state.update);
  const [confirmClear, setConfirmClear] = useState(false);

  const clearHistory = () => {
    clearAllHistory();
    setConfirmClear(false);
    toast.success("All conversations cleared");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setConfirmClear(false);
      }}
    >
      <DialogContent title="Settings" description="Changes are saved automatically on this device.">
        <div className="grid gap-6">
          <SegmentedControl
            legend="Theme"
            options={themeOptions}
            value={theme as ThemePreference}
            onChange={setTheme}
          />

          <Field id="settings-model" label="Default model" hint="Used for every new chat.">
            <NativeSelect
              id="settings-model"
              value={defaultModelId}
              aria-describedby="settings-model-hint"
              onChange={(event) => update({ defaultModelId: event.target.value })}
            >
              {models.map((model) => (
                <option
                  key={model.id}
                  value={model.id}
                  disabled={model.tier === "pro" && demoUser.plan !== "pro"}
                >
                  {model.name}
                  {model.tier === "pro" ? " (Pro)" : ""}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <SegmentedControl
            legend="Message text size"
            options={fontOptions}
            value={fontSize}
            onChange={(value) => update({ fontSize: value })}
          />

          <section
            aria-labelledby="settings-danger"
            className="rounded-xl border border-destructive/40 p-4"
          >
            <h3 id="settings-danger" className="text-sm font-semibold">
              Clear history
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Permanently delete every conversation stored in this browser.
            </p>
            <div className="mt-3 flex flex-wrap gap-2" aria-live="polite">
              {confirmClear ? (
                <>
                  <Button variant="destructive" size="sm" onClick={clearHistory}>
                    <Trash2 /> Yes, delete everything
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setConfirmClear(true)}>
                  <Trash2 /> Clear all conversations
                </Button>
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
