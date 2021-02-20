import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddModuleIdFieldToLessons1613795061340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'lessons',
            new TableColumn({
                name: 'module_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'lessons',
            new TableForeignKey({
                name: 'LessonsModule',
                columnNames: ['module_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'modules',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lessons', 'LessonsModule');

        await queryRunner.dropColumn('lessons', 'module_id');
    }

}
