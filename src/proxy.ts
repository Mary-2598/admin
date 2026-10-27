import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { verifySessionToken } from "@/lib/session";


export function proxy(request: NextRequest) {
  let authenticated = false;
  try {
    authenticated = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  } catch {
    authenticated = false;
  }
  const { pathname } = request.nextUrl;
  const onLogin = pathname === "/login";

  if (!authenticated && !onLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (authenticated && onLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"] };
