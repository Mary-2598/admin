import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DetailPanelProps {
  children: ReactNode;
  label: string;
  title?: string;
  className?: string;
  contentClassName?: string;
}

export function DetailPanel({
  children,
  label,
  title,
  className,
  contentClassName,
}: DetailPanelProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card",
        className,
      )}
    >
      {title ? (
        <header className="border-b border-line px-4 py-4">
          <h2 className="font-bold text-ink">{title}</h2>
        </header>
      ) : null}

      <div className={cn("min-w-0", contentClassName)}>
        {children}
      </div>
    </section>
  );
}