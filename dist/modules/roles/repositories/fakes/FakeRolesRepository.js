"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Roles = _interopRequireDefault(require("../../infra/typeorm/entities/Roles"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
class FakeRolesRepository {
  constructor() {
    this.roles = [];
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  remove(role) {
    throw new Error('Method not implemented.');
  }

  async findByName(name) {
    const role = this.roles.find(role => role.name === name);
    return role;
  }

  async findById(id) {
    const role = this.roles.find(role => role.id === id);
    return role;
  }

  async create(data) {
    const role = new _Roles.default();
    Object.assign(role, {
      id: (0, _uuid.v4)()
    }, data);
    this.roles.push(role);
    return role;
  }

  async save(role) {
    const findIndex = this.roles.findIndex(findJourney => findJourney.id === role.id);
    this.roles[findIndex] = role;
    return role;
  }

}

var _default = FakeRolesRepository;
exports.default = _default;