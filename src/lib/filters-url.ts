import { defaultFilters } from "@/config/filters.config";
import type { DashboardFilters, Period } from "@/types/dashboard";

const PERIODS: readonly Period[] = ["today", "7d", "30d", "3m"];

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads the dashboard filters from Next's `searchParams`; unknown/missing values fall back to defaults. */
export function filtersFromParams(params: RawParams): DashboardFilters {
  const period = first(params.period);
  return {
    period: PERIODS.includes(period as Period) ? (period as Period) : defaultFilters.period,
    province: first(params.province) ?? defaultFilters.province,
    city: first(params.city) ?? defaultFilters.city,
    status: first(params.status) ?? defaultFilters.status,
    category: first(params.category) ?? defaultFilters.category,
  };
}

/** "?period=7d&province=tehran" (only non-default values), or "" when everything is default. */
export function filtersToQuery(filters: DashboardFilters): string {
  const q = new URLSearchParams();
  (Object.keys(filters) as Array<keyof DashboardFilters>).forEach((key) => {
    if (filters[key] !== defaultFilters[key]) q.set(key, filters[key]);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}
