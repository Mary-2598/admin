import { ArrowDownRight, ArrowUpRight, CheckCheck, Eye, Images, ShieldAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import type { DetailStat, StatIcon, StatTone } from "../types/story-detail.types";

const ICONS: Record<StatIcon, LucideIcon> = {
  stories: Images,
  views: Eye,
  warnings: ShieldAlert,
  reviewed: CheckCheck,
};

const TONES: Record<StatTone, string> = {
  purple: "bg-purple-50 text-purple-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-amber-50 text-amber-600",
  red: "bg-rose-50 text-rose-600",
};

export function StoryStatCards({ stats }: { stats: readonly DetailStat[] }) {
  return (
    <section aria-label="آمار جزئیات" className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        const positive = stat.changePercent >= 0;
        const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;

        return (
          <article key={stat.id} className="min-w-0 rounded-xl border border-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted">{stat.label}</p>
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", TONES[stat.tone])}>
                <Icon className="size-5" aria-hidden />
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-ink">{formatNumber(stat.value)}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted">نسبت به قبل</span>
              <span className={cn("inline-flex items-center gap-1 font-semibold", positive ? "text-green-600" : "text-red-600")}>
                <ChangeIcon className="size-4" aria-hidden />
                <bdi>{formatNumber(Math.abs(stat.changePercent))}٪</bdi>
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
