import type { DashboardFilters, Period } from "@/types/dashboard";
import type {
  BoothInfo, BoothPage, BoothRow, ChatMessage, MessageStats,
  ReadFilter, SupportAction, UserInfo,
} from "@/types/messages";

/**
 * Mock data layer. Every function is deterministic (no Math.random) so server and
 * client render the same thing. Replace the bodies with `apiFetch(...)` calls later;
 * the signatures can stay as they are.
 */

export const PAGE_SIZE = 8;
const MULTIPLIER: Record<Period, number> = { today: 1, "7d": 7, "30d": 30, "3m": 90 };

/** Single source for the message numbers: used by the dashboard card AND the messages page. */
export function computeMessageStats(filters: DashboardFilters): MessageStats {
  const total = 4258 * MULTIPLIER[filters.period];
  return {
    total,
    fresh: Math.round(total * 0.12),
    unread: Math.round(total * 0.05),
    irrelevant: Math.round(total * 0.01),
  };
}

function seed(filters: DashboardFilters): number {
  const s = JSON.stringify(filters);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const BOOTH_NAMES = [
  "برنج فروشان طارم", "خشکبار نیک", "زعفران سحرخیز", "چای ایرانی گل", "عسل کوهستان",
  "روغن آفتاب", "آجیل مهر", "حبوبات سبز", "شیرینی سنتی نان", "ادویه شرق",
  "لبنیات دهکده", "ماهی شمال",
];

function allBooths(filters: DashboardFilters): BoothRow[] {
  const base = seed(filters);
  const rows = BOOTH_NAMES.map((name, i): BoothRow => {
    const messageCount = ((base >>> (i % 8)) % 9) + 1 + i;
    const readCount = Math.floor(messageCount / 2);
    return {
      id: `booth-${i + 1}`,
      name,
      messageCount,
      readCount,
      unreadCount: messageCount - readCount,
      awaitingReply: messageCount % 3 === 0,
      lastActivityAt: new Date(Date.UTC(2026, 3, 1, 9, 25) - i * 3_600_000).toISOString(),
      warningCount: i % 4 === 0 ? 1 : 0,
      status: i % 7 === 6 ? "blocked" : i % 4 === 0 ? "warned" : "active",
    };
  });
  return filters.status === "all" ? rows : rows.filter((r) => r.status === filters.status);
}

export async function getMessageStats(filters: DashboardFilters): Promise<MessageStats> {
  return computeMessageStats(filters);
}

export async function getBooths(
  filters: DashboardFilters,
  read: ReadFilter,
  page: number,
): Promise<BoothPage> {
  let rows = allBooths(filters);
  if (read === "read") rows = rows.filter((r) => r.readCount > 0);
  if (read === "unread") rows = rows.filter((r) => r.unreadCount > 0);
  if (read === "unanswered") rows = rows.filter((r) => r.awaitingReply);
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), pageCount);
  return {
    rows: rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    total: rows.length,
    page: safePage,
    pageCount,
  };
}

export async function getConversation(boothId: string): Promise<ChatMessage[]> {
  return [
    { id: `${boothId}-m1`, boothId, from: "user", text: "سلام وقت بخیر. برای خرید برنج ایرانی مزاحمتون شدم.", sentAt: "2026-04-01T09:20:00Z" },
    { id: `${boothId}-m2`, boothId, from: "booth", text: "سلام، خوش آمدید. چه مقدار نیاز دارید؟", sentAt: "2026-04-01T09:25:00Z" },
    { id: `${boothId}-m3`, boothId, from: "user", text: "ده کیلو، ارسال به زنجان ممکنه؟", sentAt: "2026-04-01T09:31:00Z" },
  ];
}

export async function getUserInfo(boothId: string): Promise<UserInfo> {
  return {
    id: `user-${boothId}`,
    name: "علی مقدم",
    role: "کاربر عادی",
    maskedPhone: "۰۹۱۲ ۷۴۰ ****",
    joinedAt: "2026-04-15T08:00:00Z",
    lastSeenAt: "2026-04-01T09:25:00Z",
  };
}

export async function getBoothInfo(boothId: string): Promise<BoothInfo> {
  const booth = BOOTH_NAMES[Number(boothId.replace("booth-", "")) - 1] ?? "غرفه";
  return {
    id: boothId,
    name: booth,
    category: "عمده فروش مواد غذایی",
    city: "خرمدره",
    status: "active",
    rating: 4.5,
    sales: 568,
    followers: 233,
    ownerName: "رضا مقدم",
    ownerMaskedPhone: "۰۹۱۲ ۷۴۰ ****",
    ownerJoinedAt: "2026-05-12T08:00:00Z",
    warningCount: 2,
    adCount: 12,
    highlightCount: 10,
  };
}

export async function getSupportActions(): Promise<SupportAction[]> {
  return [
    { id: "sa-1", type: "report", description: "بررسی مشکل عدم نمایش برخی محصولات در غرفه ها", agent: "محمد رضایی", status: "pending", createdAt: "2026-04-01T09:25:00Z" },
    { id: "sa-2", type: "warning", description: "هشدار درباره‌ی تبلیغ غیرمجاز در توضیحات محصول", agent: "سارا احمدی", status: "done", createdAt: "2026-03-30T11:10:00Z" },
    { id: "sa-3", type: "correction", description: "درخواست اصلاح تصویر و قیمت یکی از محصولات", agent: "محمد رضایی", status: "done", createdAt: "2026-03-28T07:45:00Z" },
    { id: "sa-4", type: "block", description: "مسدودسازی ۲۴ ساعته‌ی کاربر به‌دلیل ارسال پیام نامناسب", agent: "سارا احمدی", status: "done", createdAt: "2026-03-25T16:20:00Z" },
  ];
}
