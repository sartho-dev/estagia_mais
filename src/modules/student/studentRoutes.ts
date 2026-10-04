import { Router } from "express";
import { Container } from "../../shared/container";

export function studentRoutes(container: Container): Router {
  const router = Router();

  router.post(
    "/",
    container.studentController.createController.bind(
      container.studentController,
    ),
  );

  router.patch(
    "/",
    container.authenticate,
    container.studentController.updateController.bind(
      container.studentController,
    ),
  );

  return router;
}
