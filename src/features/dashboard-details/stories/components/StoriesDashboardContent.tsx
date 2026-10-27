"use client";

import { useState } from "react";
import { StoryManagementPanel } from "./StoryManagementPanel";
import { StoryStoreTable } from "./StoryStoreTable";
import { storyItems } from "../data/story-detail.mock";
import { storyStores } from "../data/story-stores.mock";

export function StoriesDashboardContent() {
  const [selectedStoreId, setSelectedStoreId] = useState(
    storyStores[0]?.id ?? "",
  );

  const selectedStore =
    storyStores.find((store) => store.id === selectedStoreId) ??
    storyStores[0];

  if (!selectedStore) {
    return null;
  }

  const selectedStories = storyItems.filter(
    (story) => story.storeId === selectedStore.id,
  );

  return (
    <div
      dir="ltr"
      className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-3"
    >
      {/* جدول غرفه‌ها در سمت چپ */}
      <div dir="rtl" className="min-w-0 lg:col-span-2">
        <StoryStoreTable
          stores={storyStores}
          selectedStoreId={selectedStore.id}
          onSelectStore={setSelectedStoreId}
        />
      </div>

      {/* پنل جزئیات در سمت راست */}
      <div dir="rtl" className="min-w-0 lg:col-span-1">
        <StoryManagementPanel
          key={selectedStore.id}
          store={selectedStore}
          stories={selectedStories}
        />
      </div>
    </div>
  );
}