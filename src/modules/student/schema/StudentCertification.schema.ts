import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student.schema";

@Entity("student_certifications")
@Index(["studentId"])
export class StudentCertification {
  // RNF09: UUID primary key
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "student_id", type: "uuid" })
  studentId: string;

  @Column({ name: "name", type: "varchar", length: 150 })
  name: string;

  // Who issued it (e.g. "AWS", "Alura", "UFMS")
  @Column({ name: "issuer", type: "varchar", length: 150 })
  issuer: string;

  @Column({ name: "issued_at", type: "date" })
  issuedAt: string; // "YYYY-MM-DD"

  // null = does not expire
  @Column({ name: "expires_at", type: "date", nullable: true })
  expiresAt: string | null;

  @Column({
    name: "credential_url",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  credentialUrl: string | null;

  // RNF08: foreign key constrained in the database
  @ManyToOne(() => Student, (student) => student.certifications, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;
}
