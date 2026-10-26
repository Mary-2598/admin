"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/auth";
import { createSessionToken } from "@/lib/session";
import { loginSchema } from "@/lib/validation/auth";
import { z } from "zod";
export interface LoginState {
  fieldErrors?: { username?: string; password?: string };
  formError?: string;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    return { fieldErrors: { username: errors.username?.[0], password: errors.password?.[0] } };
  }

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) {
    return { formError: "تنظیمات ورود روی سرور انجام نشده است." };
  }
  if (parsed.data.username !== expectedUser || parsed.data.password !== expectedPass) {
    return { formError: "نام کاربری یا رمز عبور اشتباه است." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(parsed.data.username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}
