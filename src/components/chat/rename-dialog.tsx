"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { describedBy, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chat.store";
import type { Conversation } from "@/types";

const renameSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Give the chat a title.")
    .max(80, "Keep the title under 80 characters."),
});

type RenameValues = z.infer<typeof renameSchema>;

interface RenameDialogProps {
  conversation: Conversation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RenameDialog({ conversation, open, onOpenChange }: RenameDialogProps) {
  const rename = useChatStore((state) => state.renameConversation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenameValues>({
    resolver: zodResolver(renameSchema),
    values: { title: conversation.title },
  });

  const onSubmit = handleSubmit(({ title }) => {
    rename(conversation.id, title);
    onOpenChange(false);
    toast.success("Chat renamed");
  });

  const error = errors.title?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Rename chat">
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <Field id="rename-title" label="Title" error={error}>
            <Input
              id="rename-title"
              autoFocus
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={describedBy("rename-title", { error })}
              {...register("title")}
            />
          </Field>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
