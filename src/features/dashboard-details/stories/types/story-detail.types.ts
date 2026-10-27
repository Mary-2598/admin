export type StoryStatus = "approved" | "pending" | "rejected";

export type StatTone = "purple" | "green" | "yellow" | "red";
export type StatIcon = "stories" | "views" | "warnings" | "reviewed";

export interface DetailStat {
  id: string;
  label: string;
  value: number;
  changePercent: number;
  tone: StatTone;
  icon: StatIcon;
}

export interface StoryItem {
  id: string;
  storeId: string;
  title: string;
  publishedAt: string; // ISO UTC
  views: number;
  reactions: number;
  status: StoryStatus;
  /** Tailwind gradient classes used by the placeholder thumbnail. */
  tone: string;
}

export interface StoryStore {
  id: string;
  name: string;
  description: string;
  storyCount: number;
  views: number;
  status: StoryStatus;
  lastPublishedAt: string; // ISO UTC
  warnings: number;
  /** Tailwind classes for the avatar circle. */
  avatarTone: string;
}
