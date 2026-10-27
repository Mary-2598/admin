import { dashboardCards } from "@/config/dashboard.config";
import { stableId } from "@/lib/id";
import { computeMessageStats } from "@/services/messages.service";
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

const STORY_KPI_LABELS = [
  "همه استوری‌ها",
  "بازدید کاربران",
  "اخطارها",
  "مخالف با قوانین"
];

const FINANCE_KPI_LABELS = [
  "کل تراکنش‌ها",
  "در انتظار تسویه",
  "تسویه شده",
  "تراکنش ناموفق"
];

// لیبل‌های پیام‌ها (همون ۴ موردی که تایید کردیم)
const MESSAGES_KPI_LABELS = [
  "کل پیام‌ها",
  "پیام‌های جدید",
  "خوانده نشده",
  "حاوی محتوای غیرمرتبط"
];

export async function getDashboardStats(filters: DashboardFilters): Promise<CardStats[]> {
  if (typeof window !== "undefined") {
    await new Promise((resolve) => setTimeout(resolve, 350));
  }

  const messageStats = computeMessageStats(filters);
  const messageValues = [messageStats.total, messageStats.fresh, messageStats.unread, messageStats.irrelevant];

  return dashboardCards.map((card): CardStats => {
    const base = BASE[card.id];
    const isProducts = card.id === "products";
    const isStories = card.id === "stories";
    const isFinance = card.id === "finance";
    const isMessages = card.id === "messages";
    
    const rowCount = isProducts ? PRODUCT_KPI_LABELS.length 
                   : isStories ? STORY_KPI_LABELS.length 
                   : isFinance ? FINANCE_KPI_LABELS.length
                   : isMessages ? MESSAGES_KPI_LABELS.length
                   : card.rowCount;

    return {
      id: card.id,
      total: isMessages ? messageStats.total : base.total * MULTIPLIER[filters.period],
      deltaPercent: base.delta,
      rows: Array.from({ length: rowCount }, (_, i) => {
        let rowValue: string | undefined = undefined;
        
        if (isProducts) {
          rowValue = String(Math.floor(Math.random() * 500));
        } else if (isStories) {
          rowValue = (i >= 2) ? String(Math.floor(Math.random() * 50)) : String(Math.floor(Math.random() * 5000));
        } else if (isFinance) {
          if (i === 3) rowValue = String(Math.floor(Math.random() * 100));
          else rowValue = String(Math.floor(Math.random() * 5000));
        } else if (isMessages) {
          // Same numbers as the messages page (single source: messages.service).
          rowValue = String(messageValues[i] ?? 0);
        }

        return {
          id: stableId(card.id, i),
          label: isProducts ? (PRODUCT_KPI_LABELS[i] ?? "") 
               : isStories ? (STORY_KPI_LABELS[i] ?? "") 
               : isFinance ? (FINANCE_KPI_LABELS[i] ?? "")
               : isMessages ? (MESSAGES_KPI_LABELS[i] ?? "")
               : "",
          value: rowValue, 
          // موارد نیازمند بررسی (اخطارها/غیرمرتبط/خوانده نشده) قرمز میشن
          flagged: (isStories && i >= 2) 
                || (isFinance && (i === 1 || i === 3)) 
                || (isMessages && i >= 2), 
        };
      }),
      extraRows: undefined, 
    };
  });
}