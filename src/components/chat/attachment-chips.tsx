"use client";

import { Paperclip, X } from "lucide-react";

import { formatBytes, truncate } from "@/lib/utils";
import type { Attachment } from "@/types";

interface AttachmentChipsProps {
  files: Attachment[];
  onRemove: (id: string) => void;
}

/** Selected files above the composer. Attachments are UI-only in this demo. */
export function AttachmentChips({ files, onRemove }: AttachmentChipsProps) {
  return (
    <ul aria-label="Attached files" className="flex flex-wrap gap-1.5">
      {files.map((file) => (
        <li
          key={file.id}
          className="inline-flex items-center gap-1.5 rounded-lg border bg-muted py-1 pr-1 pl-2 text-xs"
        >
          <Paperclip aria-hidden="true" className="size-3.5 text-muted-foreground" />
          <span>{truncate(file.name, 28)}</span>
          <span className="text-muted-foreground">{formatBytes(file.size)}</span>
          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            onClick={() => onRemove(file.id)}
            className="grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground pointer-coarse:size-9"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
