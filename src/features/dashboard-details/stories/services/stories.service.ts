import type { DetailStat, StoryItem, StoryStore } from "../types/story-detail.types";
import { storyDetailStats, storyItems } from "../data/story-detail.mock";
import { storyStores } from "../data/story-stores.mock";

/**
 * API boundary for the stories page. Components never import the mock files directly;
 * when the backend is ready only these bodies change (use `apiFetch` from "@/lib/http").
 */
export async function getStoryStats(): Promise<DetailStat[]> {
  return storyDetailStats;
}

export async function getStoryStores(): Promise<StoryStore[]> {
  return storyStores;
}

export async function getStories(): Promise<StoryItem[]> {
  return storyItems;
}
