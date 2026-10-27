"use client";

import { useDashboard } from "@/context/DashboardContext";
import { FilterBar } from "./FilterBar";

export function DashboardFilterBar() {
  const { filters, setFilter } = useDashboard();
  return <FilterBar filters={filters} onChange={setFilter} />;
}
