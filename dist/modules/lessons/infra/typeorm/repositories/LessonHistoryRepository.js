"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lesson_History = _interopRequireDefault(require("../entities/Lesson_History"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class LessonHistoryRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Lesson_History.default);
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

  async findByGroup(group_id) {
    const lessons = await this.ormRepository.find({
      where: {
        group_id
      }
    });
    return lessons;
  }

  async findByTitle(title) {
    const lessonHistory = await this.ormRepository.findOne({
      where: {
        title
      }
    });
    return lessonHistory;
  }

  async findByName(name) {
    const lessonHistory = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return lessonHistory;
  }

}

var _default = LessonHistoryRepository;
exports.default = _default;