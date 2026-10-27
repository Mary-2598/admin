import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const btn = "grid size-6 place-items-center rounded border border-line text-xs outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-40";

  return (
    <nav aria-label="صفحه‌بندی" className="flex items-center gap-1">
      <button type="button" aria-label="صفحه‌ی قبل" disabled={page === 1} onClick={() => onChange(page - 1)} className={btn}>
        <ChevronRight aria-hidden className="size-3" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
          className={cn(btn, p === page && "border-brand bg-brand text-white")}
        >
          {formatNumber(p)}
        </button>
      ))}
      <button type="button" aria-label="صفحه‌ی بعد" disabled={page === pageCount} onClick={() => onChange(page + 1)} className={btn}>
        <ChevronLeft aria-hidden className="size-3" />
      </button>
    </nav>
  );
}