"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsersRoles1616267548361 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_roles',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('users_roles', new _typeorm.TableForeignKey({
      name: 'UserRole',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('users_roles', 'UserRole');
    await queryRunner.dropTable('users_roles');
  }

}

exports.default = CreateUsersRoles1616267548361;