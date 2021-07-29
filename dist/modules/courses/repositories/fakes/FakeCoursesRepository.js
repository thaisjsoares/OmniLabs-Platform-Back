"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Courses = _interopRequireDefault(require("../../infra/typeorm/entities/Courses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class FakeCoursesRepository {
  constructor() {
    this.courses = [];
  }

  async remove(course) {
    const findedIndex = this.courses.findIndex(c => c.id === course.id);
    this.courses.splice(findedIndex, 1);
  }

  async findById(id) {
    const findCourse = this.courses.find(course => course.id === id);
    return findCourse;
  }

  async findOneByName(name) {
    const findCourse = this.courses.find(course => course.name === name);
    return findCourse;
  }

  async findAll() {
    return this.courses;
  }

  async save(course) {
    const findIndex = this.courses.findIndex(findCourse => findCourse.id === course.id);
    this.courses[findIndex] = course;
    return course;
  }

  async create(courseData) {
    const course = new _Courses.default();
    Object.assign(course, {
      id: (0, _uuid.v4)()
    }, courseData);
    this.courses.push(course);
    return course;
  }

}

var _default = FakeCoursesRepository;
exports.default = _default;