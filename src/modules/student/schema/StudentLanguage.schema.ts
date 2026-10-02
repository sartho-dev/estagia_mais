import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student.schema";

export enum LanguageLevel {
  BASIC = "basic",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  FLUENT = "fluent",
  NATIVE = "native",
}

@Entity("student_languages")
export class StudentLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "student_id", type: "uuid" })
  studentId: string;

  @Column({ name: "name", type: "varchar", length: 50 })
  name: string;

  @Column({
    name: "level",
    type: "enum",
    enum: LanguageLevel,
  })
  level: LanguageLevel;

  @ManyToOne(() => Student, (student) => student.languages, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;
}
