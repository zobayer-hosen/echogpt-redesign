import { cn } from "@/lib/utils";

/** Three looping dots shown before the first token arrives (A-07). */
export function TypingIndicator({
  label = "EchoGPT is typing",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" className={cn("inline-flex h-6 items-center gap-1", className)}>
      <span className="sr-only">{label}</span>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="size-1.5 animate-typing rounded-full bg-muted-foreground"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
