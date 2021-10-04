"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Groups = _interopRequireDefault(require("../../infra/typeorm/entities/Groups"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeModulesRepository {
  constructor() {
    this.groups = [];
  }

  async findAll() {
    return this.groups;
  }

  async remove(group) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    const group = this.groups.find(module => module.id === id);
    return group;
  }

  async create(data) {
    const group = new _Groups.default();
    Object.assign(group, {
      id: (0, _uuid.v4)()
    }, data);
    this.groups.push(group);
    return group;
  }

  async save(module) {
    const findIndex = this.groups.findIndex(findJourney => findJourney.id === module.id);
    this.groups[findIndex] = module;
    return module;
  }

  async findByJourney(journey_id) {
    const groups = this.groups.filter(group => group.journey_id === journey_id);
    return groups;
  }

}

var _default = FakeModulesRepository;
exports.default = _default;