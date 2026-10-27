import { Skeleton } from "@/components/ui/Skeleton";

export default function MessagesLoading() {
  return (
    <div role="status" aria-label="در حال بارگذاری پیام‌ها" className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-10 w-24" />)}
        <Skeleton className="ms-auto h-10 w-40" />
      </div>
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
      </div>
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Skeleton className="h-[460px] rounded-2xl" />
        <Skeleton className="h-[460px] rounded-2xl" />
      </div>
      <Skeleton className="h-56 rounded-2xl" />
    </div>
  );
}
