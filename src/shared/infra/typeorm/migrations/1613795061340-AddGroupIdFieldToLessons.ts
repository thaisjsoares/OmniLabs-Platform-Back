import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddGroupIdFieldToLessons1613795061340 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: false
      })
    )

    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        name: 'LessonsGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lessons', 'LessonsGroup')

    await queryRunner.dropColumn('lessons', 'group_id')
  }
}
