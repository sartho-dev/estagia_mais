import {
  IAuthAccountProvider,
  LoginAccount,
} from "../interfaces/IAuthAccountProvider";
import { IStudentRepository } from "../../student/interfaces/IStudentRepository";
import { AccountRole } from "../types/AccountRole";

export class StudentAuthProvider implements IAuthAccountProvider {
  readonly role = AccountRole.STUDENT;

  constructor(private students: IStudentRepository) {}

  async findForLogin(email: string): Promise<LoginAccount | null> {
    // RF01: findByEmailWithPassword is the only query that returns the hash,
    // and it only returns active students.
    const student = await this.students.findByEmailWithPassword(email);

    return student
      ? { id: student.id, passwordHash: student.passwordHash }
      : null;
  }

  async isActive(accountId: string): Promise<boolean> {
    return await this.students.existsActiveById(accountId);
  }
}
