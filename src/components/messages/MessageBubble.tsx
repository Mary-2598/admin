"use client";

import { useEffect, useRef, useState } from "react";
import { EllipsisVertical, Flag, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/format";
import type { ChatMessage } from "@/types/messages";
import { ReportContentModal, type ReportPayload } from "./ReportContentModal";

interface Props {
  message: ChatMessage;
  onDelete: (message: ChatMessage) => void;
  onReport: (message: ChatMessage, payload: ReportPayload) => void;
}

export function MessageBubble({ message, onDelete, onReport }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // Close the menu on outside click or Esc.
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <li
      ref={ref}
      className={cn(
        "relative max-w-[85%] rounded-xl bg-gray-100 p-3 text-sm",
        message.from === "booth" ? "self-end" : "self-start",
      )}
    >
      <button
        type="button"
        aria-label="گزینه‌های پیام"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="rounded p-0.5 text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <EllipsisVertical aria-hidden className="size-4" />
      </button>

      {menuOpen ? (
        <div role="menu" className="absolute end-2 top-8 z-10 w-48 rounded-lg bg-white p-1 shadow-lg">
          <button
            role="menuitem"
            type="button"
            onClick={() => { setMenuOpen(false); setReporting(true); }}
            className="flex w-full items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-red-600 outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            <Flag aria-hidden className="size-4" />گزارش تخلف محتوا
          </button>
          <button
            role="menuitem"
            type="button"
            onClick={() => { setMenuOpen(false); setDeleting(true); }}
            className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 outline-none hover:bg-page focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Trash2 aria-hidden className="size-4" />حذف پیام
          </button>
        </div>
      ) : null}

      <p className="leading-7">{message.text}</p>
      <time dateTime={message.sentAt} className="mt-1 block text-[11px] text-muted">
        {formatDateTime(message.sentAt)}
      </time>

      <ReportContentModal
        open={reporting}
        onClose={() => setReporting(false)}
        onSubmit={(payload) => { setReporting(false); onReport(message, payload); }}
      />
      <ConfirmDialog
        open={deleting}
        destructive
        title="حذف پیام"
        message="این پیام حذف می‌شود و این کار قابل بازگشت نیست."
        confirmLabel="حذف پیام"
        onCancel={() => setDeleting(false)}
        onConfirm={() => { setDeleting(false); onDelete(message); }}
      />
    </li>
  );
}
