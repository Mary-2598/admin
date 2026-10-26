import { dashboardCards } from "@/config/dashboard.config";
import { stableId } from "@/lib/id";
import type { CardStats, DashboardCardId, DashboardFilters, Period } from "@/types/dashboard";

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

const PRODUCT_KPI_LABELS = [
  "در خرید اقتصادی",
  "پرفروش‌ها",
  "موجودی"
];

export async function getDashboardStats(filters: DashboardFilters): Promise<CardStats[]> {
  if (typeof window !== "undefined") {
    await new Promise((resolve) => setTimeout(resolve, 350));
  }

  return dashboardCards.map((card): CardStats => {
    const base = BASE[card.id];
    const isProducts = card.id === "products";
    
    return {
      id: card.id,
      total: base.total * MULTIPLIER[filters.period],
      deltaPercent: base.delta,
      rows: Array.from({ length: isProducts ? PRODUCT_KPI_LABELS.length : card.rowCount }, (_, i) => {
        return {
          id: stableId(card.id, i),
          label: isProducts ? (PRODUCT_KPI_LABELS[i] ?? "") : "",
          value: isProducts ? String(Math.floor(Math.random() * 500)) : undefined, 
          flagged: false,
        };
      }),
     
      extraRows: undefined, 
    };
  });
}