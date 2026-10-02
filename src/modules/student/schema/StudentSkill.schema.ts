import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student.schema";

// Free-text skill shown on the student's profile (and to companies that
// received the student's application). Duplicates per student are blocked by
// the validator (case-insensitive) and by the composite index below.
@Entity("student_skills")
@Index(["studentId", "name"], { unique: true })
export class StudentSkill {
  // RNF09: UUID primary key
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "student_id", type: "uuid" })
  studentId: string;

  @Column({ name: "name", type: "varchar", length: 50 })
  name: string;

  // RNF08: foreign key constrained in the database
  @ManyToOne(() => Student, (student) => student.skills, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;
}
