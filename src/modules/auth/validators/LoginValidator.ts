import { z } from "zod";

// Same normalisation as the sign-up email (trim + lowercase), so "Ana@X.com"
// finds the account that was stored as "ana@x.com".
//
// The password is NOT checked for strength here: strength rules apply when it
// is created, and revealing them at login would only help an attacker.
export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
    password: z
      .string()
      .min(1, "Password is required")
      .max(200, "Password is too long"),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
