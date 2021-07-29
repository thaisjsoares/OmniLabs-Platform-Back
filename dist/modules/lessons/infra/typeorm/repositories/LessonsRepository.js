"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lessons = _interopRequireDefault(require("../entities/Lessons"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class LessonsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Lessons.default);
  }

  async findById(id) {
    const lesson = await this.ormRepository.findOne(id);
    return lesson;
  }

  async create(data) {
    const lesson = await this.ormRepository.create(data);
    await this.ormRepository.save(lesson);
    return lesson;
  }

  async save(lesson) {
    return this.ormRepository.save(lesson);
  }

  async remove(lesson) {
    await this.ormRepository.remove(lesson);
  }

}

var _default = LessonsRepository;
exports.default = _default;