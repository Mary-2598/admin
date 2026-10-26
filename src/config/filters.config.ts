import type { DashboardFilters, Period } from "@/types/dashboard";

export const periodOptions: ReadonlyArray<{ value: Period; label: string }> = [
  { value: "today", label: "امروز" },
  { value: "7d", label: "۷ روز اخیر" },
  { value: "30d", label: "۳۰ روز اخیر" },
  { value: "3m", label: "۳ ماه اخیر" },
];

type SelectKey = "province" | "city" | "status" | "category";

export const selectFilters: ReadonlyArray<{
  key: SelectKey;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
}> = [
  { key: "province", label: "استان", options: [
    { value: "all", label: "استان" }, { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" }, { value: "fars", label: "فارس" } ] },
  { key: "city", label: "شهرستان", options: [
    { value: "all", label: "شهرستان" }, { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" }, { value: "shiraz", label: "شیراز" } ] },

  { key: "category", label: "دسته بندی", options: [
    { value: "all", label: "دسته بندی" }, { value: "fashion", label: "پوشاک" },
    { value: "digital", label: "کالای دیجیتال" }, { value: "home", label: "خانه و آشپزخانه" } ] },
];

export const defaultFilters: DashboardFilters = {
  period: "today",
  province: "all",
  city: "all",
  status: "all",
  category: "all",
};
