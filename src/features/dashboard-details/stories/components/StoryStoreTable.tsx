"use client";

import { useState } from "react";
import { ChevronLeft, Store } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";
import { formatDateTime, formatNumber } from "@/lib/format";
import type { StoryStore } from "../types/story-detail.types";
import { STORY_STATUS_BADGE, STORY_STATUS_LABEL } from "./storyStatus";

const TABS = [
  { id: "stories", label: "استوری ها" },
  { id: "highlights", label: "هایلایت ها" },
  { id: "warnings", label: "اخطارها" },
] as const;

const HEADERS = ["نام غرفه", "تعداد استوری", "بازدید", "وضعیت استوری", "آخرین انتشار", "اخطارها"];
const PAGE_SIZE = 4;

interface Props {
  stores: readonly StoryStore[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
}

export function StoryStoreTable({ stores, selectedStoreId, onSelectStore }: Props) {
  const [tab, setTab] = useState<string>("stories");
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(stores.length / PAGE_SIZE));
  const current = stores.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section aria-label="غرفه‌ها" className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card">
      <Tabs label="بخش‌های مدیریت استوری" items={TABS} value={tab} onChange={setTab}>
        {tab === "stories" ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-start text-xs">
                <thead className="bg-page text-muted">
                  <tr>
                    {HEADERS.map((h) => (
                      <th key={h} scope="col" className="px-3 py-4 text-start font-medium">{h}</th>
                    ))}
                    <th scope="col" className="w-10 px-2 py-4"><span className="sr-only">مشاهده جزئیات</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {current.map((store) => {
                    const selected = store.id === selectedStoreId;
                    return (
                      <tr
                        key={store.id}
                        onClick={() => onSelectStore(store.id)}
                        className={cn("cursor-pointer transition-colors hover:bg-teal-50/50", selected ? "bg-teal-50/70" : "bg-white")}
                      >
                        <th scope="row" className="px-3 py-4 text-start font-normal">
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={(e) => { e.stopPropagation(); onSelectStore(store.id); }}
                            className="flex min-w-44 items-center gap-3 rounded text-start outline-none focus-visible:ring-2 focus-visible:ring-brand"
                          >
                            <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", store.avatarTone)}>
                              <Store className="size-5" aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-semibold text-ink">{store.name}</span>
                              <span className="mt-1 block text-[10px] text-muted">{store.description}</span>
                            </span>
                          </button>
                        </th>
                        <td className="px-3 py-4 text-ink">{formatNumber(store.storyCount)}</td>
                        <td className="px-3 py-4 text-ink">{formatNumber(store.views)}</td>
                        <td className="px-3 py-4">
                          <span className={cn("inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium", STORY_STATUS_BADGE[store.status])}>
                            {STORY_STATUS_LABEL[store.status]}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-ink">{formatDateTime(store.lastPublishedAt)}</td>
                        <td className={cn("px-3 py-4", store.warnings > 0 && "font-medium text-red-600")}>
                          {store.warnings > 0 ? formatNumber(store.warnings) : "-"}
                        </td>
                        <td className="px-2 py-4">
                          <ChevronLeft aria-hidden className={cn("size-4", selected ? "text-brand" : "text-muted")} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-line px-4 py-4">
              <p className="text-[11px] text-muted">صفحه {formatNumber(page)} از {formatNumber(pageCount)}</p>
              <Pagination page={page} pageCount={pageCount} onChange={setPage} />
            </footer>
          </>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <Store className="mb-3 size-9 text-muted" aria-hidden />
            <p className="font-semibold text-ink">{TABS.find((t) => t.id === tab)?.label}</p>
            <p className="mt-2 max-w-xs text-xs leading-6 text-muted">محتوای این بخش در مرحله بعد تکمیل می‌شود.</p>
          </div>
        )}
      </Tabs>
    </section>
  );
}
