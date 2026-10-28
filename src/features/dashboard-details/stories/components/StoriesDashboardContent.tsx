"use client";

import { useState } from "react";
import { DetailPanelsLayout } from "../../shared/components/DetailPanelsLayout";
import type { StoryItem, StoryStore } from "../types/story-detail.types";
import { StoryManagementPanel } from "./StoryManagementPanel";
import { StoryStoreTable } from "./StoryStoreTable";

interface Props {
  stores: readonly StoryStore[];
  stories: readonly StoryItem[];
}

export function StoriesDashboardContent({ stores, stories }: Props) {
  const [pickedId, setPickedId] = useState<string | null>(null);

  const selectedStore = stores.find((store) => store.id === pickedId) ?? stores[0];

  if (!selectedStore) {
    return (
      <p className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted shadow-card">
        غرفه‌ای برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <DetailPanelsLayout
      gap="wide"
      rightPanel={
        <StoryManagementPanel
          key={selectedStore.id}
          store={selectedStore}
          stories={stories.filter(
            (story) => story.storeId === selectedStore.id,
          )}
        />
      }
      leftPanel={
        <StoryStoreTable
          stores={stores}
          selectedStoreId={selectedStore.id}
          onSelectStore={setPickedId}
        />
      }
    />
  );
}