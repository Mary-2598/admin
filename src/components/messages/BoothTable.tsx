import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/cn";
import { formatDateTime, formatNumber } from "@/lib/format";
import { BoothThumb } from "./BoothThumb";
import type { BoothPage } from "@/types/messages";

interface BoothTableProps {
  data: BoothPage;
  selectedId: string | null;
  busy: boolean;
  onSelect: (id: string) => void;
  onPage: (page: number) => void;
}

const HEADERS = ["نام غرفه", "تعداد پیام", "خوانده شده", "خوانده نشده", "آخرین فعالیت", "اخطارها"];

export function BoothTable({ data, selectedId, busy, onSelect, onPage }: BoothTableProps) {
  if (data.rows.length === 0) {
    return <p className="p-10 text-center text-sm text-muted">موردی برای نمایش وجود ندارد.</p>;
  }
  return (
    <div aria-busy={busy} className={cn("p-4", busy && "opacity-60")}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-page text-muted">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-start font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => {
              const selected = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                  className={cn("cursor-pointer border-b border-line hover:bg-page", selected && "bg-gray-100")}
                >
                  <th scope="row" className="px-3 py-3 text-start font-normal">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(row.id);
                      }}
                      className="flex items-center gap-3 rounded text-start outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <BoothThumb src={row.imageUrl} name={row.name} />
                      <span>{row.name}</span>
                    </button>
                  </th>
                  <td className="px-3 py-3">{formatNumber(row.messageCount)}</td>
                  <td className="px-3 py-3">{formatNumber(row.readCount)}</td>
                  <td className="px-3 py-3">{formatNumber(row.unreadCount)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatDateTime(row.lastActivityAt)}</td>
                  <td className={cn("px-3 py-3", row.warningCount > 0 && "font-bold text-red-600")}>
                    {row.warningCount > 0 ? formatNumber(row.warningCount) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination page={data.page} pageCount={data.pageCount} onChange={onPage} />
      </div>
    </div>
  );
}
