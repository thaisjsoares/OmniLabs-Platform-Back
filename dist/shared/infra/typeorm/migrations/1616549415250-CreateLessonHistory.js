"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateLessonHistory1616549415250 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'lesson_history',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'lesson_id',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'group_id',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'duration',
        type: 'int'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'resource',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'released_at',
        type: 'timestamp with time zone'
      }, {
        name: 'platform',
        type: 'varchar'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'link',
        type: 'varchar',
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
    await queryRunner.createForeignKey('lesson_history', new _typeorm.TableForeignKey({
      name: 'LessonId',
      columnNames: ['lesson_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'lessons',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('lesson_history', new _typeorm.TableForeignKey({
      name: 'LessonsGroup',
      columnNames: ['group_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'groups',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('lesson_history', 'LessonsGroup');
    await queryRunner.dropForeignKey('lesson_history', 'LessonId');
    await queryRunner.dropTable('lesson_history');
  }

}

exports.default = CreateLessonHistory1616549415250;