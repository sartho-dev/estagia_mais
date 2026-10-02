import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1790969876891 implements MigrationInterface {
    name = 'Init1790969876891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sessions_account_type_enum" AS ENUM('student', 'responsible', 'admin')`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_type" "public"."sessions_account_type_enum" NOT NULL, "account_id" uuid NOT NULL, "token_hash" character(64) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "last_used_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_abaa9e068cdd390bc5210f79884" UNIQUE ("token_hash"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7ff13bcc59f4d70924d685708" ON "sessions"  ("account_type", "account_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a7ff13bcc59f4d70924d685708"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TYPE "public"."sessions_account_type_enum"`);
    }

}
