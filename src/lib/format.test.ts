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
    // ایران از سال ۲۰۲۳ ساعت تابستانی (DST) ندارد و همیشه UTC+3:30 است.
    // برای جلوگیری از وابستگی تست به tzdata سیستم، از تاریخ زمستانی استفاده می‌کنیم.
    // 2026-01-15T09:25:00Z + 3:30 = 12:55 به وقت تهران
    expect(formatDateTime("2026-01-15T09:25:00Z")).toBe("۱۴۰۴/۱۰/۲۵ - ۱۲:۵۵");
  });
});
