import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { CardRow, DashboardCardId } from "@/types/dashboard";

export interface RowsProps {
  rows: readonly CardRow[];
}

export function DefaultRows({ rows }: RowsProps) {
  return (
    <ul className="flex flex-col gap-[var(--row-gap)]">
      {rows.map((row) => (
        <li
          key={row.id}
          className={cn(
            "flex h-[var(--row-h)] items-center justify-between gap-1 rounded-md border border-line bg-white px-2 text-[length:var(--card-caption)] shadow-sm",
          )}
        >
          <span className="truncate">{row.label}</span>
          {row.value ? <span className="font-bold">{row.value}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Want different content inside a card? Write a component that takes
 * { rows } and register it here under the card id, e.g.
 *   customers: CustomersRows,
 */
export const cardRowRenderers: Partial<Record<DashboardCardId, ComponentType<RowsProps>>> = {};
