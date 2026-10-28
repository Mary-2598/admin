import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SelectProps {
  label: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

export function Select({ label, value, options, onChange }: SelectProps) {
  const id = useId();
  const isActive = value !== "all";

  return (
    <div className="relative h-10 w-40">
      <label htmlFor={id} className="sr-only">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-full w-full cursor-pointer appearance-none rounded-lg border border-line pe-9 ps-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand",
          isActive
            ? "border-brand/50 bg-cyan-50 text-ink"
            : "bg-white text-muted hover:bg-page hover:text-ink",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}