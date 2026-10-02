import { Router } from "express";
import { studentRoutes } from "./modules/student/studentRoutes";
import { authRoutes } from "./modules/auth/authRoutes";

const routesMain = Router();

routesMain.use("/api/v1/students", studentRoutes);
routesMain.use("/api/v1/auth", authRoutes);

export default routesMain;
