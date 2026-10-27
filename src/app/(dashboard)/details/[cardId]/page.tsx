
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardDetailTemplate } from "@/features/dashboard-details/shared/components/DashboardDetailTemplate";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { dashboardCards } from "@/config/dashboard.config";
import { defaultFilters } from "@/config/filters.config";
import { DashboardProvider } from "@/context/DashboardContext";
import { getDashboardStats } from "@/services/dashboard.service";

export const metadata: Metadata = {
  title: "جزئیات داشبورد",
};

interface PageProps {
  params: Promise<{ cardId: string }>;
}

export default async function DashboardDetailPage({ params }: PageProps) {
  const { cardId } = await params;
  const card = dashboardCards.find((item) => item.id === cardId);

  if (!card) {
    notFound();
  }

  const initialStats = await getDashboardStats(defaultFilters);

  return (
    <DashboardProvider initialStats={initialStats}>
      <FilterBar />
      <DashboardDetailTemplate title={card.title} cardId={card.id} />
    </DashboardProvider>
  );
}
