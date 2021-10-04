"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteGroupUseCase = void 0;

var _IGroupsRepository = _interopRequireDefault(require("../../repositories/models/IGroupsRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteGroupUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GroupsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGroupsRepository.default === "undefined" ? Object : _IGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteGroupUseCase {
  constructor(groupsRepository) {
    this.groupsRepository = groupsRepository;
  }

  async execute({
    group_id
  }) {
    const group = await this.groupsRepository.findById(group_id);

    if (!group) {
      throw new _AppError.default('Not possible to find group');
    }

    await this.groupsRepository.remove(group);
  }

}) || _class) || _class) || _class) || _class);
exports.DeleteGroupUseCase = DeleteGroupUseCase;