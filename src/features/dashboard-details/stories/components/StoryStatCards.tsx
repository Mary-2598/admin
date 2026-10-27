
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Eye,
    Images,
    ShieldAlert,
  } from "lucide-react";
  import type { DetailStat } from "../types/story-detail.types";
  const styles = {
    purple: {
      icon: Activity,
      circle: "bg-purple-50 text-purple-600",
    },
    green: {
      icon: Eye,
      circle: "bg-green-50 text-green-600",
    },
    yellow: {
      icon: ShieldAlert,
      circle: "bg-amber-50 text-amber-600",
    },
    red: {
      icon: Images,
      circle: "bg-rose-50 text-rose-600",
    },
  };

  interface Props {
    stats: DetailStat[];
  }

  export function StoryStatCards({ stats }: Props) {
    return (
      <section
        aria-label="آمار جزئیات"
        dir="rtl"
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => {
          const style = styles[stat.tone];
          const Icon = style.icon;
          const isPositive = stat.changePercent >= 0;
          const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

          return (
            <article
              key={stat.id}
              className="min-w-0 rounded-xl border border-line bg-white p-4 shadow-card"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted">{stat.label}</p>

                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full ${style.circle}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-ink">
                {stat.value}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted">نسبت به قبل</span>

                <span
                  className={`inline-flex items-center gap-1 font-semibold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                  dir="ltr"
                >
                  <ChangeIcon className="size-4" aria-hidden="true" />
                  {Math.abs(stat.changePercent).toLocaleString("fa-IR")}٪
                </span>
              </div>
            </article>
          );
        })}
      </section>
    );
  }
