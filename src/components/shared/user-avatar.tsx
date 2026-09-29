import { demoUser } from "@/lib/data/user";
import { cn } from "@/lib/utils";

/** Initials avatar for the signed-in demo user. Decorative; the name is shown nearby. */
export function UserAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
        className,
      )}
    >
      {demoUser.initials}
    </span>
  );
}
