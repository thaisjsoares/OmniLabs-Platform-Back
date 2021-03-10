import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddJourneyFieldToLessons1615420170193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'lessons',
            new TableColumn({
                name: 'journey_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'lessons',
            new TableForeignKey({
                name: 'LessonsJourney',
                columnNames: ['journey_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'journey',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lessons', 'LessonsJourney');

        await queryRunner.dropColumn('lessons', 'journey_id');
    }

}
