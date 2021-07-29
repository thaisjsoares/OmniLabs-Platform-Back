"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddCourseFieldToJourney1615419576721 {
  async up(queryRunner) {
    await queryRunner.addColumn('journey', new _typeorm.TableColumn({
      name: 'course_id',
      type: 'uuid',
      isNullable: false
    }));
    await queryRunner.createForeignKey('journey', new _typeorm.TableForeignKey({
      name: 'JourneyCourse',
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('journey', 'JourneyCourse');
    await queryRunner.dropColumn('journey', 'course_id');
  }

}

exports.default = AddCourseFieldToJourney1615419576721;