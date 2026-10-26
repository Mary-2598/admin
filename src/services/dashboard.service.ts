import { dashboardCards } from "@/config/dashboard.config";
import { stableId } from "@/lib/id";
import type { CardStats, DashboardCardId, DashboardFilters, Period } from "@/types/dashboard";

// Mock data. To connect the real backend, replace the body of
// getDashboardStats with: apiFetch<CardStats[]>(`/dashboard/stats?${query}`)
const BASE: Record<DashboardCardId, { total: number; delta: number }> = {
  products: { total: 4258, delta: 5 },
  stories: { total: 4258, delta: 5 },
  orders: { total: 4258, delta: 5 },
  finance: { total: 4258, delta: 5 },
  messages: { total: 4258, delta: 5 },
  customers: { total: 8256, delta: 8 },
  reviews: { total: 1254, delta: 12 },
  account: { total: 4258, delta: 5 },
  contracts: { total: 4258, delta: 5 },
  campaigns: { total: 4258, delta: 5 },
};

const MULTIPLIER: Record<Period, number> = { today: 1, "7d": 7, "30d": 30, "3m": 90 };

export async function getDashboardStats(filters: DashboardFilters): Promise<CardStats[]> {
  if (typeof window !== "undefined") {
    await new Promise((resolve) => setTimeout(resolve, 350)); // demo latency for skeleton
  }
  return dashboardCards.map((card) => {
    const base = BASE[card.id];
    return {
      id: card.id,
      total: base.total * MULTIPLIER[filters.period],
      deltaPercent: base.delta,
      rows: Array.from({ length: card.rowCount }, (_, i) => ({
        id: stableId(card.id, i),
        label: "",
        flagged: card.id === "reviews" && i === 0,
      })),
    };
  });
}
