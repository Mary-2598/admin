# همسود – پنل ادمین (صفحه خانه)

Next.js 16 (Turbopack) · React 19 · TypeScript strict · Tailwind v4 · RTL + Vazirmatn

## اجرا
```bash
cp .env.example .env.local   # SESSION_SECRET (حداقل ۳۲ کاراکتر)، ADMIN_USERNAME، ADMIN_PASSWORD
npm install
npm run dev
```
اسکریپت‌ها: `lint` · `typecheck` · `test` (Vitest) · `e2e` (Playwright) · `build`

## کجا چه چیزی را عوض کنم؟
| می‌خواهم... | فایل |
|---|---|
| اندازه عرض/ارتفاع/فونت/فاصله همه کارت‌ها | `src/config/theme.ts` |
| اندازه فقط یک کارت | `sizes: { width: 160 }` در `src/config/dashboard.config.ts` |
| کارت اضافه/حذف/ترتیب/رنگ/آیکن | `src/config/dashboard.config.ts` |
| محتوای داخل یک کارت | کامپوننت جدید + ثبت در `src/components/dashboard/cardRows.tsx` |
| اتصال به API واقعی | `src/services/dashboard.service.ts` |
| فیلترها | `src/config/filters.config.ts` |
