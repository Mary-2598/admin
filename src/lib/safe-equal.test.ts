import { describe, expect, it } from "vitest";
import { safeEqual } from "./safe-equal";

describe("safeEqual", () => {
  it("matches identical strings", () => {
    expect(safeEqual("admin12345", "admin12345")).toBe(true);
  });
  it("rejects different strings, including different lengths and empty values", () => {
    expect(safeEqual("admin12345", "admin1234")).toBe(false);
    expect(safeEqual("a", "b")).toBe(false);
    expect(safeEqual("", "x")).toBe(false);
  });
});
