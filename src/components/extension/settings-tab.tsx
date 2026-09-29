"use client";

import { LogOut, RotateCcw, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";

import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { NativeSelect } from "@/components/ui/native-select";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { type TranslationLanguage, translationLanguages } from "@/lib/data/extension";
import { models } from "@/lib/data/models";
import { demoUser } from "@/lib/data/user";
import { isApplePlatform } from "@/lib/utils";
import { clearAllHistory } from "@/store/chat.actions";
import { useExtensionStore } from "@/store/extension.store";
import { useSettingsStore } from "@/store/settings.store";
import type { ThemePreference } from "@/types";

import { AdvancedSettings } from "./advanced-settings";

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3">
      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      {children}
    </section>
  );
}

const themes: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

/** Account, preferences, shortcut, privacy and advanced settings (C-07). */
export function SettingsTab() {
  const settings = useSettingsStore();
  const setSignedIn = useExtensionStore((state) => state.setSignedIn);
  const setOnboardingStep = useExtensionStore((state) => state.setOnboardingStep);
  const setTab = useExtensionStore((state) => state.setTab);
  const { theme = "system", setTheme } = useTheme();
  const [confirmClear, setConfirmClear] = useState(false);
  const mod = isApplePlatform() ? "⌘" : "Ctrl";

  return (
    <div className="grid h-full content-start gap-6 overflow-y-auto p-3">
      <h3 className="sr-only">Settings</h3>
      <Group title="Account">
        <div className="flex items-center gap-3 rounded-xl border p-3">
          <UserAvatar className="size-10" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{demoUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{demoUser.email}</p>
          </div>
          <Badge variant="accent" size="sm">
            {demoUser.plan === "pro" ? "Pro" : "Free"}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => setSignedIn(false)}>
          <LogOut /> Sign out
        </Button>
      </Group>

      <Group title="Preferences">
        <label htmlFor="ext-default-model" className="grid gap-1.5 text-sm font-medium">
          Default model
          <NativeSelect
            id="ext-default-model"
            value={settings.defaultModelId}
            onChange={(event) => settings.update({ defaultModelId: event.target.value })}
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
        </label>
        <SegmentedControl
          legend="Theme"
          options={themes}
          value={theme as ThemePreference}
          onChange={setTheme}
        />
        <label htmlFor="ext-language" className="grid gap-1.5 text-sm font-medium">
          Translate into
          <NativeSelect
            id="ext-language"
            value={settings.language}
            onChange={(event) =>
              settings.update({ language: event.target.value as TranslationLanguage })
            }
          >
            {translationLanguages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </NativeSelect>
        </label>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="ext-context-default" className="text-sm">
            <span className="block font-medium">Attach page by default</span>
            <span className="block text-xs text-muted-foreground">
              New prompts include this page
            </span>
          </label>
          <Switch
            id="ext-context-default"
            checked={settings.pageContextDefault}
            onCheckedChange={(checked) => settings.update({ pageContextDefault: checked })}
          />
        </div>
      </Group>

      <Group title="Keyboard shortcut">
        <p className="flex items-center gap-1 text-sm">
          <Kbd>{mod}</Kbd>+<Kbd>Shift</Kbd>+<Kbd>E</Kbd>
          <span className="ml-1 text-muted-foreground">opens EchoGPT</span>
        </p>
        <p className="text-xs text-muted-foreground">Change it at chrome://extensions/shortcuts.</p>
      </Group>

      <Group title="Privacy">
        <p className="text-xs text-muted-foreground">
          Page content is only sent when you run an action or attach it.
        </p>
        <div className="flex flex-wrap gap-2" aria-live="polite">
          {confirmClear ? (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  clearAllHistory();
                  setConfirmClear(false);
                  toast.success("History cleared");
                }}
              >
                Delete all chats
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setConfirmClear(true)}>
              <Trash2 /> Clear history
            </Button>
          )}
        </div>
      </Group>

      <AdvancedSettings />

      <Button
        variant="ghost"
        size="sm"
        className="justify-self-start"
        onClick={() => {
          settings.update({ extensionOnboarded: false });
          setOnboardingStep(0);
          setTab("chat");
        }}
      >
        <RotateCcw /> Replay welcome tour
      </Button>
    </div>
  );
}
