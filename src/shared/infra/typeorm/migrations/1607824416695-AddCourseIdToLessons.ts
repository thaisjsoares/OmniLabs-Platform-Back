import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey,} from "typeorm";

export default class AddCourseIdToLessons1607824416695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'lessons',
            new TableColumn({
                name: 'course_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'lessons',
            new TableForeignKey({
                name: 'LessonsCourse',
                columnNames: ['course_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lessons', 'LessonsCourse');

        await queryRunner.dropColumn('lessons', 'course_id');
    }

}
