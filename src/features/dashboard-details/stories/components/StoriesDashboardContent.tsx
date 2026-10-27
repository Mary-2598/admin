"use client";

import { useState } from "react";
import type { StoryItem, StoryStore } from "../types/story-detail.types";
import { StoryManagementPanel } from "./StoryManagementPanel";
import { StoryStoreTable } from "./StoryStoreTable";

interface Props {
  stores: readonly StoryStore[];
  stories: readonly StoryItem[];
}

export function StoriesDashboardContent({ stores, stories }: Props) {
  const [pickedId, setPickedId] = useState<string | null>(null);

  const selectedStore = stores.find((s) => s.id === pickedId) ?? stores[0];
  if (!selectedStore) return <p className="text-sm text-muted">غرفه‌ای برای نمایش وجود ندارد.</p>;

  // RTL grid: the first column is on the RIGHT. Design = details panel on the right, table on the left,
  // while the DOM keeps the logical order (table first) for keyboard and screen-reader users.
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="min-w-0 lg:order-2">
        <StoryStoreTable stores={stores} selectedStoreId={selectedStore.id} onSelectStore={setPickedId} />
      </div>
      <div className="min-w-0 lg:order-1">
        <StoryManagementPanel
          key={selectedStore.id}
          store={selectedStore}
          stories={stories.filter((s) => s.storeId === selectedStore.id)}
        />
      </div>
    </div>
  );
}
