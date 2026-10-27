import { describe, expect, it } from "vitest";
import { getBooths } from "./messages.service";
import { defaultFilters } from "@/config/filters.config";

describe("getBooths", () => {
  it("is deterministic for the same filters", async () => {
    expect(await getBooths(defaultFilters, "all", 1)).toEqual(await getBooths(defaultFilters, "all", 1));
  });
  it("paginates and clamps the page", async () => {
    const res = await getBooths(defaultFilters, "all", 99);
    expect(res.page).toBe(res.pageCount);
  });
});