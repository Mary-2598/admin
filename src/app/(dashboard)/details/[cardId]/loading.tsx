import { Skeleton } from "@/components/ui/Skeleton";

export default function DetailsLoading() {
  return (
    <div role="status" aria-label="در حال بارگذاری جزئیات" className="flex flex-col gap-6">
      <Skeleton className="h-10 w-full max-w-md" />
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Skeleton className="h-[420px] rounded-xl" />
        <Skeleton className="h-[420px] rounded-xl" />
      </div>
    </div>
  );
}
