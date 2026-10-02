import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student.schema";

@Entity("student_experiences")
@Index(["studentId"])
export class StudentExperience {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "student_id", type: "uuid" })
  studentId: string;

  @Column({ name: "company", type: "varchar", length: 150 })
  company: string;

  @Column({ name: "role", type: "varchar", length: 100 })
  role: string;

  @Column({ name: "start_date", type: "date" })
  startDate: string; // "YYYY-MM-DD"

  // null = experiência atual
  @Column({ name: "end_date", type: "date", nullable: true })
  endDate: string | null;

  @Column({ name: "description", type: "text", nullable: true })
  description: string | null;

  @ManyToOne(() => Student, (student) => student.experiences, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;
}
