import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { STATUS_LABEL, TYPE_LABEL } from "@/components/messages/labels";
import { requireSession } from "@/lib/auth-guard";
import { filtersFromParams, filtersToQuery } from "@/lib/filters-url";
import { formatDateTime } from "@/lib/format";
import { getSupportActions } from "@/services/messages.service";

export const metadata: Metadata = { title: "اقدامات پشتیبانی" };

export default async function SupportActionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSession();
  const backQuery = filtersToQuery(filtersFromParams(await searchParams));
  const rows = await getSupportActions();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="اقدامات پشتیبانی" backHref={`/messages${backQuery}`} backLabel="بازگشت به پیام‌ها" />

      <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-page text-muted">
            <tr>
              {["نوع اقدام", "توضیحات", "پشتیبان", "وضعیت", "تاریخ"].map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-start font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-muted">اقدامی ثبت نشده است.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="px-3 py-3">{TYPE_LABEL[r.type]}</td>
                  <td className="px-3 py-3">{r.description}</td>
                  <td className="px-3 py-3">{r.agent}</td>
                  <td className="px-3 py-3">{STATUS_LABEL[r.status]}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatDateTime(r.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
