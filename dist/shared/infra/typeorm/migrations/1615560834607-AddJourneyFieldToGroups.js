"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddJourneyFieldToGroups1615560834607 {
  async up(queryRunner) {
    await queryRunner.addColumn('groups', new _typeorm.TableColumn({
      name: 'journey_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('groups', new _typeorm.TableForeignKey({
      name: 'GroupsJourney',
      columnNames: ['journey_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'journey',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('groups', 'GroupsJourney');
    await queryRunner.dropColumn('groups', 'journey_id');
  }

}

exports.default = AddJourneyFieldToGroups1615560834607;