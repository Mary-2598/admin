import { Bell, EllipsisVertical, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { logoutAction } from "@/app/login/actions";

export function Header() {
  return (
    <header className="flex h-[65px] w-full items-center gap-4 border-t border-stork px-8 xl:mx-auto xl:w-[1226px]">
      <button
        type="button"
        aria-label="گزینه‌های بیشتر"
        className="rounded-md p-1 text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <EllipsisVertical aria-hidden className="size-5" />
      </button>

      <div className="ms-auto flex items-center gap-4">
        <form
          role="search"
          className="relative h-[45px] w-full max-w-[555px] sm:w-80 md:w-96 xl:w-[555px]"
        >
          <label htmlFor="global-search" className="sr-only">جستجو</label>
          <input
            id="global-search"
            type="search"
            placeholder="جستجو.."
            className="h-full w-full rounded-[3px] bg-[#F5F5F5] pe-12 ps-4 text-base outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand"
          />
          <Search
            aria-hidden
            className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-ink"
          />
        </form>

        <button
          type="button"
          aria-label="اعلان‌ها"
          className="relative rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Bell aria-hidden className="size-6" strokeWidth={1.5} />
          <span aria-hidden className="absolute end-1 top-1 size-2 rounded-full bg-red-500" />
        </button>

        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="خروج از حساب کاربری"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Avatar alt="حساب کاربری" size={32} />
          </button>
        </form>
      </div>
    </header>
  );
}