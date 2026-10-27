import { describe, expect, it } from "vitest";
import { defaultFilters } from "@/config/filters.config";
import { filtersFromParams, filtersToQuery } from "./filters-url";

describe("filters-url", () => {
  it("returns an empty query for default filters", () => {
    expect(filtersToQuery(defaultFilters)).toBe("");
  });
  it("round-trips non-default filters", () => {
    const filters = { ...defaultFilters, period: "7d" as const, province: "tehran" };
    const query = filtersToQuery(filters);
    expect(query).toBe("?period=7d&province=tehran");
    const params = Object.fromEntries(new URLSearchParams(query.slice(1)));
    expect(filtersFromParams(params)).toEqual(filters);
  });
  it("ignores invalid periods and takes the first of repeated params", () => {
    expect(filtersFromParams({ period: "forever" }).period).toBe("today");
    expect(filtersFromParams({ city: ["isfahan", "shiraz"] }).city).toBe("isfahan");
  });
});
