# همسود – پنل ادمین

Next.js 16 (Turbopack) · React 19 · TypeScript strict · Tailwind v4 · RTL + Vazirmatn

## اجرا
```bash
cp .env.example .env.local   # SESSION_SECRET (حداقل ۳۲ کاراکتر)، ADMIN_USERNAME، ADMIN_PASSWORD
npm install
npm run dev
```
اسکریپت‌ها: `lint` · `typecheck` · `test` (Vitest) · `e2e` (Playwright) · `build`

## ساختار
```
src/
  app/
    login/                      ورود (server action + zod)
    (dashboard)/                لایه‌ی داشبورد (سایدبار/هدر) + error.tsx + loading.tsx
      page.tsx                  خانه
      messages/                 صفحه‌ی پیام‌ها (+ support-actions، loading)
      details/[cardId]/         صفحه‌ی جزئیات سایر کارت‌ها (استوری‌ها)
  features/dashboard-details/   قالب مشترک + فیچر استوری‌ها (components / services / data / types)
  components/{ui,layout,dashboard,messages}
  services/                     لایه‌ی API (فعلاً mock)
  lib/                          format، session، auth-guard، filters-url، …
  config/ · context/ · types/
e2e/                            تست‌های Playwright
.github/workflows/              CI (lint, test, build, typecheck, e2e) و قالب CD (Vercel)
```

## کجا چه چیزی را عوض کنم؟
| می‌خواهم... | فایل |
|---|---|
| اندازه عرض/ارتفاع/فونت/فاصله همه کارت‌ها | `src/config/theme.ts` |
| اندازه فقط یک کارت | `sizes: { width: 160 }` در `src/config/dashboard.config.ts` |
| کارت اضافه/حذف/ترتیب/رنگ/آیکن | `src/config/dashboard.config.ts` |
| کارت صفحه‌ی اختصاصی داشته باشد | `href: "/messages"` در `dashboard.config.ts` (بدون href می‌رود به `/details/<id>`) |
| محتوای صفحه‌ی جزئیات یک کارت | `src/features/dashboard-details/` |
| محتوای داخل یک کارت داشبورد | کامپوننت جدید + ثبت در `src/components/dashboard/cardRows.tsx` |
| اتصال به API واقعی | `src/services/*.service.ts` و `src/features/**/services/` |
| فیلترها | `src/config/filters.config.ts` |
| مودال، تأیید، تب، صفحه‌بندی، اسکلت | `src/components/ui/` |

## قراردادها
- تاریخ‌ها از بک‌اند به‌صورت ISO/UTC می‌آیند و فقط با `formatDateTime` (شمسی، ساعت تهران) نمایش داده می‌شوند. اعداد با `formatNumber`.
- کامپوننت‌ها هرگز فایل mock را مستقیم import نمی‌کنند؛ فقط از طریق سرویس.
- هر اقدام مخرب (حذف، مسدودسازی) قبل از اجرا دیالوگ تأیید دارد. زمان پایان مسدودسازی را سرور حساب می‌کند (نسخه‌ی فعلی mock است).
- فیلترها در URL (`?period=7d`) و `sessionStorage` نگه‌داری می‌شوند؛ کارت‌ها فیلترها را به صفحه‌ی مقصد منتقل می‌کنند.
- هر صفحه‌ای که داده می‌خواند `requireSession()` را صدا می‌زند (علاوه بر `proxy.ts`).
- CI: `.github/workflows/ci.yml`؛ CD: `.github/workflows/deploy.yml` (قالب Vercel، نیاز به secretها).
