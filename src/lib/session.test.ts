import { beforeAll, describe, expect, it } from "vitest";
import { createSessionToken, verifySessionToken } from "./session";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-secret-test-secret-test-secret-1";
});

describe("session token", () => {
  it("accepts a fresh token", () => {
    expect(verifySessionToken(createSessionToken("admin"))).toBe(true);
  });
  it("rejects tampered and expired tokens", () => {
    const token = createSessionToken("admin");
    expect(verifySessionToken(token.replace("admin", "root"))).toBe(false);
    expect(verifySessionToken(token, Date.now() + 9 * 60 * 60 * 1000)).toBe(false);
    expect(verifySessionToken(undefined)).toBe(false);
  });
});
