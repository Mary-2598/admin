export type DashboardCardId =
  | "products" | "stories" | "orders" | "finance" | "messages"
  | "customers" | "reviews" | "account" | "contracts" | "campaigns";

export type Period = "today" | "7d" | "30d" | "3m";

export interface DashboardFilters {
  period: Period;
  province: string;
  city: string;
  status: string;
  category: string;
}

export interface CardRow {
  id: string;
  label: string;
  value?: string;
  flagged?: boolean;
}

export interface CardStats {
  id: DashboardCardId;
  total: number;
  deltaPercent: number;
  rows: CardRow[];
  extraRows?: CardRow[];
}

export type CardIconKey =
  | "products" | "stories" | "orders" | "finance" | "messages"
  | "customers" | "reviews" | "contracts" | "campaigns";

export type CardAccent = "lime" | "violet" | "indigo" | "sky" | "emerald" | "amber" | "rose" | "teal" | "pink";
export type CardVariant = "default" | "highlight";
