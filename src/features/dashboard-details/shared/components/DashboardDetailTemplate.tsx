
import { PageHeader } from "@/components/layout/PageHeader";
import { DetailPanel } from "./DetailPanel";
import { DetailPanelsLayout } from "./DetailPanelsLayout";
import { DetailStatsGrid } from "./DetailStatsGrid";
import {
  DEFAULT_DETAIL_STATS,
  DETAIL_STATS_BY_CARD_ID,
} from "../config/detail-stats.config";
import { StoriesDashboardContent } from "../../stories/components/StoriesDashboardContent";
import { StoryStatCards } from "../../stories/components/StoryStatCards";
import {
  getStories,
  getStoryStats,
  getStoryStores,
} from "../../stories/services/stories.service";

interface Props {
  title: string;
  cardId: string;
}

/** Shared page shell for dashboard detail pages. */
export async function DashboardDetailTemplate({
  title,
  cardId,
}: Props) {
  const isStoriesPage = cardId === "stories";

  const detailStats = DETAIL_STATS_BY_CARD_ID[cardId] ?? {
    cards: DEFAULT_DETAIL_STATS,
  };

  const [stats, stores, stories] = isStoriesPage
    ? await Promise.all([
        getStoryStats(),
        getStoryStores(),
        getStories(),
      ])
    : [[], [], []];

  return (
    <div className="min-w-0">
      <PageHeader
        title={title}
        backHref="/"
        backLabel="بازگشت به داشبورد"
      />

      {isStoriesPage ? (
        <>
          <StoryStatCards stats={stats} />
          <StoriesDashboardContent
            stores={stores}
            stories={stories}
          />
        </>
      ) : (
        <>
          <DetailStatsGrid
            label={`آمار ${title}`}
            columns={detailStats.columns ?? 4}
          >
            {detailStats.cards.map((card) => (
              <article
                key={card.id}
                className="flex min-w-0 flex-col rounded-xl border border-line bg-white p-5 shadow-card"
              >
                <p className="text-sm text-muted">
                  {card.label}
                </p>

                <p className="mt-4 text-2xl font-bold text-ink">
                  {card.value}
                </p>
              </article>
            ))}
          </DetailStatsGrid>

          <DetailPanelsLayout
            rightPanel={
              <DetailPanel
                label={`جزئیات ${title}`}
                title="جزئیات"
              >
                <div className="flex min-h-64 items-center justify-center p-6 text-center text-sm leading-7 text-muted">
                  محتوای این بخش در مرحله بعد اضافه می‌شود.
                </div>
              </DetailPanel>
            }
            leftPanel={
              <DetailPanel
                label={`اطلاعات ${title}`}
                title="اطلاعات"
              >
                <div className="flex min-h-64 items-center justify-center p-6 text-center text-sm leading-7 text-muted">
                  اطلاعات این بخش هنوز آماده نیست.
                </div>
              </DetailPanel>
            }
          />
        </>
      )}
    </div>
  );
}
