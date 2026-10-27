import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import type { MessageStats } from "@/types/messages";

export function MessageStatsCards({ stats }: { stats: MessageStats }) {
  const items = [
    { label: "کل پیام‌ها", value: stats.total, flagged: false },
    { label: "پیام‌های جدید", value: stats.fresh, flagged: false },
    { label: "خوانده نشده", value: stats.unread, flagged: true },
    { label: "حاوی محتوای غیرمرتبط", value: stats.irrelevant, flagged: true },
  ];
  return (
    <section aria-label="آمار پیام‌ها" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-white p-5 shadow-card">
          <p className={cn("text-2xl font-extrabold", item.flagged && "text-red-600")}>{formatNumber(item.value)}</p>
          <p className="mt-1 text-sm text-muted">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
