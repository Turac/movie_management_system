import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTablesCreated1728072536890 implements MigrationInterface {
  name = 'InitialTablesCreated1728072536890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "role" "public"."user_role_enum" NOT NULL, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ageRestriction" integer NOT NULL, "sessions" json NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
