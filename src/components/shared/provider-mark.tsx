import { getProvider } from "@/lib/data/models";
import { cn } from "@/lib/utils";
import type { ProviderId } from "@/types";

const sizes = {
  xs: "size-4 text-[0.5rem]",
  sm: "size-5 text-[0.625rem]",
  md: "size-7 text-xs",
  lg: "size-10 text-sm",
} as const;

interface ProviderMarkProps {
  provider: ProviderId;
  size?: keyof typeof sizes;
  className?: string;
}

/** Provider monogram. Decorative: the model/provider name is always shown next to it. */
export function ProviderMark({ provider, size = "md", className }: ProviderMarkProps) {
  const info = getProvider(provider);
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-provider-foreground",
        info.colorClass,
        sizes[size],
        className,
      )}
    >
      {info.monogram}
    </span>
  );
}
