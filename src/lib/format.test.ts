import { describe, expect, it } from "vitest";
import { formatDelta, formatNumber, formatDateTime } from "./format";

describe("format", () => {
  it("formats numbers with Persian digits", () => {
    expect(formatNumber(4258)).toBe("۴٬۲۵۸");
  });
  it("formats positive and negative deltas", () => {
    expect(formatDelta(5)).toBe("+ ۵٪");
    expect(formatDelta(-3)).toBe("− ۳٪");
  });
  it("formats ISO time as Persian date in Tehran timezone", () => {
    expect(formatDateTime("2026-04-01T09:25:00Z")).toBe("۱۴۰۵/۰۱/۱۲ - ۱۲:۵۵");
  });

});




