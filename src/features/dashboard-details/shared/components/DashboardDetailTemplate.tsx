import { PageHeader } from "@/components/layout/PageHeader";
import { StoriesDashboardContent } from "../../stories/components/StoriesDashboardContent";
import { StoryStatCards } from "../../stories/components/StoryStatCards";
import { getStories, getStoryStats, getStoryStores } from "../../stories/services/stories.service";

interface Props {
  title: string;
  cardId: string;
}

/** Server component: data is fetched here and passed down, so mocks never reach the client bundle. */
export async function DashboardDetailTemplate({ title, cardId }: Props) {
  const isStoriesPage = cardId === "stories";
  const [stats, stores, stories] = isStoriesPage
    ? await Promise.all([getStoryStats(), getStoryStores(), getStories()])
    : [[], [], []];

  return (
    <div>
      <PageHeader title={title} backHref="/" backLabel="بازگشت به داشبورد" />

      {isStoriesPage ? (
        <>
          <StoryStatCards stats={stats} />
          <StoriesDashboardContent stores={stores} stories={stories} />
        </>
      ) : (
        <p className="rounded-xl bg-white p-10 text-center text-sm text-muted shadow-card">
          صفحه‌ی جزئیات «{title}» به‌زودی اضافه می‌شود.
        </p>
      )}
    </div>
  );
}
