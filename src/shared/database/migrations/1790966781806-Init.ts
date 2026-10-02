import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1790966781806 implements MigrationInterface {
    name = 'Init1790966781806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."student_languages_level_enum" AS ENUM('basic', 'intermediate', 'advanced', 'fluent', 'native')`);
        await queryRunner.query(`CREATE TABLE "student_languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "name" character varying(50) NOT NULL, "level" "public"."student_languages_level_enum" NOT NULL, CONSTRAINT "PK_cff1d78022efe3784e4e6bbfdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_experiences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "company" character varying(150) NOT NULL, "role" character varying(100) NOT NULL, "start_date" date NOT NULL, "end_date" date, "description" text, CONSTRAINT "PK_645a378a14fecb87619f5419545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0298b367434cf656063999c32f" ON "student_experiences"  ("student_id") `);
        await queryRunner.query(`CREATE TABLE "student_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_7bf130eeaf4dcf90221ed38d1a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3ab47e922871ad9dba24eb88ef" ON "student_skills"  ("student_id", "name") `);
        await queryRunner.query(`CREATE TABLE "student_certifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "name" character varying(150) NOT NULL, "issuer" character varying(150) NOT NULL, "issued_at" date NOT NULL, "expires_at" date, "credential_url" character varying(255), CONSTRAINT "PK_d085ad31f296c4d55c5e999a376" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_64f9e9acf807806c725e61fa9f" ON "student_certifications"  ("student_id") `);
        await queryRunner.query(`ALTER TABLE "students" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "students" ADD "linkedin_url" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "portfolio_url" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "expected_graduation" character(7)`);
        await queryRunner.query(`ALTER TABLE "students" ADD "current_semester" smallint`);
        await queryRunner.query(`ALTER TABLE "students" ADD "institution" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "student_languages" ADD CONSTRAINT "FK_cbe3efecadbcdfb36d9326a41be" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_experiences" ADD CONSTRAINT "FK_0298b367434cf656063999c32f8" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_skills" ADD CONSTRAINT "FK_6cdb9b295520747eb357461dfaf" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_certifications" ADD CONSTRAINT "FK_64f9e9acf807806c725e61fa9f9" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_certifications" DROP CONSTRAINT "FK_64f9e9acf807806c725e61fa9f9"`);
        await queryRunner.query(`ALTER TABLE "student_skills" DROP CONSTRAINT "FK_6cdb9b295520747eb357461dfaf"`);
        await queryRunner.query(`ALTER TABLE "student_experiences" DROP CONSTRAINT "FK_0298b367434cf656063999c32f8"`);
        await queryRunner.query(`ALTER TABLE "student_languages" DROP CONSTRAINT "FK_cbe3efecadbcdfb36d9326a41be"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "institution"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "current_semester"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "expected_graduation"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "portfolio_url"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "linkedin_url"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "bio"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f9e9acf807806c725e61fa9f"`);
        await queryRunner.query(`DROP TABLE "student_certifications"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ab47e922871ad9dba24eb88ef"`);
        await queryRunner.query(`DROP TABLE "student_skills"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0298b367434cf656063999c32f"`);
        await queryRunner.query(`DROP TABLE "student_experiences"`);
        await queryRunner.query(`DROP TABLE "student_languages"`);
        await queryRunner.query(`DROP TYPE "public"."student_languages_level_enum"`);
    }

}
