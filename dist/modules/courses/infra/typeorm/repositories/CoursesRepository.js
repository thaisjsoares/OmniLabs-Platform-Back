"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Courses = _interopRequireDefault(require("../entities/Courses"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Courses.default);
  }

  async findById(id) {
    const courses = await this.ormRepository.findOne(id);
    return courses;
  }

  async findAll(page, limit) {
    const courses = await this.ormRepository.createQueryBuilder('courses').limit(limit).offset((page - 1) * limit).getMany();
    return courses;
  }

  async create(courseData) {
    const course = await this.ormRepository.create(courseData);
    await this.ormRepository.save(course);
    return course;
  }

  async save(courses) {
    return this.ormRepository.save(courses);
  }

  async findOneByName(name) {
    return this.ormRepository.findOne({
      where: {
        name
      }
    });
  }

  async remove(course) {
    await this.ormRepository.remove(course);
  }

}

var _default = UsersRepository;
exports.default = _default;