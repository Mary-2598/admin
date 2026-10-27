"use client";

import { useEffect } from "react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto mt-16 max-w-md rounded-2xl bg-white p-8 text-center shadow-card">
      <h1 className="text-lg font-bold">مشکلی پیش آمد</h1>
      <p className="mt-2 text-sm leading-7 text-muted">دریافت اطلاعات انجام نشد. دوباره تلاش کنید.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 h-11 rounded-md bg-brand px-8 font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
