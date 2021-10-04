"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRole = _interopRequireDefault(require("../entities/UserRole"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRoleRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserRole.default);
  }

  async findByUserId(user_id) {
    const userRole = await this.ormRepository.findOne({
      where: {
        user_id
      }
    });
    return userRole;
  }

}

var _default = UserRoleRepository;
exports.default = _default;