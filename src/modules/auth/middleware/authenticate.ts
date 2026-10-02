import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { AuthService } from "../service/AuthService";

// Expects:  Authorization: Bearer <token>
// On success, the account is available through getAuth(res).
export function makeAuthenticate(authService: AuthService): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [scheme, token] = (req.headers.authorization ?? "").split(" ");

      if (scheme?.toLowerCase() !== "bearer" || !token) {
        throw new AppError("Authentication required", 401);
      }

      res.locals.auth = await authService.authenticate(token);
      next();
    } catch (error) {
      next(error);
    }
  };
}
