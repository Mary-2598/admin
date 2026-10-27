
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StoryStatCards } from "../../stories/components/StoryStatCards";
import { StoryManagementPanel } from "../../stories/components/StoryManagementPanel";
import { storyDetailStats } from "../../stories/data/story-detail.mock";

interface Props {
  title: string;
  cardId: string;
}

export function DashboardDetailTemplate({ title, cardId }: Props) {
  const isStoriesPage = cardId === "stories";

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-ink md:text-2xl">
          {title}
        </h1>

        <Link
          href="/"
          aria-label="بازگشت به داشبورد"
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
      </div>

      {isStoriesPage ? (
        <StoryStatCards stats={storyDetailStats} />
      ) : null}

      <section
        aria-label={`جزئیات ${title}`}
        className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3"
      >
        <div className="min-w-0 lg:col-span-1">
          {isStoriesPage ? <StoryManagementPanel /> : null}
        </div>

        {/* فضای سمت چپ عمداً برای محتوای آینده خالی است. */}
        <div
          aria-hidden="true"
          className="hidden min-h-0 lg:col-span-2 lg:block"
        />
      </section>
    </div>
  );
}
