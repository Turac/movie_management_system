import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTablesCreated1728247595964 implements MigrationInterface {
    name = 'InitialTablesCreated1728247595964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ageRestriction" integer NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_session" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "timeSlot" "public"."movie_session_timeslot_enum" NOT NULL, "roomNumber" integer NOT NULL, "deletedAt" TIMESTAMP, "movieId" integer, CONSTRAINT "PK_89165268c67b40e4452df045629" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "role" "public"."user_role_enum" NOT NULL, "createdDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "purchaseDate" TIMESTAMP NOT NULL, "watched" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_session" ADD CONSTRAINT "FK_6c71f97be5b90aa2527a61f2799" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_f899125e17b829a124a3d66e4a6" FOREIGN KEY ("sessionId") REFERENCES "movie_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_f899125e17b829a124a3d66e4a6"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "movie_session" DROP CONSTRAINT "FK_6c71f97be5b90aa2527a61f2799"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie_session"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
