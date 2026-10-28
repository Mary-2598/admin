
"use client";

import { periodOptions, selectFilters } from "@/config/filters.config";
import { cn } from "@/lib/cn";
import { Select } from "@/components/ui/Select";
import type { DashboardFilters } from "@/types/dashboard";

export interface FilterBarProps {
  filters: DashboardFilters;
  onChange: <K extends keyof DashboardFilters>(
    key: K,
    value: DashboardFilters[K],
  ) => void;
}

/** Shared filter bar for dashboard and messages pages. */
export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div
        role="group"
        aria-label="بازه زمانی"
        className="flex flex-wrap gap-2"
      >
        {periodOptions.map((option) => {
          const active = filters.period === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange("period", option.value)}
              className={cn(
                "h-10 min-w-24 rounded-lg border px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                active
                  ? "border-brand/50 bg-cyan-50 text-ink"
                  : "border-line bg-white text-muted hover:bg-page hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="ms-auto flex flex-wrap items-center gap-4">
        {selectFilters.map((filter) => (
          <Select
            key={filter.key}
            label={filter.label}
            value={filters[filter.key]}
            options={filter.options}
            onChange={(value) => onChange(filter.key, value)}
          />
        ))}
      </div>
    </div>
  );
}
