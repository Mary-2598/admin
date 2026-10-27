import type { DetailStat, StoryItem } from "../types/story-detail.types";

export const storyDetailStats: DetailStat[] = [
  {
    id: "total-stories",
    label: "تعداد استوری‌ها",
    value: "۱۲",
    changePercent: 8,
    tone: "purple",
  },
  {
    id: "total-views",
    label: "مجموع بازدیدها",
    value: "۲۲۷",
    changePercent: 12,
    tone: "green",
  },
  {
    id: "total-warnings",
    label: "اخطارها",
    value: "۳",
    changePercent: -5,
    tone: "red",
  },
  {
    id: "all-stories",
    label: "استوری‌های بررسی‌شده",
    value: "۹",
    changePercent: 4,
    tone: "yellow",
  },
];

export const storyItems: StoryItem[] = [
  {
    id: "story-1",
    storeId: "store-1",
    title: "برنج طارم",
    publishedAt: "1405/10/21 - 14:52",
    views: 25,
    reactions: 25,
    status: "تأیید شده",
    tone: "from-amber-100 to-yellow-600",
  },
  {
    id: "story-2",
    storeId: "store-1",
    title: "برنج درجه یک",
    publishedAt: "1405/10/20 - 12:30",
    views: 48,
    reactions: 19,
    status: "تأیید شده",
    tone: "from-lime-100 to-green-600",
  },
  {
    id: "story-3",
    storeId: "store-1",
    title: "محصولات جدید",
    publishedAt: "1405/10/19 - 16:10",
    views: 63,
    reactions: 31,
    status: "در انتظار بررسی",
    tone: "from-orange-100 to-orange-500",
  },
  {
    id: "story-4",
    storeId: "store-2",
    title: "تخفیف ویژه",
    publishedAt: "1405/10/18 - 09:15",
    views: 91,
    reactions: 42,
    status: "تأیید شده",
    tone: "from-rose-100 to-rose-500",
  },
];