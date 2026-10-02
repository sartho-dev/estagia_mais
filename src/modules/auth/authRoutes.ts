import { Router } from "express";
import { authController, authenticate } from "../../shared/container";

const authRoutes = Router();

authRoutes.post("/login", authController.loginController.bind(authController));
authRoutes.post("/logout", authenticate, authController.logoutController);

export { authRoutes };
