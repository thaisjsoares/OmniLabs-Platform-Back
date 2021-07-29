"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Roles = _interopRequireDefault(require("../entities/Roles"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Roles.default);
  }

  async findByName(name) {
    const role = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return role;
  }

  async findById(id) {
    const role = await this.ormRepository.findOne(id);
    return role;
  }

  async create(roleData) {
    const role = this.ormRepository.create(roleData);
    await this.ormRepository.save(role);
    return role;
  }

  async save(role) {
    return this.ormRepository.save(role);
  }

  async findAll() {
    const roles = await this.ormRepository.find();
    return roles;
  }

  async remove(role) {
    return this.ormRepository.remove(role);
  }

}

var _default = RolesRepository;
exports.default = _default;