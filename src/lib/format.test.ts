import { describe, expect, it } from "vitest";
import { formatDelta, formatNumber } from "./format";

describe("format", () => {
  it("formats numbers with Persian digits", () => {
    expect(formatNumber(4258)).toBe("۴٬۲۵۸");
  });
  it("formats positive and negative deltas", () => {
    expect(formatDelta(5)).toBe("+ ۵٪");
    expect(formatDelta(-3)).toBe("− ۳٪");
  });
});
