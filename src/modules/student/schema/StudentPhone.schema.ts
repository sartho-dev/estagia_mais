import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student.schema";

// Section 6.2: phone numbers are multivalued in the ERD and therefore live
// in their own table.
@Entity("student_phones")
export class StudentPhone {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "number", type: "varchar", length: 20 })
  number: string;

  // RNF08: every foreign key is constrained at the database level.
  // The column name below must stay in sync with the @Column("student_id")
  // declaration — if they diverge, TypeORM silently creates two columns.
  @ManyToOne(() => Student, (student) => student.phones, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column({ name: "student_id", type: "uuid" })
  studentId: string;
}
