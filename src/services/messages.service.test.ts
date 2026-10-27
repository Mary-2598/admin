import { describe, expect, it } from "vitest";
import { defaultFilters } from "@/config/filters.config";
import { computeMessageStats, getBooths, PAGE_SIZE } from "./messages.service";

describe("messages.service", () => {
  it("is deterministic for the same filters", async () => {
    expect(await getBooths(defaultFilters, "all", 1)).toEqual(await getBooths(defaultFilters, "all", 1));
  });
  it("paginates and clamps an out-of-range page", async () => {
    const res = await getBooths(defaultFilters, "all", 99);
    expect(res.page).toBe(res.pageCount);
    expect(res.rows.length).toBeLessThanOrEqual(PAGE_SIZE);
  });
  it("applies the status filter", async () => {
    const res = await getBooths({ ...defaultFilters, status: "blocked" }, "all", 1);
    expect(res.rows.every((r) => r.status === "blocked")).toBe(true);
  });
  it("scales stats with the period", () => {
    expect(computeMessageStats({ ...defaultFilters, period: "7d" }).total).toBe(4258 * 7);
  });
});
