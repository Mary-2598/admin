import type { DetailStat, StoryItem } from "../types/story-detail.types";

export const storyDetailStats: DetailStat[] = [
  { id: "total-stories", label: "تعداد استوری‌ها", value: 12, changePercent: 8, tone: "purple", icon: "stories" },
  { id: "total-views", label: "مجموع بازدیدها", value: 227, changePercent: 12, tone: "green", icon: "views" },
  { id: "total-warnings", label: "اخطارها", value: 3, changePercent: -5, tone: "red", icon: "warnings" },
  { id: "reviewed-stories", label: "استوری‌های بررسی‌شده", value: 9, changePercent: 4, tone: "yellow", icon: "reviewed" },
];

export const storyItems: StoryItem[] = [
  {
    id: "story-1", storeId: "store-1", title: "برنج طارم", publishedAt: "2027-01-11T11:22:00Z",
    views: 25, reactions: 25, status: "approved", tone: "from-amber-100 to-yellow-600",
  },
  {
    id: "story-2", storeId: "store-1", title: "برنج درجه یک", publishedAt: "2027-01-10T09:00:00Z",
    views: 48, reactions: 19, status: "approved", tone: "from-lime-100 to-green-600",
  },
  {
    id: "story-3", storeId: "store-1", title: "محصولات جدید", publishedAt: "2027-01-09T12:40:00Z",
    views: 63, reactions: 31, status: "pending", tone: "from-orange-100 to-orange-500",
  },
  {
    id: "story-4", storeId: "store-2", title: "تخفیف ویژه", publishedAt: "2027-01-08T05:45:00Z",
    views: 91, reactions: 42, status: "approved", tone: "from-rose-100 to-rose-500",
  },
];
