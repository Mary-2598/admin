
"use client";

import { useState } from "react";
import { Ban, Store, Trash2, Wheat } from "lucide-react";
import {
  storyItems,
  storyStore,
} from "../data/story-detail.mock";

const tabs = [
  "تحلیل کلی",
  "استوری ها",
  "اطلاعات غرفه",
  "اخطارها",
] as const;

type Tab = (typeof tabs)[number];

export function StoryManagementPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("استوری ها");
  const [selectedId, setSelectedId] = useState<string | null>(
    storyItems[0]?.id ?? null
  );
  const [notice, setNotice] = useState("");

  const selectedStory =
    storyItems.find((story) => story.id === selectedId) ??
    storyItems[0];


    if (!selectedStory) {
      return null;
    }

  return (
    <section
      className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card"
      dir="rtl"
    >
      <header className="flex items-center gap-3 border-b border-line p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-50 text-brand">
          <Store className="size-5" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <h2 className="truncate font-bold text-ink">
            {storyStore.name}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {storyStore.description}
          </p>
        </div>
      </header>

      <nav
        aria-label="بخش‌های اطلاعات غرفه"
        className="flex gap-4 overflow-x-auto border-b border-line px-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setNotice("");
            }}
            aria-current={activeTab === tab ? "page" : undefined}
            className={`shrink-0 border-b-2 py-3 text-xs transition-colors ${
              activeTab === tab
                ? "border-brand font-semibold text-brand"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="p-4">
        {activeTab === "استوری ها" ? (
          <>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              {storyItems.map((story, index) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(story.id);
                    setNotice("");
                  }}
                  aria-pressed={selectedId === story.id}
                  aria-label={`نمایش استوری ${story.title}`}
                  className={`shrink-0 rounded-lg p-1 ${
                    selectedId === story.id
                      ? "ring-2 ring-brand"
                      : "ring-1 ring-line"
                  }`}
                >
                  <span
                    className={`grid h-20 w-14 place-items-center rounded-md bg-gradient-to-br ${story.tone}`}
                  >
                    <Wheat className="size-7 text-white drop-shadow" />
                  </span>
                  <span className="mt-1 block max-w-14 truncate text-center text-[10px] text-muted">
                    استوری {index + 1}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                className={`flex min-h-64 items-center justify-center rounded-lg bg-gradient-to-br ${selectedStory.tone}`}
                aria-label={`تصویر نمونه ${selectedStory.title}`}
              >
                <div className="text-center text-white">
                  <Wheat className="mx-auto size-16" />
                  <p className="mt-3 font-bold">{selectedStory.title}</p>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="mb-4 font-bold text-ink">جزئیات</h3>

                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-muted">نام محصول</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {selectedStory.title}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-muted">منتشر شده:</dt>
                    <dd className="mt-1 font-medium text-ink" dir="ltr">
                      {selectedStory.publishedAt}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-muted">بازدید:</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {selectedStory.views.toLocaleString("fa-IR")}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-muted">واکنش:</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {selectedStory.reactions.toLocaleString("fa-IR")}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-muted">وضعیت:</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {selectedStory.status}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <h3 className="mb-3 text-sm font-semibold text-ink">
                اقدامات لازم
              </h3>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    setNotice("حذف استوری پس از اتصال API فعال می‌شود.")
                  }
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  حذف استوری
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setNotice("مسدودسازی غرفه پس از اتصال API فعال می‌شود.")
                  }
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-gray-50"
                >
                  <Ban className="size-4" aria-hidden="true" />
                  مسدود کردن غرفه
                </button>
              </div>

              {notice ? (
                <p
                  role="status"
                  className="mt-3 rounded-md bg-amber-50 p-3 text-xs leading-6 text-amber-800"
                >
                  {notice}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex min-h-48 items-center justify-center text-center text-sm leading-7 text-muted">
            محتوای بخش «{activeTab}» در مرحله بعد اضافه می‌شود.
          </div>
        )}
      </div>
    </section>
  );
}
