import { SidebarNav } from "@/components/layout/SidebarNav";

export function Sidebar() {
  return (
    <aside
      aria-label="نوار کناری"
      className="hidden min-h-screen w-64 shrink-0 flex-col border-s border-line bg-white md:flex"
    >
      <div className="flex h-[65px] shrink-0 items-center px-6">
        <span className="text-2xl font-bold text-[#05D1D2]">
          همسود
        </span>
      </div>

      <div className="px-4 pb-6 pt-4">
        <SidebarNav />
      </div>
    </aside>
  );
}