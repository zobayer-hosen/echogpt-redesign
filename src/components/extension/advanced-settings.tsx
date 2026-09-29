"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { describedBy, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DEFAULT_API_ENDPOINT } from "@/lib/data/extension";
import { useSettingsStore } from "@/store/settings.store";

const endpointSchema = z.object({
  apiEndpoint: z
    .string()
    .trim()
    .url("Enter a full URL, e.g. https://api.example.com/v1")
    .refine((value) => value.startsWith("https://"), "Use a secure https:// address."),
});

type EndpointValues = z.infer<typeof endpointSchema>;

/**
 * Technical settings live behind a collapsed "Advanced" section instead of
 * greeting every user (UX audit #7). Validated with zod.
 */
export function AdvancedSettings() {
  const apiEndpoint = useSettingsStore((state) => state.apiEndpoint);
  const update = useSettingsStore((state) => state.update);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EndpointValues>({ resolver: zodResolver(endpointSchema), values: { apiEndpoint } });

  const onSubmit = handleSubmit((values) => {
    update(values);
    toast.success("API endpoint saved");
  });

  const hint = "Only change this if your organisation runs its own EchoGPT gateway.";
  const error = errors.apiEndpoint?.message;

  return (
    <Collapsible.Root className="rounded-xl border">
      <Collapsible.Trigger className="group flex w-full items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium">
        Advanced
        <ChevronRight
          aria-hidden="true"
          className="size-4 transition-transform group-data-[state=open]:rotate-90"
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="border-t px-3 py-3">
        <form onSubmit={onSubmit} noValidate className="grid gap-3">
          <Field id="ext-endpoint" label="API endpoint" hint={hint} error={error}>
            <Input
              id="ext-endpoint"
              type="url"
              inputMode="url"
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={describedBy("ext-endpoint", { hint, error })}
              {...register("apiEndpoint")}
            />
          </Field>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                update({ apiEndpoint: DEFAULT_API_ENDPOINT });
                reset({ apiEndpoint: DEFAULT_API_ENDPOINT });
              }}
            >
              Reset
            </Button>
            <Button size="sm" type="submit" disabled={!isDirty}>
              Save
            </Button>
          </div>
        </form>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
