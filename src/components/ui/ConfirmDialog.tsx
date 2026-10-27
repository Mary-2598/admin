"use client";

import { cn } from "@/lib/cn";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open, title, message, confirmLabel, destructive = false, pending = false, onConfirm, onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} title={title} onClose={onCancel} widthClass="max-w-md">
      <p className="text-sm leading-7">{message}</p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={onConfirm}
          className={cn(
            "h-11 flex-1 rounded-md font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60",
            destructive ? "bg-red-600 focus-visible:ring-red-600" : "bg-brand focus-visible:ring-brand",
          )}
        >
          {pending ? "در حال انجام..." : confirmLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-11 flex-1 rounded-md border border-line bg-white font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          انصراف
        </button>
      </div>
    </Modal>
  );
}
