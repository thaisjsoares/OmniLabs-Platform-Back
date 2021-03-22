import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserIdFieldToLoginLogs1616454795424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'login_log',
            new TableColumn({
              name: 'user_id',
              type: 'uuid',
              isNullable: false
            })
          )
      
          await queryRunner.createForeignKey(
            'login_log',
            new TableForeignKey({
              name: 'UserLogs',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE'
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('login_log', 'UserLogs')

        await queryRunner.dropColumn('login_log', 'user_id')
    }

}
