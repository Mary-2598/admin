import { describe, expect, it } from "vitest";
import { getStories, getStoryStats, getStoryStores } from "./stories.service";

describe("stories.service", () => {
  it("every story belongs to an existing store", async () => {
    const [stores, stories] = await Promise.all([getStoryStores(), getStories()]);
    const ids = new Set(stores.map((s) => s.id));
    expect(stories.every((s) => ids.has(s.storeId))).toBe(true);
  });
  it("all timestamps are valid ISO dates", async () => {
    const [stores, stories] = await Promise.all([getStoryStores(), getStories()]);
    const all = [...stores.map((s) => s.lastPublishedAt), ...stories.map((s) => s.publishedAt)];
    expect(all.every((iso) => !Number.isNaN(Date.parse(iso)))).toBe(true);
  });
  it("stat ids are unique", async () => {
    const stats = await getStoryStats();
    expect(new Set(stats.map((s) => s.id)).size).toBe(stats.length);
  });
});
