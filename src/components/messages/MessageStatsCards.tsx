
import {
  AlertTriangle,
  Mail,
  MailOpen,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { DetailStatsGrid } from "@/features/dashboard-details/shared/components/DetailStatsGrid";
import type { MessageStats } from "@/types/messages";

const ICONS: LucideIcon[] = [
  MessageSquare,
  Mail,
  MailOpen,
  AlertTriangle,
];

const TONES = [
  "bg-cyan-50 text-cyan-700",
  "bg-blue-50 text-blue-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-600",
];

export function MessageStatsCards({
  stats,
}: {
  stats: MessageStats;
}) {
  const items = [
    { label: "کل پیام‌ها", value: stats.total, flagged: false },
    { label: "پیام‌های جدید", value: stats.fresh, flagged: false },
    { label: "خوانده نشده", value: stats.unread, flagged: true },
    {
      label: "حاوی محتوای غیرمرتبط",
      value: stats.irrelevant,
      flagged: true,
    },
  ];

  return (
    <DetailStatsGrid label="آمار پیام‌ها">
      {items.map((item, index) => {
        const Icon = ICONS[index] ?? MessageSquare;

        return (
          <article
            key={item.label}
            className="flex min-h-40 min-w-0 flex-col rounded-xl border border-line bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 text-sm leading-6 text-muted">
                {item.label}
              </p>

              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full",
                  TONES[index] ?? TONES[0],
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
            </div>

            <p
              className={cn(
                "mt-auto pt-5 text-2xl font-bold tabular-nums",
                item.flagged ? "text-red-600" : "text-ink",
              )}
            >
              {formatNumber(item.value)}
            </p>
          </article>
        );
      })}
    </DetailStatsGrid>
  );
}
