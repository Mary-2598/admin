"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/nav.config";

interface SidebarNavProps {
  onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="منوی اصلی" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href !== null && pathname === item.href;

        const itemClassName = [
          "flex w-full items-center gap-3 rounded-lg px-4 py-3",
          "text-right text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[#05D1D2]",
          isActive
            ? "bg-[#05D1D2]/10 font-semibold text-[#05D1D2]"
            : item.enabled
              ? "text-ink hover:bg-[#05D1D2]/10 hover:text-[#05D1D2]"
              : "cursor-not-allowed text-muted/70",
        ].join(" ");

        if (!item.enabled) {
          return (
            <div
              key={item.id}
              aria-disabled="true"
              title="این بخش هنوز آماده نیست"
              className={`${itemClassName} justify-between`}
            >
              <span className="flex items-center gap-3">
                <Icon aria-hidden="true" className="size-5 shrink-0" />
                <span>{item.label}</span>
              </span>

              <span className="shrink-0 text-[10px] text-muted">
                به‌زودی
              </span>
            </div>
          );
        }

        if (item.href === null) {
          return (
            <button
              key={item.id}
              type="button"
              className={itemClassName}
              onClick={onNavigate}
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={itemClassName}
          >
            <Icon aria-hidden="true" className="size-5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}