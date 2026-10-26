"use client";

import { useState } from "react";
import { dashboardCards } from "@/config/dashboard.config";
import { dashboardTheme } from "@/config/theme";
import { useDashboard } from "@/context/DashboardContext";
import { StatCard } from "./StatCard";
import type { DashboardCardId } from "@/types/dashboard";

export function CardGrid() {
  const { statsById, isLoading, hasError } = useDashboard();
  const [selectedId, setSelectedId] = useState<DashboardCardId | null>(null);

  return (
    <section aria-label="آمار کلی" style={{ "--grid-gap": `${dashboardTheme.gridGap}px` } as React.CSSProperties}>
      {hasError ? (
        <p role="alert" className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          دریافت اطلاعات انجام نشد. فیلترها را دوباره انتخاب کنید یا چند لحظه بعد تلاش کنید.
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-[var(--grid-gap)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {dashboardCards.map((config) => (
          <StatCard
            key={config.id}
            config={config}
            stats={statsById.get(config.id)}
            busy={isLoading}
            selected={selectedId === config.id}
            onSelect={() => setSelectedId((prev) => (prev === config.id ? null : config.id))}
          />
        ))}
      </div>
    </section>
  );
}