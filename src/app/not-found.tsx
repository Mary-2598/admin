import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "صفحه پیدا نشد" };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-card">
        <p className="text-2xl font-extrabold text-brand">۴۰۴</p>
        <h1 className="mt-2 text-lg font-bold">صفحه‌ی مورد نظر پیدا نشد</h1>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-brand px-8 font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          بازگشت به داشبورد
        </Link>
      </div>
    </main>
  );
}
