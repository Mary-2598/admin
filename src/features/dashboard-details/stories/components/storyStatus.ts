import type { StoryStatus } from "../types/story-detail.types";

export const STORY_STATUS_LABEL: Record<StoryStatus, string> = {
  approved: "تأیید شده",
  pending: "در انتظار بررسی",
  rejected: "رد شده",
};

export const STORY_STATUS_BADGE: Record<StoryStatus, string> = {
  approved: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-700",
};
