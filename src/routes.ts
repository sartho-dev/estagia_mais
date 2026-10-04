// routes/index.ts
import { Router } from "express";
import { studentRoutes } from "./modules/student/studentRoutes";
import { authRoutes } from "./modules/auth/authRoutes";
import { Container } from "./shared/container";

export default function routesMain(container: Container): Router {
  const router = Router();

  router.use("/api/v1/students", studentRoutes(container));
  router.use("/api/v1/auth", authRoutes(container));

  return router;
}
