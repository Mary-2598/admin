"use client";

import { periodOptions, selectFilters } from "@/config/filters.config";
import { cn } from "@/lib/cn";
import { Select } from "@/components/ui/Select";
import type { DashboardFilters } from "@/types/dashboard";

export interface FilterBarProps {
  filters: DashboardFilters;
  onChange: <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => void;
}

/** Presentational: works on the dashboard (context) and on the messages page (URL). */
export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3">
      <div role="group" aria-label="بازه زمانی" className="flex flex-wrap gap-3">
        {periodOptions.map((option) => {
          const active = filters.period === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange("period", option.value)}
              className={cn(
                "h-10 min-w-24 rounded-md border px-4 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                active ? "border-sky-300 bg-sky-200 text-ink" : "border-line bg-white text-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 ms-auto">
        {selectFilters.map((f) => (
          <Select
            key={f.key}
            label={f.label}
            value={filters[f.key]}
            options={f.options}
            onChange={(value) => onChange(f.key, value)}
          />
        ))}
      </div>
    </div>
  );
}