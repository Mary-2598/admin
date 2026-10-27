import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/auth";
import { verifySessionToken } from "@/lib/session";

/**
 * Defense in depth: proxy.ts already redirects anonymous users, but pages that load
 * data must also check the session themselves (layouts don't re-run on client navigation).
 */
export async function requireSession(): Promise<void> {
  const store = await cookies();
  let valid = false;
  try {
    valid = verifySessionToken(store.get(SESSION_COOKIE)?.value);
  } catch {
    valid = false;
  }
  if (!valid) redirect("/login");
}
