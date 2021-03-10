import {MigrationInterface, QueryRunner} from "typeorm";

export default class RemoveCourseToLessons1615420087505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('lessons', 'course_id');

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
