import type { ReportReason, SupportActionStatus, SupportActionType } from "@/types/messages";

export const TYPE_LABEL: Record<SupportActionType, string> = {
  report: "گزارش مشکل",
  warning: "هشدار",
  block: "مسدودسازی",
  correction: "درخواست اصلاح",
  other: "سایر",
};

export const STATUS_LABEL: Record<SupportActionStatus, string> = {
  pending: "درحال پیگیری",
  done: "انجام شده",
};

export const REPORT_REASONS: ReadonlyArray<{ value: ReportReason; label: string }> = [
  { value: "inappropriate", label: "محتوای نامناسب" },
  { value: "ads", label: "تبلیغ غیرمجاز" },
  { value: "rules", label: "نقض قوانین فروش" },
  { value: "insult", label: "توهین و آرا" },
  { value: "other", label: "سایر" },
];
