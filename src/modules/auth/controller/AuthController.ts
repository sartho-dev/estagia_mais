import { Request, Response } from "express";
import { AuthService, LoginResult } from "../service/AuthService";
import { loginSchema } from "../validators/LoginValidator";
import { getAuth } from "../types/AccountRole";
import { ApiResponse } from "../../../shared/types/ApiResponse";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";

export class AuthController {
  constructor(private authService: AuthService) {}

  // RF01
  loginController = asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const result = await this.authService.login(data);

    const response: ApiResponse<LoginResult> = {
      status: "success",
      data: result,
    };

    // The body carries a credential: never let a proxy or browser cache it.
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(response);
  });

  // RF01: requires `authenticate` on the route
  logoutController = asyncHandler(async (_req: Request, res: Response) => {
    await this.authService.logout(getAuth(res).sessionId);

    res.status(204).send();
  });
}
