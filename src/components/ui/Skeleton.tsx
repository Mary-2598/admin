import { cn } from "@/lib/cn";

/** Pulsing placeholder block for loading states (decorative, hidden from assistive tech). */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-line", className)} />;
}
