"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import type { StoryStore } from "../types/story-detail.types";

const tabs = ["استوری ها", "هایلایت ها", "اخطارها"] as const;

type Tab = (typeof tabs)[number];

interface Props {
  stores: StoryStore[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
}

const PAGE_SIZE = 2;

export function StoryStoreTable({
  stores,
  selectedStoreId,
  onSelectStore,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("استوری ها");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stores.length / PAGE_SIZE);

  const currentStores = stores.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function changePage(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  return (
    <section
      dir="rtl"
      className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card"
    >
      <nav
        aria-label="بخش‌های مدیریت استوری"
        className="flex border-b border-line px-3 sm:px-5"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            className={`flex-1 border-b-2 px-2 py-4 text-xs transition-colors sm:text-sm ${
              activeTab === tab
                ? "border-brand font-semibold text-brand"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "استوری ها" ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-right text-xs">
              <thead className="bg-gray-50 text-muted">
                <tr>
                  <th scope="col" className="px-3 py-4 font-medium">
                    نام غرفه
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    تعداد استوری
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    بازدید
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    وضعیت استوری
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    آخرین انتشار
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    اخطارها
                  </th>
                  <th scope="col" className="w-10 px-2 py-4">
                    <span className="sr-only">مشاهده جزئیات</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {currentStores.map((store) => {
                  const isSelected = store.id === selectedStoreId;

                  return (
                    <tr
                      key={store.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`نمایش جزئیات غرفه ${store.name}`}
                      aria-pressed={isSelected}
                      onClick={() => onSelectStore(store.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelectStore(store.id);
                        }
                      }}
                      className={`cursor-pointer transition-colors hover:bg-teal-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand ${
                        isSelected ? "bg-teal-50/70" : "bg-white"
                      }`}
                    >
                      <td className="px-3 py-4">
                        <div className="flex min-w-44 items-center gap-3">
                          <span
                            className={`grid size-10 shrink-0 place-items-center rounded-lg ${store.avatarTone}`}
                          >
                            <Store className="size-5" aria-hidden="true" />
                          </span>

                          <div className="min-w-0">
                            <p className="font-semibold text-ink">
                              {store.name}
                            </p>
                            <p className="mt-1 text-[10px] text-muted">
                              {store.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-ink">
                        {store.storyCount.toLocaleString("fa-IR")}
                      </td>

                      <td className="px-3 py-4 text-ink">
                        {store.views.toLocaleString("fa-IR")}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            store.status === "تأیید شده"
                              ? "bg-green-50 text-green-700"
                              : store.status === "رد شده"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {store.status}
                        </span>
                      </td>

                      <td
                        dir="ltr"
                        className="whitespace-nowrap px-3 py-4 text-ink"
                      >
                        {store.lastPublishedAt}
                      </td>

                      <td className="px-3 py-4">
                        {store.warnings === 0 ? (
                          <span className="text-muted">-</span>
                        ) : (
                          <span className="font-medium text-red-600">
                            {store.warnings.toLocaleString("fa-IR")}
                          </span>
                        )}
                      </td>

                      <td className="px-2 py-4">
                        <ChevronLeft
                          className={`size-4 ${
                            isSelected ? "text-brand" : "text-muted"
                          }`}
                          aria-hidden="true"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <footer className="flex items-center justify-between gap-3 border-t border-line px-4 py-4">
            <p className="text-[11px] text-muted">
              صفحه {currentPage.toLocaleString("fa-IR")} از{" "}
              {totalPages.toLocaleString("fa-IR")}
            </p>

            <nav aria-label="صفحه‌بندی غرفه‌ها" className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="صفحه قبلی"
                className="grid size-8 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => changePage(page)}
                    aria-label={`صفحه ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`grid size-8 place-items-center rounded-lg border text-xs transition-colors ${
                      currentPage === page
                        ? "border-brand bg-brand text-white"
                        : "border-line text-ink hover:bg-gray-50"
                    }`}
                  >
                    {page.toLocaleString("fa-IR")}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="صفحه بعدی"
                className="grid size-8 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
            </nav>
          </footer>
        </>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
          <Store className="mb-3 size-9 text-muted" aria-hidden="true" />

          <p className="font-semibold text-ink">{activeTab}</p>

          <p className="mt-2 max-w-xs text-xs leading-6 text-muted">
            محتوای این بخش در مرحله بعد تکمیل می‌شود.
          </p>
        </div>
      )}
    </section>
  );
}