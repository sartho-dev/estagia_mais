import { Response } from "express";

// RF01 / RF02: the three kinds of account that can sign in.
export enum AccountRole {
  STUDENT = "student",
  RESPONSIBLE = "responsible",
  ADMIN = "admin",
}

// What the authenticate middleware attaches to the request (res.locals.auth).
export type AuthContext = {
  sessionId: string;
  accountId: string;
  role: AccountRole;
};

// Typed access to the authenticated account inside controllers/services.
// Only call it on routes protected by `authenticate`.
export function getAuth(res: Response): AuthContext {
  return res.locals.auth as AuthContext;
}
