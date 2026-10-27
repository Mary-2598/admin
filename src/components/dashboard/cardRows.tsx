import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import type { CardRow, DashboardCardId } from "@/types/dashboard";

export interface RowsProps {
  rows: readonly CardRow[];
  extraRows?: readonly CardRow[];
}

function display(value: string | undefined): string {
  if (value === undefined) return formatNumber(0);
  const n = Number(value);
  return value.trim() !== "" && Number.isFinite(n) ? formatNumber(n) : value;
}

export function DefaultRows({ rows, extraRows }: RowsProps) {
  const hasLabels = rows.some((r) => r.label);
  
  if (!hasLabels) {
    // ... کدهای قبلی برای لیبل خالی ...
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
            className={cn(
              "flex min-h-[60px] flex-col items-center justify-center rounded-lg border bg-page p-2 text-center shadow-sm transition-colors hover:bg-white",
              // اگر flagged بود، حاشیه و رنگ پس‌زمینه قرمز ملایم بگیرد
              row.flagged 
                ? "border-red-200 bg-red-50/50 hover:border-red-300" 
                : "border-line hover:border-brand/30"
            )}
          >
            <span className={cn(
              "text-sm font-extrabold leading-none",
              // رنگ متن اعداد
              row.flagged ? "text-red-600" : "text-ink"
            )}>
              {display(row.value)}
            </span>
            <span className={cn(
              "mt-1 text-[length:var(--card-caption)] leading-tight",
              row.flagged ? "text-red-500 font-medium" : "text-muted"
            )}>
              {row.label}
            </span>
          </div>
        ))}
      </div>

      {/* بخش دوم: لیست دسته‌بندی‌ها */}
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
                  index !== extraRows.length - 1 && "border-b border-dashed border-line/70"
                )}
              >
                <span className="text-muted truncate pe-2">{row.label}</span>
                <span className="font-bold text-ink">{display(row.value)}</span>
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