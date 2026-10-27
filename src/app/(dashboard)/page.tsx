import type { Metadata } from "next";
import { CardGrid } from "@/components/dashboard/CardGrid";
import { DashboardFilterBar } from "@/components/dashboard/DashboardFilterBar";
import { defaultFilters } from "@/config/filters.config";
import { DashboardProvider } from "@/context/DashboardContext";
import { requireSession } from "@/lib/auth-guard";
import { getDashboardStats } from "@/services/dashboard.service";

export const metadata: Metadata = { title: "خانه" };

export default async function HomePage() {
  await requireSession();
  const initialStats = await getDashboardStats(defaultFilters);
  return (
    <DashboardProvider initialStats={initialStats}>
      <h1 className="sr-only">خانه</h1>
      <DashboardFilterBar />
      <CardGrid />
    </DashboardProvider>
  );
}
