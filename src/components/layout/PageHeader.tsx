import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backHref: string;
  backLabel: string;
}

/** Shared by every inner page: the title on the right, the "back" arrow on the left (matches the design). */
export function PageHeader({ title, backHref, backLabel }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h1 className="text-xl font-bold text-ink md:text-2xl">{title}</h1>
      <Link
        href={backHref}
        aria-label={backLabel}
        className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink outline-none transition-colors hover:bg-page focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ArrowLeft aria-hidden className="size-5" />
      </Link>
    </div>
  );
}
