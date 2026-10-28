
import type { ReactNode } from "react";

interface DetailStatsGridProps {
  children: ReactNode;
  label?: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

const COLUMN_CLASSES: Record<
  NonNullable<DetailStatsGridProps["columns"]>,
  string
> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export function DetailStatsGrid({
  children,
  label = "آمار صفحه",
  columns = 4,
}: DetailStatsGridProps) {
  return (
    <section
      aria-label={label}
      className={`mb-6 grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 ${
        columns === 4
          ? "xl:grid-cols-4"
          : COLUMN_CLASSES[columns]
      }`}
    >
      {children}
    </section>
  );
}
