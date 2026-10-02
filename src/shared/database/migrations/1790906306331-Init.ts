import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1790906306331 implements MigrationInterface {
    name = 'Init1790906306331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying(20) NOT NULL, "student_id" uuid NOT NULL, CONSTRAINT "PK_790ec7487beab97ca7c6e35da4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character(11) NOT NULL, "name" character varying(150) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "birth_date" date NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "terms_accepted_at" TIMESTAMP WITH TIME ZONE NOT NULL, "privacy_accepted_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_f6fb3427bdbd16321776573d176" UNIQUE ("cpf"), CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student_phones" ADD CONSTRAINT "FK_29fe49b4292565878ea76ac67b2" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_phones" DROP CONSTRAINT "FK_29fe49b4292565878ea76ac67b2"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "student_phones"`);
    }

}
