import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 8 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set (at least 32 characters).");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(username: string, now = Date.now()): string {
  const payload = `${username}.${now + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;
  const cut = token.lastIndexOf(".");
  if (cut < 0) return false;
  const payload = token.slice(0, cut);
  const given = Buffer.from(token.slice(cut + 1));
  const expected = Buffer.from(sign(payload));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const expires = Number(payload.slice(payload.lastIndexOf(".") + 1));
  return Number.isFinite(expires) && expires > now;
}
