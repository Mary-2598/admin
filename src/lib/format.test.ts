import { describe, expect, it } from "vitest";
import { formatDateTime, formatDelta, formatNumber } from "./format";

describe("format", () => {
  it("formats numbers with Persian digits", () => {
    expect(formatNumber(4258)).toBe("۴٬۲۵۸");
  });

  it("formats positive and negative deltas", () => {
    expect(formatDelta(5)).toBe("+ ۵٪");
    expect(formatDelta(-3)).toBe("− ۳٪");
  });

  it("formats ISO time as Persian date in Tehran timezone", () => {
    // Iran has had no DST since 2023 (always UTC+3:30); a winter date keeps the test independent of tzdata.
    // 2026-01-15T09:25:00Z + 3:30 = 12:55 Tehran time
    expect(formatDateTime("2026-01-15T09:25:00Z")).toBe("۱۴۰۴/۱۰/۲۵ - ۱۲:۵۵");
  });

  it("shows midnight as 00:xx, never 24:xx", () => {
    expect(formatDateTime("2026-04-01T20:35:00Z")).toBe("۱۴۰۵/۰۱/۱۳ - ۰۰:۰۵");
  });
});
