"use client";

import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";
import { formatDateTime, formatNumber } from "@/lib/format";
import { getBoothInfo, getConversation, getUserInfo } from "@/services/messages.service";
import type { BoothInfo, ChatMessage, SupportActionType, UserInfo } from "@/types/messages";
import { REPORT_REASONS } from "./labels";
import { MessageBubble } from "./MessageBubble";

const TABS = [
  { id: "messages", label: "پیام ها" },
  { id: "booth", label: "اطلاعات غرفه دار" },
  { id: "user", label: "اطلاعات کاربر" },
] as const;

type Confirm = null | "deleteAll" | "blockUser" | "blockBooth" | "correction";

interface Props {
  boothId: string;
  boothName: string;
  /** Logs an entry into "recent support actions" (the server will do this for real later). */
  onAction: (type: SupportActionType, description: string) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-line py-2 last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

const dangerBtn =
  "h-11 rounded-md border border-red-300 bg-red-50 font-medium text-red-600 outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-60";
const normalBtn =
  "h-11 rounded-md border border-line bg-white font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-60";

/** Render this with `key={boothId}` so every booth starts with a clean state. */
export function ConversationPanel({ boothId, boothName, onAction }: Props) {
  const [tab, setTab] = useState<string>("messages");
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [booth, setBooth] = useState<BoothInfo | null>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [localBlockedUntil, setLocalBlockedUntil] = useState<string | null>(null);
  const [boothBlocked, setBoothBlocked] = useState(false);
  const [correctionRequested, setCorrectionRequested] = useState(false);

  // Lazy loading: each tab fetches its data only the first time it is opened.
  useEffect(() => {
    let cancelled = false;
    if (tab === "messages" && messages === null) {
      getConversation(boothId).then((m) => { if (!cancelled) setMessages(m); });
    }
    if (tab === "user" && user === null) {
      getUserInfo(boothId).then((u) => { if (!cancelled) setUser(u); });
    }
    if (tab === "booth" && booth === null) {
      getBoothInfo(boothId).then((b) => { if (!cancelled) setBooth(b); });
    }
    return () => { cancelled = true; };
  }, [boothId, tab, messages, user, booth]);

  const userBlockedUntil = localBlockedUntil ?? user?.blockedUntil ?? null;
  const loading = <p className="text-sm text-muted">در حال دریافت...</p>;

  return (
    <section aria-label="گفتگو" className="rounded-2xl bg-white shadow-card">
      <div className="px-6 pt-5">
        <h2 className="font-bold">تحلیل کلی بازدید ها و پاسخ ها</h2>
        <p className="mt-1 text-xs text-muted">{boothName}</p>
      </div>

      <Tabs label="اطلاعات گفتگو" items={TABS} value={tab} onChange={setTab}>
        <div className="max-h-[420px] min-h-40 overflow-y-auto p-5">
          {tab === "messages" ? (
            messages === null ? loading
            : messages.length === 0 ? <p className="py-8 text-center text-sm text-muted">پیامی وجود ندارد.</p>
            : (
              <ul className="flex flex-col gap-4">
                {messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    message={m}
                    onDelete={(msg) => {
                      setMessages((cur) => cur?.filter((x) => x.id !== msg.id) ?? cur);
                      onAction("other", `حذف یک پیام از گفتگو با «${boothName}»`);
                    }}
                    onReport={(_msg, payload) => {
                      const reason = REPORT_REASONS.find((r) => r.value === payload.reason)?.label ?? "";
                      onAction("report", `گزارش تخلف محتوا (${reason}) در گفتگو با «${boothName}»`);
                    }}
                  />
                ))}
              </ul>
            )
          ) : null}

          {tab === "user" ? (
            user === null ? loading : (
              <dl className="text-sm">
                <Field label="نام">{user.name}</Field>
                <Field label="نوع کاربر">{user.role}</Field>
                <Field label="شماره تماس"><span dir="ltr">{user.maskedPhone}</span></Field>
                <Field label="تاریخ عضویت">{formatDateTime(user.joinedAt)}</Field>
                <Field label="آخرین ورود">{formatDateTime(user.lastSeenAt)}</Field>
                {userBlockedUntil ? (
                  <Field label="وضعیت"><span className="text-red-600">مسدود تا {formatDateTime(userBlockedUntil)}</span></Field>
                ) : null}
              </dl>
            )
          ) : null}

