import { dashboardTheme, sizesToCssVars } from "@/config/theme";

export function CardSkeleton() {
  return (
    <div
      aria-hidden
      style={sizesToCssVars(dashboardTheme.cardSizes)}
      className="min-h-[var(--card-h)] w-full animate-pulse rounded-[var(--card-r)] bg-white shadow-card"
    >
      <div className="m-[var(--card-p)] mt-4 h-7 w-3/4 rounded bg-line" />
      <div className="mx-auto mt-8 h-8 w-20 rounded bg-line" />
      <div className="mt-10 flex flex-col gap-[var(--row-gap)] px-[var(--card-p)]">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-[var(--row-h)] rounded-md bg-line" />
        ))}
      </div>
    </div>
  );
}
