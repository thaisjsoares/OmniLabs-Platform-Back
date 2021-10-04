"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IRolesRepository = _interopRequireDefault(require("../../repositories/models/IRolesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowRoles = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RolesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRolesRepository.default === "undefined" ? Object : _IRolesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowRoles {
  constructor(rolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  async execute() {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }

}) || _class) || _class) || _class) || _class);
var _default = ShowRoles;
exports.default = _default;