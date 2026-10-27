import { defaultFilters } from "@/config/filters.config";
import type { DashboardFilters } from "@/types/dashboard";

const STORAGE_KEY = "hamsood:dashboard-filters";

export function readSavedFilters(): DashboardFilters | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultFilters, ...(JSON.parse(raw) as Partial<DashboardFilters>) } : null;
  } catch {
    return null;
  }
}

export function saveFilters(filters: DashboardFilters) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    /* storage unavailable (private mode) - filters just aren't persisted */
  }
}
