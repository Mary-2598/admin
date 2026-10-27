"use client";

import { useId, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  label: string;
  items: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  children: ReactNode;
}

export function Tabs({ label, items, value, onChange, children }: TabsProps) {
  const base = useId();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((t) => t.id === value);
    // RTL: ArrowLeft goes to the NEXT tab visually, ArrowRight to the previous one.
    const step = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = items[(index + step + items.length) % items.length];
    if (next) {
      onChange(next.id);
      document.getElementById(`${base}-tab-${next.id}`)?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex flex-wrap gap-x-6 border-b border-line px-6">
        {items.map((tab) => {
          const active = tab.id === value;
          return (
            <button
              key={tab.id}
              id={`${base}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${base}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                "-mb-px border-b-2 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand",
                active ? "border-brand font-semibold text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${value}`}>
        {children}
      </div>
    </div>
  );
}
