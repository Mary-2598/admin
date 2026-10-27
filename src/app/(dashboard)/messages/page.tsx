import type { Metadata } from "next";
import { MessagesView } from "@/components/messages/MessagesView";
import { requireSession } from "@/lib/auth-guard";
import { filtersFromParams } from "@/lib/filters-url";
import { getBooths, getMessageStats } from "@/services/messages.service";

export const metadata: Metadata = { title: "پیام‌ها" };

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSession();
  const filters = filtersFromParams(await searchParams);
  const [stats, booths] = await Promise.all([getMessageStats(filters), getBooths(filters, "all", 1)]);
  return <MessagesView filters={filters} stats={stats} initialBooths={booths} />;
}
