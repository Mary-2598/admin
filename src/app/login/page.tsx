import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "ورود" };

export default function LoginPage() {
  return (
    <main id="main" className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card">
        <p className="text-2xl font-extrabold text-brand">همسود</p>
        <h1 className="mb-6 mt-1 text-lg font-bold">ورود به پنل مدیریت</h1>
        <LoginForm />
      </div>
    </main>
  );
}
