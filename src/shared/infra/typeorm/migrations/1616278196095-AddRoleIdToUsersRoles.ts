import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class AddRoleIdToUsersRoles1616278196095 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_roles',
      new TableColumn({
        name: 'role_id',
        type: 'uuid',
        isNullable: false
      })
    )

    await queryRunner.createForeignKey(
      'users_roles',
      new TableForeignKey({
        name: 'UsersRoles',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_roles', 'UsersRoles')

    await queryRunner.dropColumn('users_roles', 'role_id')
  }
}
