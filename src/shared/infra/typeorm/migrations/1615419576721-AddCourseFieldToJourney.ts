import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class AddCourseFieldToJourney1615419576721 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'journey',
      new TableColumn({
        name: 'course_id',
        type: 'uuid',
        isNullable: false
      })
    )

    await queryRunner.createForeignKey(
      'journey',
      new TableForeignKey({
        name: 'JourneyCourse',
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('journey', 'JourneyCourse')

    await queryRunner.dropColumn('journey', 'course_id')
  }
}
