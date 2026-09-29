"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { describedBy, Field } from "@/components/ui/field";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useExtensionStore } from "@/store/extension.store";
import { usePromptsStore } from "@/store/prompts.store";

const actionSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Use at least 2 characters.")
    .max(28, "Keep the name under 28 characters."),
  prompt: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters.")
    .max(500, "Keep it under 500 characters."),
});

type ActionValues = z.infer<typeof actionSchema>;

/** "Create custom action" (C-06): a named prompt that runs on the current page. */
export function CustomActionForm() {
  const setOverlay = useExtensionStore((state) => state.setOverlay);
  const addCustomAction = usePromptsStore((state) => state.addCustomAction);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionValues>({
    resolver: zodResolver(actionSchema),
    defaultValues: { label: "", prompt: "" },
  });

  const close = () => setOverlay(null);
  const onSubmit = handleSubmit((values) => {
    addCustomAction(values);
    toast.success(`Added “${values.label}” to quick actions`);
    close();
  });

  const promptHint = "It runs with the current page attached.";

  return (
    <section
      aria-labelledby="ext-custom-title"
      onKeyDown={(event) => event.key === "Escape" && close()}
      className="absolute inset-0 z-20 flex flex-col bg-background"
    >
      <div className="flex items-center gap-1 border-b px-2 py-1.5">
        <IconButton label="Back to quick actions" size="icon-sm" tooltip={false} onClick={close}>
          <ArrowLeft />
        </IconButton>
        <h3 id="ext-custom-title" className="text-sm font-semibold">
          Create custom action
        </h3>
      </div>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto p-3"
      >
        <Field id="action-label" label="Name" error={errors.label?.message}>
          <Input
            id="action-label"
            autoFocus
            placeholder="e.g. Explain like I'm 5"
            aria-invalid={Boolean(errors.label) || undefined}
            aria-describedby={describedBy("action-label", { error: errors.label?.message })}
            {...register("label")}
          />
        </Field>
        <Field id="action-prompt" label="Prompt" hint={promptHint} error={errors.prompt?.message}>
          <Textarea
            id="action-prompt"
            rows={5}
            placeholder="Explain this page to a 5-year-old using a simple story."
            aria-invalid={Boolean(errors.prompt) || undefined}
            aria-describedby={describedBy("action-prompt", {
              hint: promptHint,
              error: errors.prompt?.message,
            })}
            {...register("prompt")}
          />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Save action
          </Button>
        </div>
      </form>
    </section>
  );
}
