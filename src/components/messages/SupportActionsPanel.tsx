"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { formatDateTime, formatNumber } from "@/lib/format";
import type { SupportAction, SupportActionStatus, SupportActionType } from "@/types/messages";
import { STATUS_LABEL, TYPE_LABEL } from "./labels";

const MAX = 2000;
const PREVIEW_COUNT = 5;

interface Props {
  rows: SupportAction[] | null;
  /** Query string with the current filters (e.g. "?period=7d"), so "view all" can link back. */
  filtersQuery: string;
  onCreate: (type: SupportActionType, description: string, status: SupportActionStatus) => void;
}

function NewActionForm({ onSubmit }: { onSubmit: Props["onCreate"] }) {
  const id = useId();
  const [type, setType] = useState<SupportActionType>("report");
  const [status, setStatus] = useState<SupportActionStatus>("pending");
  const [description, setDescription] = useState("");
  const field = "h-11 w-full rounded-md border border-line bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-brand";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (description.trim()) onSubmit(type, description.trim(), status);
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-type`} className="mb-1 block font-bold">نوع اقدام</label>
          <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value as SupportActionType)} className={field}>
            {Object.entries(TYPE_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-status`} className="mb-1 block font-bold">وضعیت</label>
          <select id={`${id}-status`} value={status} onChange={(e) => setStatus(e.target.value as SupportActionStatus)} className={field}>
            {Object.entries(STATUS_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-desc`} className="mb-1 block font-bold">توضیحات :</label>
        <textarea
          id={`${id}-desc`}
          value={description}
          maxLength={MAX}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیح کوتاه درباره اقدام انجام‌شده..."
          className="h-36 w-full resize-none rounded-md border border-line p-3 outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
        <p className="mt-1 text-xs text-muted">{formatNumber(description.length)}/{formatNumber(MAX)}</p>
      </div>

      <p className="text-xs text-muted">پشتیبان و تاریخ ثبت به‌صورت خودکار توسط سیستم ثبت می‌شود.</p>

      <button
        type="submit"
        disabled={!description.trim()}
        className="h-11 rounded-md bg-brand font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50"
      >
        ثبت اقدام
      </button>
    </form>
  );
}

export function SupportActionsPanel({ rows, filtersQuery, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const preview = rows?.slice(0, PREVIEW_COUNT) ?? [];

  return (
    <section aria-label="اقدامات اخیر پشتیبانی" className="min-w-0 rounded-xl border border-line bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">اقدامات اخیر پشتیبانی</h2>
        <Link
          href={`/messages/support-actions${filtersQuery}`}
          className="rounded text-sm text-brand outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border border-line">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-page text-muted">
            <tr>
              {["نوع اقدام", "توضیحات", "پشتیبان", "وضعیت", "تاریخ"].map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-start font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={5} className="p-6 text-center text-muted">در حال دریافت...</td></tr>
            ) : preview.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-muted">اقدامی ثبت نشده است.</td></tr>
            ) : (
              preview.map((r) => (
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

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-6 flex h-11 w-full max-w-lg items-center justify-center gap-2 rounded-md bg-brand font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <Plus aria-hidden className="size-5" />ثبت اقدام جدید
      </button>

      <Modal open={open} title="ثبت اقدام جدید" onClose={() => setOpen(false)} widthClass="max-w-xl">
        <NewActionForm onSubmit={(type, description, status) => { setOpen(false); onCreate(type, description, status); }} />
      </Modal>
    </section>
  );
}
