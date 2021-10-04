"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class FakeUserTokensRepository {
  constructor() {
    this.userTokens = [];
  }

  create({
    expires_date,
    refresh_token,
    user_id
  }) {
    throw new Error('Method not implemented.');
  }

  findByUserIdAndRefreshToken(user_id, refresh_token) {
    throw new Error('Method not implemented.');
  }

  deleteById(id) {
    throw new Error('Method not implemented.');
  }

  findByRefreshToken(refresh_token) {
    throw new Error('Method not implemented.');
  }

  async generate(user_id) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuid.v4)(),
      token: (0, _uuid.v4)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = this.userTokens.find(findToken => findToken.refresh_token === token);
    return userToken;
  }

}

var _default = FakeUserTokensRepository;
exports.default = _default;