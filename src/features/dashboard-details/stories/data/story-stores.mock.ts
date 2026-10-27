import type { StoryStore } from "../types/story-detail.types";

export const storyStores: StoryStore[] = [
  {
    id: "store-1", name: "برنج فروشان طارم", description: "عمده فروشی مواد غذایی", storyCount: 4, views: 25,
    status: "approved", lastPublishedAt: "2027-01-11T11:22:00Z", warnings: 0, avatarTone: "bg-amber-100 text-amber-700",
  },
  {
    id: "store-2", name: "خانه و زندگی", description: "لوازم خانه و آشپزخانه", storyCount: 7, views: 89,
    status: "approved", lastPublishedAt: "2027-01-08T05:45:00Z", warnings: 1, avatarTone: "bg-rose-100 text-rose-700",
  },
  {
    id: "store-3", name: "دیجیتال پلاس", description: "کالای دیجیتال", storyCount: 5, views: 146,
    status: "pending", lastPublishedAt: "2027-01-07T06:45:00Z", warnings: 0, avatarTone: "bg-sky-100 text-sky-700",
  },
  {
    id: "store-4", name: "زیبایی روز", description: "محصولات آرایشی و بهداشتی", storyCount: 3, views: 52,
    status: "approved", lastPublishedAt: "2027-01-06T06:10:00Z", warnings: 2, avatarTone: "bg-pink-100 text-pink-700",
  },
  {
    id: "store-5", name: "خوراک سالم", description: "مواد غذایی سالم", storyCount: 6, views: 73,
    status: "rejected", lastPublishedAt: "2027-01-05T10:35:00Z", warnings: 2, avatarTone: "bg-green-100 text-green-700",
  },
  {
    id: "store-6", name: "پوشاک آریا", description: "پوشاک و اکسسوری", storyCount: 2, views: 31,
    status: "approved", lastPublishedAt: "2027-01-04T08:00:00Z", warnings: 0, avatarTone: "bg-violet-100 text-violet-700",
  },
];
