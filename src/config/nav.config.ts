import {
  LayoutDashboard,
  House,
  MessageCircle,
  Users,
  ShoppingBag,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string | null;
  icon: LucideIcon;
  enabled: boolean;
}

export const navItems: readonly NavItem[] = [
  {
    id: "dashboard",
    label: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    id: "home",
    label: "خانه",
    href: null,
    icon: House,
    enabled: false,
  },
  {
    id: "messages",
    label: "پیام‌ها",
    href: null,
    icon: MessageCircle,
    enabled: false,
  },
  {
    id: "customers",
    label: "مشتریان",
    href: null,
    icon: Users,
    enabled: false,
  },
  {
    id: "orders",
    label: "سفارشات",
    href: null,
    icon: ShoppingBag,
    enabled: false,
  },
  {
    id: "account",
    label: "حساب من",
    href: null,
    icon: UserRound,
    enabled: false,
  },
];