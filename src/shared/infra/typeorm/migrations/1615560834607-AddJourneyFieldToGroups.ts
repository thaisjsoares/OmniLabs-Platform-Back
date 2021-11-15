import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddJourneyFieldToGroups1615560834607
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'groups',
            new TableColumn({
                name: 'journey_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'groups',
            new TableForeignKey({
                name: 'GroupsJourney',
                columnNames: ['journey_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'journey',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('groups', 'GroupsJourney');

        await queryRunner.dropColumn('groups', 'journey_id');
    }
}
