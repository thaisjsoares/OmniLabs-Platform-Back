import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddJourneyFieldToModules1615560834607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'modules',
            new TableColumn({
                name: 'journey_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'modules',
            new TableForeignKey({
                name: 'ModulesJourney',
                columnNames: ['journey_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'journey',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('modules', 'ModulesJourney');

        await queryRunner.dropColumn('modules', 'journey_id');
    }

}
