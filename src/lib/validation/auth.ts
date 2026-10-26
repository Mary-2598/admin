import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export type LoginInput = z.infer<typeof loginSchema>;
