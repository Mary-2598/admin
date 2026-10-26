import { Hourglass, Megaphone, Package, Send, Shapes, Sparkles, Truck, Users, Wallet, type LucideIcon } from "lucide-react";
import type { CardAccent, CardIconKey } from "@/types/dashboard";

export const cardIcons: Record<CardIconKey, LucideIcon> = {
  products: Shapes,
  stories: Sparkles,
  orders: Package,
  finance: Wallet,
  messages: Hourglass,
  customers: Users,
  reviews: Megaphone,
  contracts: Truck,
  campaigns: Send,
};


export const accentStyles: Record<CardAccent, string> = {
  lime: "bg-lime-200 text-lime-700",
  violet: "bg-violet-200 text-violet-700",
  indigo: "bg-indigo-200 text-indigo-700",
  sky: "bg-sky-200 text-sky-700",
  emerald: "bg-emerald-200 text-emerald-700",
  amber: "bg-amber-200 text-amber-700",
  rose: "bg-rose-200 text-rose-700",
  teal: "bg-teal-200 text-teal-700",
  pink: "bg-pink-200 text-pink-700",
};
