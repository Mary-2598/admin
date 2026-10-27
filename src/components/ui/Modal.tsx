"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Tailwind max-width class, e.g. "max-w-md". */
  widthClass?: string;
}

/** Native <dialog>: focus trap, Esc and backdrop are handled by the browser. */
export function Modal({ open, title, onClose, children, widthClass = "max-w-2xl" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] ${widthClass} rounded-2xl bg-white p-0 text-ink shadow-card backdrop:bg-black/40`}
    >
      <div className="flex items-center justify-between px-8 pt-6">
        <h2 id={titleId} className="text-lg font-bold">{title}</h2>
        <button
          type="button"
          aria-label="بستن"
          onClick={onClose}
          className="rounded-md p-1 text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      {/* Children are mounted only while open, so forms always start clean. */}
      <div className="px-8 pb-8 pt-4">{open ? children : null}</div>
    </dialog>
  );
}
