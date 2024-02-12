import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUser1707583669132 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
          "id" uuid NOT NULL,
          "name" varchar(255) NOT NULL,
          "email" varchar(255) UNIQUE NOT NULL,
          "password" varchar(255) NOT NULL,
          "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "users";
      `);
  }

}
