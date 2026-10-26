import type { CardSizes } from "@/config/theme";
import type { CardAccent, CardIconKey, CardVariant, DashboardCardId } from "@/types/dashboard";

export interface DashboardCardConfig {
  id: DashboardCardId;
  title: string;
  icon: CardIconKey;
  accent: CardAccent;
  variant: CardVariant;
  rowCount: number;
  /** Per-card size overrides, e.g. { width: 160, valueSize: 32 } */
  sizes?: Partial<CardSizes>;
}

export const compareLabel = "نسبت به هفته قبل";

/**
 * Order = visual order in RTL: the first item is the right-most card.
 * Cards wrap onto the next row starting from the RIGHT as well.
 */
export const dashboardCards: readonly DashboardCardConfig[] = [
  { id: "products", title: "محصولات", icon: "products", accent: "lime", variant: "default", rowCount: 5 },
  { id: "stories", title: "استوری و هایلایت", icon: "stories", accent: "violet", variant: "default", rowCount: 5 },
  { id: "orders", title: "سفارشات", icon: "orders", accent: "indigo", variant: "default", rowCount: 5 },
  { id: "finance", title: "مالی", icon: "finance", accent: "sky", variant: "default", rowCount: 5 },
  { id: "messages", title: "پیام ها", icon: "messages", accent: "emerald", variant: "default", rowCount: 5 },
  { id: "customers", title: "مشتریان", icon: "customers", accent: "amber", variant: "default", rowCount: 5 },
  { id: "reviews", title: "دیدگاه", icon: "reviews", accent: "rose", variant: "default", rowCount: 5 },
  { id: "account", title: "حساب من", icon: "products", accent: "lime", variant: "default", rowCount: 5 },
  { id: "contracts", title: "قرارداد ها", icon: "contracts", accent: "teal", variant: "default", rowCount: 5 },
  { id: "campaigns", title: "کمپین‌ها", icon: "campaigns", accent: "pink", variant: "default", rowCount: 5 },
];
