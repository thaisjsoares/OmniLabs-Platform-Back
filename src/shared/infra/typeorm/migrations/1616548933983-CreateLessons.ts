import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateLessons1616548933983 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lessons',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'group_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'duration',
                        type: 'int',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'resource',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'released_at',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'platform',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'lessons',
            new TableForeignKey({
                name: 'LessonsGroup',
                columnNames: ['group_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'groups',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lessons', 'LessonsGroup');

        await queryRunner.dropTable('lessons');
    }
}
