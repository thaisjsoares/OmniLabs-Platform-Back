"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../entities/User"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;