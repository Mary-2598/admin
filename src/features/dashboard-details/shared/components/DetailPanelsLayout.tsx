
import type { ReactNode } from "react";

interface DetailPanelsLayoutProps {
  rightPanel: ReactNode;
  leftPanel: ReactNode;
  gap?: "normal" | "wide";
}

export function DetailPanelsLayout({
  rightPanel,
  leftPanel,
  gap = "normal",
}: DetailPanelsLayoutProps) {
  return (
    <div
      dir="rtl"
      className={`grid min-w-0 grid-cols-1 items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] ${
        gap === "wide" ? "gap-6" : "gap-4"
      }`}
    >
      <div className="order-2 min-w-0">{leftPanel}</div>
      <div className="order-1 min-w-0">{rightPanel}</div>
    </div>
  );
}
