import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { AccountRole, AuthContext } from "../types/AccountRole";

// RF02: each account only reaches the features of its own role.
// Use AFTER authenticate:
//   router.get("/x", authenticate, authorize(AccountRole.ADMIN), handler)
//
// This only checks the ROLE. Ownership rules (e.g. RN13 — a responsible only
// touches their own company's vacancies) still belong in the services.
export function authorize(...allowed: AccountRole[]): RequestHandler {
  return (_req: Request, res: Response, next: NextFunction) => {
    const auth = res.locals.auth as AuthContext | undefined;

    if (!auth) return next(new AppError("Authentication required", 401));
    if (!allowed.includes(auth.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
}
