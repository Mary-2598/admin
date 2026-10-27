"use client";

import { useState } from "react";
import { Ban, Store, Trash2, Wheat } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";
import { formatDateTime, formatNumber } from "@/lib/format";
import type { StoryItem, StoryStore } from "../types/story-detail.types";
import { STORY_STATUS_LABEL } from "./storyStatus";

const TABS = [
  { id: "overview", label: "تحلیل کلی" },
  { id: "stories", label: "استوری ها" },
  { id: "booth", label: "اطلاعات غرفه" },
  { id: "warnings", label: "اخطارها" },
] as const;

interface Props {
  store: StoryStore;
  stories: readonly StoryItem[];
}

/** Render with `key={store.id}` so tab, selection and notice reset for every booth. */
export function StoryManagementPanel({ store, stories }: Props) {
  const [tab, setTab] = useState<string>("stories");
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const selected = stories.find((s) => s.id === pickedId) ?? stories[0];

  return (
    <section aria-label="مدیریت استوری غرفه" className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card">
      <header className="flex items-center gap-3 border-b border-line p-4">
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-full", store.avatarTone)}>
          <Store className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="truncate font-bold text-ink">{store.name}</h2>
          <p className="mt-1 text-xs text-muted">{store.description}</p>
        </div>
      </header>

      <Tabs label="بخش‌های اطلاعات غرفه" items={TABS} value={tab} onChange={(id) => { setTab(id); setNotice(""); }}>
        <div className="p-4">
          {tab !== "stories" ? (
            <div className="flex min-h-48 items-center justify-center text-center text-sm leading-7 text-muted">
              محتوای بخش «{TABS.find((t) => t.id === tab)?.label}» در مرحله بعد اضافه می‌شود.
            </div>
          ) : !selected ? (
            <p className="rounded-lg bg-page p-4 text-xs leading-6 text-muted">هنوز استوری نمونه‌ای برای این غرفه ثبت نشده است.</p>
          ) : (
            <>
              <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                {stories.map((story, index) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => { setPickedId(story.id); setNotice(""); }}
                    aria-pressed={selected.id === story.id}
                    aria-label={`نمایش استوری ${story.title}`}
                    className={cn(
                      "shrink-0 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      selected.id === story.id ? "ring-2 ring-brand" : "ring-1 ring-line",
                    )}
                  >
                    <span className={cn("grid h-20 w-14 place-items-center rounded-md bg-linear-to-br", story.tone)}>
                      <Wheat className="size-7 text-white drop-shadow" aria-hidden />
                    </span>
                    <span className="mt-1 block max-w-14 truncate text-center text-[10px] text-muted">
                      استوری {formatNumber(index + 1)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  role="img"
                  aria-label={`تصویر نمونه ${selected.title}`}
                  className={cn("flex min-h-64 items-center justify-center rounded-lg bg-linear-to-br", selected.tone)}
                >
                  <div className="text-center text-white">
                    <Wheat className="mx-auto size-16" aria-hidden />
                    <p className="mt-3 font-bold">{selected.title}</p>
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="mb-4 font-bold text-ink">جزئیات</h3>
                  <dl className="space-y-3 text-xs">
                    <div><dt className="text-muted">نام محصول</dt><dd className="mt-1 font-medium text-ink">{selected.title}</dd></div>
                    <div><dt className="text-muted">منتشر شده:</dt><dd className="mt-1 font-medium text-ink">{formatDateTime(selected.publishedAt)}</dd></div>
                    <div><dt className="text-muted">بازدید:</dt><dd className="mt-1 font-medium text-ink">{formatNumber(selected.views)}</dd></div>
                    <div><dt className="text-muted">واکنش:</dt><dd className="mt-1 font-medium text-ink">{formatNumber(selected.reactions)}</dd></div>
                    <div><dt className="text-muted">وضعیت:</dt><dd className="mt-1 font-medium text-ink">{STORY_STATUS_LABEL[selected.status]}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <h3 className="mb-3 text-sm font-semibold text-ink">اقدامات لازم</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setNotice("حذف استوری پس از اتصال API فعال می‌شود.")}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white outline-none transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                  >
                    <Trash2 className="size-4" aria-hidden />حذف استوری
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotice("مسدودسازی غرفه پس از اتصال API فعال می‌شود.")}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-ink outline-none transition-colors hover:bg-page focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <Ban className="size-4" aria-hidden />مسدود کردن غرفه
                  </button>
                </div>
                {notice ? (
                  <p role="status" className="mt-3 rounded-md bg-amber-50 p-3 text-xs leading-6 text-amber-800">{notice}</p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </Tabs>
    </section>
  );
}
