import Image from "next/image";
import { CircleUser } from "lucide-react";

export function Avatar({ src, alt, size = 32 }: { src?: string; alt: string; size?: number }) {
  if (!src) return <CircleUser aria-label={alt} role="img" size={size} strokeWidth={1.5} />;
  return (
    <Image src={src} alt={alt} width={size} height={size} sizes={`${size}px`} className="rounded-full object-cover" />
  );
}
