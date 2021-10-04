"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowGroupsUseCase = void 0;

var _IGroupsRepository = _interopRequireDefault(require("../../repositories/models/IGroupsRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowGroupsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GroupsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGroupsRepository.default === "undefined" ? Object : _IGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowGroupsUseCase {
  constructor(groupsRepository) {
    this.groupsRepository = groupsRepository;
  }

  async execute() {
    const groups = await this.groupsRepository.findAll();
    return groups;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowGroupsUseCase = ShowGroupsUseCase;