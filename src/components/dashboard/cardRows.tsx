import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { CardRow, DashboardCardId } from "@/types/dashboard";

export interface RowsProps {
  rows: readonly CardRow[];
  extraRows?: readonly CardRow[];
}

export function DefaultRows({ rows, extraRows }: RowsProps) {
  
  const hasLabels = rows.some((r) => r.label);
  if (!hasLabels) {
    return (
      <ul className="flex flex-col gap-[var(--row-gap)]">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex h-[var(--row-h)] items-center justify-between rounded-md border border-line bg-white px-2 shadow-sm"
          />
        ))}
      </ul>
    );
  }


  return (
    <div className="mt-2 flex flex-col gap-5">
      {/* بخش اول: ۴ مربع بالایی */}
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex min-h-[60px] flex-col items-center justify-center rounded-lg border border-line bg-page p-2 text-center shadow-sm transition-colors hover:bg-white hover:border-brand/30"
          >
            <span className="text-sm font-extrabold text-ink">
              {row.value ?? 0}
            </span>
            <span className="mt-1 text-[length:var(--card-caption)] text-muted leading-tight">
              {row.label}
            </span>
          </div>
        ))}
      </div>

      {/* بخش دوم: لیست دسته‌بندی‌ها (طراحی تمیزتر) */}
      {extraRows && extraRows.length > 0 && (
        <div className="flex flex-col">
          <p className="text-[length:var(--card-caption)] font-bold text-ink mb-2">
            دسته‌بندی‌ها
          </p>
          <div className="flex flex-col">
            {extraRows.map((row, index) => (
              <div
                key={row.id}
                className={cn(
                  "flex items-center justify-between py-2 text-[length:var(--card-caption)]",
                  // خط‌چین ظریف بین ردیف‌ها (به جز ردیف آخر)
                  index !== extraRows.length - 1 && "border-b border-dashed border-line/70"
                )}
              >
                <span className="text-muted truncate pe-2">{row.label}</span>
                <span className="font-bold text-ink">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Want different content inside a card? Write a component that takes
 * { rows } and register it here under the card id, e.g.
 *   customers: CustomersRows,
 */
export const cardRowRenderers: Partial<Record<DashboardCardId, ComponentType<RowsProps>>> = {};