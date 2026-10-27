"use client";

import { useId, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { formatNumber } from "@/lib/format";
import type { ReportReason } from "@/types/messages";
import { REPORT_REASONS } from "./labels";

const MAX = 2000;

export interface ReportPayload {
  reason: ReportReason;
  description: string;
  notifyBooth: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportPayload) => void;
}

export function ReportContentModal({ open, onClose, onSubmit }: Props) {
  const id = useId();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [description, setDescription] = useState("");
  const [notifyBooth, setNotifyBooth] = useState(false);

  return (
    <Modal open={open} title="ثبت گزارش محتوا" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!reason) return;
          onSubmit({ reason, description: description.trim(), notifyBooth });
        }}
        className="grid gap-6 md:grid-cols-2"
      >
        <fieldset>
          <legend className="mb-3 font-bold">دلیل گزارش</legend>
          {REPORT_REASONS.map((r) => (
            <label key={r.value} className="mb-3 flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name={`${id}-reason`}
                value={r.value}
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
                className="size-4 accent-[var(--color-brand)]"
              />
              {r.label}
            </label>
          ))}
        </fieldset>

        <div>
          <label htmlFor={`${id}-desc`} className="mb-2 block font-bold">توضیحات :</label>
          <textarea
            id={`${id}-desc`}
            value={description}
            maxLength={MAX}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیح کوتاه درباره دلیل گزارش..."
            className="h-40 w-full resize-none rounded-md border border-line p-3 outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
          <p className="mt-1 text-xs text-muted">{formatNumber(description.length)}/{formatNumber(MAX)}</p>
        </div>

        <label className="flex cursor-pointer items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            checked={notifyBooth}
            onChange={(e) => setNotifyBooth(e.target.checked)}
            className="size-4 accent-[var(--color-brand)]"
          />
          ارسال گزارش به غرفه دار
        </label>

        <button
          type="submit"
          disabled={!reason}
          className="h-11 rounded-md bg-brand font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 md:col-span-2"
        >
          ثبت گزارش
        </button>
      </form>
    </Modal>
  );
}
