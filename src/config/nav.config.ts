import {
  Store,
  UsersRound,
  Settings,
  ShieldCheck,
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
    id: "booths-panel",
    label: "ورود به پنل غرفه‌ها",
    href: null,
    icon: Store,
    enabled: false,
  },
  {
    id: "groups-panel",
    label: "ورود به پنل گروه‌ها",
    href: null,
    icon: UsersRound,
    enabled: false,
  },
  {
    id: "settings",
    label: "تنظیمات",
    href: null,
    icon: Settings,
    enabled: false,
  },
  {
    id: "system-management",
    label: "مدیریت سیستم",
    href: null,
    icon: ShieldCheck,
    enabled: false,
  },
];