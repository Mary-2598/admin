export interface DetailStatCardConfig {
    id: string;
    label: string;
    value: string | number;
  }
  
  export interface DetailStatsPageConfig {
    cards: DetailStatCardConfig[];
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
  }
  
  export const DEFAULT_DETAIL_STATS: DetailStatCardConfig[] = [
    { id: "total", label: "مجموع", value: "—" },
    { id: "pending", label: "در انتظار", value: "—" },
    { id: "approved", label: "تأیید شده", value: "—" },
    { id: "review", label: "نیازمند بررسی", value: "—" },
  ];
  
  /**
   * تنظیمات اختصاصی صفحات را بر اساس cardId اینجا قرار بده.
   * صفحه‌هایی که تنظیم اختصاصی ندارند، چهار کارت پیش‌فرض را می‌گیرند.
   */
  export const DETAIL_STATS_BY_CARD_ID: Record<
    string,
    DetailStatsPageConfig
  > = {
    // مثال:
    // customers: {
    //   columns: 3,
    //   cards: [
    //     { id: "total", label: "کل مشتریان", value: "—" },
    //     { id: "active", label: "مشتریان فعال", value: "—" },
    //     { id: "blocked", label: "مشتریان مسدود", value: "—" },
    //   ],
    // },
  };