import Image from "next/image";
import { Store } from "lucide-react";

const SIZE = 40;

/** Booth picture through next/image (resized + lazy); falls back to an icon when there is no image. */
export function BoothThumb({ src, name }: { src?: string; name: string }) {
  if (!src) {
    return (
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-lg bg-page text-muted">
        <Store className="size-5" />
      </span>
    );
  }
  return (
    <Image src={src} alt={name} width={SIZE} height={SIZE} sizes={`${SIZE}px`} className="size-10 shrink-0 rounded-lg object-cover" />
  );
}
