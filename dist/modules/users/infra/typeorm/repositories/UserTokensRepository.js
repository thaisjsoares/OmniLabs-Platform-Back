"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.ormRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const usersTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token
    });
    return usersTokens;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = await this.ormRepository.findOne({
      refresh_token
    });
    return userToken;
  }

}

var _default = UserTokensRepository;
exports.default = _default;