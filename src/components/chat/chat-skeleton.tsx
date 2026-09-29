import { Skeleton } from "@/components/ui/skeleton";

/** Loading state while conversations are restored from localStorage. */
export function ChatSkeleton() {
  return (
    <div role="status" className="flex h-dvh overflow-hidden">
      <span className="sr-only">Loading your chats…</span>
      <div className="hidden w-16 shrink-0 flex-col gap-3 border-r bg-card p-3 md:flex lg:w-72">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 7 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-14 items-center gap-3 border-b px-4">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="mx-auto grid w-full max-w-3xl flex-1 content-start gap-6 px-4 py-8">
          <Skeleton className="ml-auto h-12 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="ml-auto h-10 w-1/2" />
        </div>
        <div className="border-t p-4">
          <Skeleton className="mx-auto h-24 w-full max-w-3xl rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
