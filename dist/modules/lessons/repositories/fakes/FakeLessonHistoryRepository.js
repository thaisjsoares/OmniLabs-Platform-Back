"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lesson_History = _interopRequireDefault(require("../../infra/typeorm/entities/Lesson_History"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class FakeLessonHistoryRepository {
  constructor() {
    this.lessons = [];
  }

  async findByGroup(group_id) {
    const lesson = this.lessons.filter(lesson => lesson.group_id === group_id);
    return lesson;
  }

  async findByTitle(title) {
    const lesson = this.lessons.find(lesson => lesson.title === title);
    return lesson;
  }

  async findByName(name) {
    const lesson = this.lessons.find(lesson => lesson.name === name);
    return lesson;
  }

  async findById(id) {
    const lesson = this.lessons.find(lesson => lesson.id === id);
    return lesson;
  }

  async create(data) {
    const lesson = new _Lesson_History.default();
    Object.assign(lesson, {
      id: (0, _uuid.v4)()
    }, data);
    this.lessons.push(lesson);
    return lesson;
  }

  async save(lesson) {
    const findIndex = this.lessons.findIndex(findJourney => findJourney.id === lesson.id);
    this.lessons[findIndex] = lesson;
    return lesson;
  }

  async remove(lesson) {
    const findedIndex = this.lessons.findIndex(lessons => lessons.id === lesson.id);
    this.lessons.splice(findedIndex, 1);
  }

}

var _default = FakeLessonHistoryRepository;
exports.default = _default;