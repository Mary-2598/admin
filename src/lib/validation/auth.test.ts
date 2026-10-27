import { describe, expect, it } from "vitest";
import { loginSchema } from "./auth";
import { z } from "zod";
describe("loginSchema", () => {
  it("rejects short values with Persian messages", () => {
    const result = loginSchema.safeParse({ username: "ab", password: "123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(z.flattenError(result.error).fieldErrors.username?.[0]).toContain("۳");
    }
  });
  it("accepts valid values", () => {
    expect(loginSchema.safeParse({ username: "admin", password: "admin12345" }).success).toBe(true);
  });
});
