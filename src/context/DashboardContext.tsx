"use client";

import {
  createContext, startTransition, useContext, useEffect, useMemo, useState,
  type ReactNode,
} from "react";
import { defaultFilters } from "@/config/filters.config";
import { getDashboardStats } from "@/services/dashboard.service";
import type { CardStats, DashboardFilters } from "@/types/dashboard";

const STORAGE_KEY = "hamsood:dashboard-filters";

interface DashboardContextValue {
  filters: DashboardFilters;
  setFilter: <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => void;
  statsById: ReadonlyMap<string, CardStats>;
  isLoading: boolean;
  hasError: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

const keyOf = (filters: DashboardFilters) => JSON.stringify(filters);

function readSaved(): DashboardFilters | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultFilters, ...(JSON.parse(raw) as Partial<DashboardFilters>) } : null;
  } catch {
    return null;
  }
}

function save(filters: DashboardFilters) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    /* storage unavailable (private mode) - filters just aren't persisted */
  }
}

export function DashboardProvider({
  initialStats,
  children,
}: {
  initialStats: CardStats[];
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [result, setResult] = useState({ key: keyOf(defaultFilters), stats: initialStats, failed: false });

  const currentKey = keyOf(filters);
  const isLoading = result.key !== currentKey;

  // Restore saved filters after hydration (never during render -> no mismatch).
  useEffect(() => {
    const saved = readSaved();
    if (saved) startTransition(() => setFilters(saved));
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    let cancelled = false;
    getDashboardStats(filters)
      .then((stats) => !cancelled && setResult({ key: currentKey, stats, failed: false }))
      .catch(() => !cancelled && setResult((prev) => ({ ...prev, key: currentKey, failed: true })));
    return () => {
      cancelled = true;
    };
  }, [isLoading, currentKey, filters]);

  const value = useMemo<DashboardContextValue>(
    () => ({
      filters,
      setFilter: (key, val) => {
        const next = { ...filters, [key]: val };
        setFilters(next);
        save(next);
      },
      statsById: new Map(result.stats.map((s) => [s.id, s])),
      isLoading,
      hasError: result.failed,
    }),
    [filters, result, isLoading],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return ctx;
}
