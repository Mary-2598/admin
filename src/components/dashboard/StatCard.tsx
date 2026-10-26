import { useId } from "react";
import { cn } from "@/lib/cn";
import { formatDelta, formatNumber } from "@/lib/format";
import { compareLabel, type DashboardCardConfig } from "@/config/dashboard.config";
import { dashboardTheme, sizesToCssVars } from "@/config/theme";
import type { CardStats } from "@/types/dashboard";
import { cardIcons } from "./cardIcons";
import { cardRowRenderers, DefaultRows } from "./cardRows";

interface StatCardProps {
  config: DashboardCardConfig;
  stats: CardStats | undefined;
  busy?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export function StatCard({ config, stats, busy = false, selected = false, onSelect }: StatCardProps) {
  const titleId = useId();
  const sizes = { ...dashboardTheme.cardSizes, ...config.sizes };
  const Icon = cardIcons[config.icon];
  const CustomRows = cardRowRenderers[config.id];
  const highlighted = config.variant === "highlight" || selected;

  return (
    <article
      aria-labelledby={titleId}
      aria-busy={busy}
      aria-pressed={onSelect ? selected : undefined}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      style={sizesToCssVars(sizes)}
      className={cn(
        "flex min-h-[var(--card-h)] w-full flex-col overflow-hidden rounded-[var(--card-r)] bg-white shadow-card",
        "transition-transform duration-200 ease-out",
        "hover:relative hover:z-10 hover:scale-[1.03] hover:shadow-lg",
        "motion-reduce:transform-none motion-reduce:transition-none",
        onSelect && "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        highlighted && "ring-2 ring-sky-300",
        busy && "opacity-60",
      )}
    >
      <header className={cn("flex items-center gap-2 px-[var(--card-p)] py-3", highlighted && "bg-sky-200")}>
        <span
          aria-hidden
          className="grid size-[var(--icon-box)] shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500"
        >
          <Icon className="size-4" />
        </span>
        <h3 id={titleId} className="truncate text-[length:var(--card-title)] font-medium">
          {config.title}
        </h3>
      </header>

      <div className="flex flex-1 flex-col gap-4 px-[var(--card-p)] pb-5">
        <div className="text-center">
          <p className="text-[length:var(--card-value)] font-extrabold leading-tight">
            {stats ? formatNumber(stats.total) : "—"}
          </p>
          {stats ? (
            <p className="text-[length:var(--card-delta)] text-muted"><bdi>{formatDelta(stats.deltaPercent)}</bdi></p>
          ) : null}
          <p className="mt-2 text-[length:var(--card-caption)]">{compareLabel}</p>
        </div>
        
        {stats ? (
          CustomRows ? (
            <CustomRows rows={stats.rows} extraRows={stats.extraRows} />
          ) : (
            <DefaultRows rows={stats.rows} extraRows={stats.extraRows} />
          )
        ) : null}

      </div>
    </article>
  );
}