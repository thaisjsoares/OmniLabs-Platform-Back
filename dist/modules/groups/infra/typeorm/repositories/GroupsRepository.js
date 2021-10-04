"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Groups = _interopRequireDefault(require("../entities/Groups"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GroupsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Groups.default);
  }

  async findById(id) {
    const group = await this.ormRepository.findOne(id);
    return group;
  }

  async create(data) {
    const group = await this.ormRepository.create(data);
    await this.ormRepository.save(group);
    return group;
  }

  async save(groups) {
    return this.ormRepository.save(groups);
  }

  async findByJourney(journey_id) {
    const groups = await this.ormRepository.find({
      where: {
        journey_id
      }
    });
    return groups;
  }

  async findAll() {
    const groups = await this.ormRepository.find();
    return groups;
  }

  async remove(group) {
    await this.ormRepository.remove(group);
  }

}

var _default = GroupsRepository;
exports.default = _default;