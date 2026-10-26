"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarNav } from "@/components/layout/SidebarNav";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="باز کردن منو"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
        onClick={() => setIsOpen(true)}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-ink outline-none hover:bg-[#05D1D2]/10 focus-visible:ring-2 focus-visible:ring-[#05D1D2] md:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={closeMenu}
        >
          <aside
            id="mobile-sidebar"
            aria-label="منوی اصلی"
            className="absolute inset-y-0 right-0 flex w-[min(82vw,320px)] flex-col overflow-y-auto bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-[65px] shrink-0 items-center justify-between border-b border-line px-5">
              <span className="text-2xl font-bold text-[#05D1D2]">
                همسود
              </span>

              <button
                type="button"
                aria-label="بستن منو"
                onClick={closeMenu}
                className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-[#05D1D2]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05D1D2]"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="px-4 py-5">
              <SidebarNav onNavigate={closeMenu} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}