          {tab === "booth" ? (
            booth === null ? loading : (
              <dl className="text-sm">
                <Field label="نام غرفه">{booth.name}</Field>
                <Field label="دسته‌بندی">{booth.category}</Field>
                <Field label="شهر">{booth.city}</Field>
                <Field label="وضعیت">
                  <span className={cn(boothBlocked ? "text-red-600" : "text-emerald-600")}>
                    {boothBlocked ? "مسدود" : "فعال"}
                  </span>
                </Field>
                <Field label="امتیاز">{formatNumber(booth.rating)}</Field>
                <Field label="فروش">{formatNumber(booth.sales)}</Field>
                <Field label="دنبال‌کننده">{formatNumber(booth.followers)}</Field>
                <Field label="صاحب غرفه">{booth.ownerName}</Field>
                <Field label="تلفن صاحب غرفه"><span dir="ltr">{booth.ownerMaskedPhone}</span></Field>
                <Field label="تاریخ عضویت">{formatDateTime(booth.ownerJoinedAt)}</Field>
                <Field label="تعداد اخطار">{formatNumber(booth.warningCount)}</Field>
                <Field label="آگهی‌ها / هایلایت‌ها">{formatNumber(booth.adCount)} / {formatNumber(booth.highlightCount)}</Field>
              </dl>
            )
          ) : null}
        </div>

        <div className="border-t border-line p-5">
          <h3 className="mb-3 text-sm font-bold">اقدامات لازم</h3>
          {tab === "booth" ? (
            <div className="flex flex-col gap-3">
              <button type="button" disabled={boothBlocked} onClick={() => setConfirm("blockBooth")} className={dangerBtn}>
                {boothBlocked ? "غرفه مسدود است" : "مسدود کردن غرفه"}
              </button>
              <button type="button" disabled={correctionRequested} onClick={() => setConfirm("correction")} className={normalBtn}>
                {correctionRequested ? "درخواست اصلاح ثبت شد" : "درخواست اصلاح"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                disabled={!messages || messages.length === 0}
                onClick={() => setConfirm("deleteAll")}
                className={dangerBtn}
              >
                حذف همه پیام‌ها
              </button>
              <button type="button" disabled={userBlockedUntil !== null} onClick={() => setConfirm("blockUser")} className={normalBtn}>
                {userBlockedUntil ? "کاربر مسدود است" : "مسدود کردن کاربر (۲۴ ساعت)"}
              </button>
            </div>
          )}
        </div>
      </Tabs>

      <ConfirmDialog
        open={confirm === "deleteAll"}
        destructive
        title="حذف همه پیام‌ها"
        message={`${formatNumber(messages?.length ?? 0)} پیام در گفتگو با «${boothName}» حذف می‌شود و این کار قابل بازگشت نیست.`}
        confirmLabel="حذف همه"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setMessages([]);
          setConfirm(null);
          onAction("other", `حذف همه پیام‌های گفتگو با «${boothName}»`);
        }}
      />
      <ConfirmDialog
        open={confirm === "blockUser"}
        destructive
        title="مسدود کردن کاربر"
        message="این کاربر به مدت ۲۴ ساعت مسدود می‌شود."
        confirmLabel="مسدود کن"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          // Mock only: the SERVER must compute blockedUntil (now + 24h) when the API is connected.
          setLocalBlockedUntil(new Date(Date.now() + 24 * 3_600_000).toISOString());
          setConfirm(null);
          onAction("block", `مسدودسازی ۲۴ ساعته‌ی کاربر در گفتگو با «${boothName}»`);
        }}
      />
      <ConfirmDialog
        open={confirm === "blockBooth"}
        destructive
        title="مسدود کردن غرفه"
        message={`غرفه‌ی «${boothName}» مسدود می‌شود.`}
        confirmLabel="مسدود کن"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setBoothBlocked(true);
          setConfirm(null);
          onAction("block", `مسدودسازی غرفه‌ی «${boothName}»`);
        }}
      />
      <ConfirmDialog
        open={confirm === "correction"}
        title="درخواست اصلاح"
        message={`درخواست اصلاح برای غرفه‌ی «${boothName}» ثبت می‌شود.`}
        confirmLabel="ثبت درخواست"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setCorrectionRequested(true);
          setConfirm(null);
          onAction("correction", `درخواست اصلاح برای غرفه‌ی «${boothName}»`);
        }}
      />
    </section>
  );
}
