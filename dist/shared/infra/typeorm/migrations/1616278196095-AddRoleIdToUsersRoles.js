"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddRoleIdToUsersRoles1616278196095 {
  async up(queryRunner) {
    await queryRunner.addColumn('users_roles', new _typeorm.TableColumn({
      name: 'role_id',
      type: 'uuid',
      isNullable: false
    }));
    await queryRunner.createForeignKey('users_roles', new _typeorm.TableForeignKey({
      name: 'UsersRoles',
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('users_roles', 'UsersRoles');
    await queryRunner.dropColumn('users_roles', 'role_id');
  }

}

exports.default = AddRoleIdToUsersRoles1616278196095;