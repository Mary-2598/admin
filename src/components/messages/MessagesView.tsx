"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { filtersToQuery } from "@/lib/filters-url";
import { saveFilters } from "@/lib/filters-storage";
import { uid } from "@/lib/id";
import { getBooths, getSupportActions } from "@/services/messages.service";
import type { DashboardFilters } from "@/types/dashboard";
import type {
  BoothPage, MessageStats, ReadFilter, SupportAction, SupportActionStatus, SupportActionType,
} from "@/types/messages";
import { BoothTable } from "./BoothTable";
import { ConversationPanel } from "./ConversationPanel";
import { MessageStatsCards } from "./MessageStatsCards";
import { SupportActionsPanel } from "./SupportActionsPanel";
import { DetailPanelsLayout } from "@/features/dashboard-details/shared/components/DetailPanelsLayout";

const READ_TABS = [
  { id: "all", label: "همه" },
  { id: "read", label: "خوانده شده" },
  { id: "unread", label: "خوانده نشده" },
  { id: "unanswered", label: "بی پاسخ" },
] as const;

interface Props {
  filters: DashboardFilters;
  stats: MessageStats;
  initialBooths: BoothPage;
}

export function MessagesView({ filters, stats, initialBooths }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [read, setRead] = useState<ReadFilter>("all");
  const [page, setPage] = useState(1);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [actions, setActions] = useState<SupportAction[] | null>(null);

  // Same pattern as DashboardContext: the result remembers which request it belongs to.
  const requestKey = JSON.stringify({ filters, read, page });
  const [result, setResult] = useState({
    key: JSON.stringify({ filters, read: "all", page: 1 }),
    data: initialBooths,
  });
  const isLoading = result.key !== requestKey;

  useEffect(() => {
    if (!isLoading) return;
    let cancelled = false;
    getBooths(filters, read, page).then((data) => {
      if (!cancelled) setResult({ key: requestKey, data });
    });
    return () => { cancelled = true; };
  }, [isLoading, requestKey, filters, read, page]);

  // Keep the dashboard in sync: when the user goes back, it restores these filters.
  useEffect(() => { saveFilters(filters); }, [filters]);

  useEffect(() => {
    let cancelled = false;
    getSupportActions().then((rows) => { if (!cancelled) setActions(rows); });
    return () => { cancelled = true; };
  }, []);

  const booths = result.data;
  const selected = booths.rows.find((r) => r.id === pickedId) ?? booths.rows[0] ?? null;
  const filtersQuery = filtersToQuery(filters);

  function changeFilter<K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) {
    const next = { ...filters, [key]: value };
    saveFilters(next);
    setPage(1);
    startTransition(() => router.replace(`/messages${filtersToQuery(next)}`, { scroll: false }));
  }

  function addAction(type: SupportActionType, description: string, status: SupportActionStatus = "done") {
    const entry: SupportAction = {
      id: uid("sa"),
      type,
      description,
      // Mock values: the server fills in the real agent (from the session) and the timestamp.
      agent: "پشتیبان فعلی",
      status,
      createdAt: new Date().toISOString(),
    };
    setActions((cur) => [entry, ...(cur ?? [])]);
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterBar filters={filters} onChange={changeFilter} />

      <PageHeader title="پیام‌ها" backHref="/" backLabel="بازگشت به داشبورد" />

      <MessageStatsCards stats={stats} />

      {/* RTL grid: the first column is on the RIGHT. Design = conversation on the right, table on the left;
          the DOM keeps the logical order (table first) for keyboard and screen-reader users. */}
            <DetailPanelsLayout
        gap="wide"
        rightPanel={
          selected ? (
            <ConversationPanel
              key={selected.id}
              boothId={selected.id}
              boothName={selected.name}
              onAction={(type, description) => addAction(type, description)}
            />
          ) : (
            <section className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted shadow-card">
              یک غرفه را انتخاب کنید.
            </section>
          )
        }
        leftPanel={
          <section
            aria-label="غرفه‌ها"
            className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card"
          >
            <Tabs
              label="فیلتر خوانده‌شدن"
              items={READ_TABS}
              value={read}
              onChange={(id) => {
                setRead(id as ReadFilter);
                setPage(1);
              }}
            >
              <BoothTable
                data={booths}
                selectedId={selected?.id ?? null}
                busy={isLoading}
                onSelect={setPickedId}
                onPage={setPage}
              />
            </Tabs>
          </section>
        }
      />

      <SupportActionsPanel rows={actions} filtersQuery={filtersQuery} onCreate={addAction} />
    </div>
  );
}
