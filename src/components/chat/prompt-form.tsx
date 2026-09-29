"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { describedBy, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { usePromptsStore } from "@/store/prompts.store";
import { PROMPT_CATEGORIES } from "@/types";

const promptSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Use at least 3 characters.")
    .max(60, "Keep the title under 60 characters."),
  category: z.enum(PROMPT_CATEGORIES),
  content: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters.")
    .max(2000, "Keep the prompt under 2,000 characters."),
});

type PromptValues = z.infer<typeof promptSchema>;

/** Create a saved prompt template (A-09). Errors are announced via role="alert". */
export function PromptForm({ onDone }: { onDone: () => void }) {
  const addTemplate = usePromptsStore((state) => state.addTemplate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromptValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: { title: "", category: "Writing", content: "" },
  });

  const onSubmit = handleSubmit((values) => {
    addTemplate(values);
    toast.success(`Saved “${values.title}”`);
    onDone();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-xl border bg-muted/40 p-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
        <Field id="prompt-title" label="Title" error={errors.title?.message}>
          <Input
            id="prompt-title"
            autoFocus
            aria-invalid={Boolean(errors.title) || undefined}
            aria-describedby={describedBy("prompt-title", { error: errors.title?.message })}
            {...register("title")}
          />
        </Field>
        <Field id="prompt-category" label="Category">
          <NativeSelect id="prompt-category" {...register("category")}>
            {PROMPT_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <Field
        id="prompt-content"
        label="Prompt"
        hint="Tip: end with a blank line so you can paste text after it."
        error={errors.content?.message}
      >
        <Textarea
          id="prompt-content"
          rows={4}
          aria-invalid={Boolean(errors.content) || undefined}
          aria-describedby={describedBy("prompt-content", {
            hint: "hint",
            error: errors.content?.message,
          })}
          {...register("content")}
        />
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">Save prompt</Button>
      </div>
    </form>
  );
}
