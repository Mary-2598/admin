import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DashboardFilterBar } from "@/components/dashboard/DashboardFilterBar";
import { dashboardCards } from "@/config/dashboard.config";
import { defaultFilters } from "@/config/filters.config";
import { DashboardProvider } from "@/context/DashboardContext";
import { DashboardDetailTemplate } from "@/features/dashboard-details/shared/components/DashboardDetailTemplate";
import { requireSession } from "@/lib/auth-guard";
import { getDashboardStats } from "@/services/dashboard.service";

interface PageProps {
  params: Promise<{ cardId: string }>;
}

const findCard = (cardId: string) => dashboardCards.find((item) => item.id === cardId);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cardId } = await params;
  return { title: findCard(cardId)?.title ?? "جزئیات داشبورد" };
}

export default async function DashboardDetailPage({ params }: PageProps) {
  await requireSession();
  const { cardId } = await params;
  const card = findCard(cardId);

  if (!card) notFound();
  // Cards with a dedicated page (e.g. /messages) never render here.
  if (card.href) redirect(card.href);

  const initialStats = await getDashboardStats(defaultFilters);

  return (
    <DashboardProvider initialStats={initialStats}>
      <DashboardFilterBar />
      <DashboardDetailTemplate title={card.title} cardId={card.id} />
    </DashboardProvider>
  );
}
