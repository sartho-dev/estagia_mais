import bcrypt from "bcrypt";
import { AppError } from "../../../shared/errors/AppError";
import { IStudentRepository } from "../interfaces/IStudentRepository";
import { CreateStudentInput } from "../validators/CreateStudentValidator";

// RNF01: bcrypt with cost 12 minimum
const BCRYPT_COST = 12;

export type StudentCreatedResult = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  birthDate: string;
  // RF03: one or more phone numbers are required at sign-up
  phones: string[];
};

export class StudentService {
  // Depends on the interface, not on the TypeORM implementation.
  constructor(private repository: IStudentRepository) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_COST);
  }

  async createService(data: CreateStudentInput): Promise<StudentCreatedResult> {
    // RN06: friendly early answer. The database unique constraint (translated
    // to a 409 in the repository) covers the simultaneous-request case.
    if (await this.repository.existsByEmail(data.email)) {
      throw new AppError("Email already in use", 409);
    }

    if (await this.repository.existsByCpf(data.cpf)) {
      throw new AppError("CPF already in use", 409);
    }

    const passwordHash = await this.hashPassword(data.password);

    // RF03 / RNF03: the consent moment is recorded by the server, never taken
    // from the client. The validator already guarantees both flags are true.
    const acceptedAt = new Date();

    const student = await this.repository.create({
      cpf: data.cpf,
      name: data.name,
      email: data.email,
      passwordHash,
      birthDate: data.birthDate,
      phones: data.phones,
      termsAcceptedAt: acceptedAt,
      privacyAcceptedAt: acceptedAt,
    });

    return {
      id: student.id,
      cpf: student.cpf,
      name: student.name,
      email: student.email,
      birthDate: student.birthDate,
      phones: student.phones.map((phone) => phone.number),
    };
  }
}
