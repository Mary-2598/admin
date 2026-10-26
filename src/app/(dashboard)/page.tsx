import type { Metadata } from "next";
import { CardGrid } from "@/components/dashboard/CardGrid";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { defaultFilters } from "@/config/filters.config";
import { DashboardProvider } from "@/context/DashboardContext";
import { getDashboardStats } from "@/services/dashboard.service";

export const metadata: Metadata = { title: "خانه" };

export default async function HomePage() {
  const initialStats = await getDashboardStats(defaultFilters);
  return (
    <DashboardProvider initialStats={initialStats}>
      <h1 className="sr-only">خانه</h1>
      <FilterBar />
      <CardGrid />
    </DashboardProvider>
  );
}
