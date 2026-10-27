import { Hourglass, Megaphone, Package, Send, Shapes, Sparkles, Truck, Users, Wallet, type LucideIcon } from "lucide-react";
import type { CardIconKey } from "@/types/dashboard";

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
