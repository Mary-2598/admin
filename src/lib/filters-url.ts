import { defaultFilters } from "@/config/filters.config";
import type { DashboardFilters, Period } from "@/types/dashboard";

const PERIODS: readonly Period[] = ["today", "7d", "30d", "3m"];

export function filtersFromParams(params: URLSearchParams): DashboardFilters {
  const period = params.get("period");
  return {
    period: PERIODS.includes(period as Period) ? (period as Period) : defaultFilters.period,
    province: params.get("province") ?? defaultFilters.province,
    city: params.get("city") ?? defaultFilters.city,
    status: params.get("status") ?? defaultFilters.status,
    category: params.get("category") ?? defaultFilters.category,
  };
}

export function filtersToQuery(filters: DashboardFilters): string {
  const q = new URLSearchParams();
  (Object.keys(filters) as Array<keyof DashboardFilters>).forEach((k) => {
    if (filters[k] !== defaultFilters[k]) q.set(k, filters[k]);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}