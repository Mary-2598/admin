import { CardSkeleton } from "@/components/dashboard/CardSkeleton";
import { dashboardCards } from "@/config/dashboard.config";
import { dashboardTheme } from "@/config/theme";



export default function Loading() {
  return (
    <div
      role="status"
      aria-label="در حال بارگذاری"
      className="grid grid-cols-1 gap-[var(--grid-gap)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      style={{ "--grid-gap": `${dashboardTheme.gridGap}px` } as React.CSSProperties}
    >
      {dashboardCards.map((c) => (
        <CardSkeleton key={c.id} />
      ))}
    </div>
  );
}