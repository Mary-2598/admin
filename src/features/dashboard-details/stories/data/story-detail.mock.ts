import type { DetailStat, StoryItem } from "../types/story-detail.types";

  export const storyDetailStats: DetailStat[] = [
    {
      id: "usage",
      label: "نرخ استفاده",
      value: "۸۲٪",
      changePercent: 5.2,
      tone: "purple",
    },
    {
      id: "views",
      label: "بازدید کاربران",
      value: "۱۲٬۴۸۰",
      changePercent: 12.4,
      tone: "green",
    },
    {
      id: "violations",
      label: "مخالف با قوانین",
      value: "۳",
      changePercent: -2.4,
      tone: "yellow",
    },
    {
      id: "all-stories",
      label: "همه استوری ها",
      value: "۲۴۸",
      changePercent: 8.6,
      tone: "red",
    },
  ];

  export const storyStore = {
    name: "برنج فروشان طارم",
    description: "عمده فروشی مواد غذایی",
  };

  export const storyItems: StoryItem[] = [
    {
      id: "story-1",
      title: "برنج طارم",
      publishedAt: "1405/10/21 - 14:52",
      views: 25,
      reactions: 25,
      status: "تایید شده",
      tone: "from-amber-100 to-yellow-600",
    },
    {
      id: "story-2",
      title: "برنج درجه یک",
      publishedAt: "1405/10/20 - 12:30",
      views: 48,
      reactions: 19,
      status: "تایید شده",
      tone: "from-lime-100 to-green-600",
    },
    {
      id: "story-3",
      title: "محصولات جدید",
      publishedAt: "1405/10/19 - 16:10",
      views: 63,
      reactions: 31,
      status: "در انتظار بررسی",
      tone: "from-orange-100 to-orange-500",
    },
    {
      id: "story-4",
      title: "تخفیف ویژه",
      publishedAt: "1405/10/18 - 09:15",
      views: 91,
      reactions: 42,
      status: "تایید شده",
      tone: "from-rose-100 to-rose-500",
    },
  ];
