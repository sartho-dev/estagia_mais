import { StudentController } from "../../modules/student/controller/StudentController";
import { StudentRepository } from "../../modules/student/repository/StudentRepository";
import { StudentService } from "../../modules/student/service/StudentService";
import { AppDataSource } from "../database/data-source";
import { Student } from "../../modules/student/schema/Student.schema";
import { AuthService } from "../../modules/auth/service/AuthService";
import { StudentAuthProvider } from "../../modules/auth/providers/StudentAuthProvider";
import { SessionRepository } from "../../modules/auth/repository/SessionRepository";
import { Session } from "../../modules/auth/schema/Session.schema";
import { AuthController } from "../../modules/auth/controller/AuthController";
import { makeAuthenticate } from "../../modules/auth/middleware/authenticate";

export type Container = ReturnType<typeof buildContainer>;

export function buildContainer() {
  const studentRepository = new StudentRepository(
    AppDataSource.getRepository(Student),
  );
  const studentService = new StudentService(studentRepository);
  const studentController = new StudentController(studentService);

  // When the responsible / admin modules exist, add their providers to this array.
  const authService = new AuthService(
    [new StudentAuthProvider(studentRepository)],
    new SessionRepository(AppDataSource.getRepository(Session)),
  );

  const authController = new AuthController(authService);
  const authenticate = makeAuthenticate(authService);

  return { studentController, authController, authenticate };
}
