import { Router } from "express";
import { studentController } from "../../shared/container";

const studentRoutes = Router();

studentRoutes.post(
  "/",
  studentController.createController.bind(studentController),
);

studentRoutes.post("/login");

export { studentRoutes };
