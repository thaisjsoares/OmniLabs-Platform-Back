"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLessonUseCase = void 0;

var _IGroupsRepository = _interopRequireDefault(require("../../../groups/repositories/models/IGroupsRepository"));

var _ILessonHistoryRepository = _interopRequireDefault(require("../../repositories/models/ILessonHistoryRepository"));

var _ILessonsRepository = _interopRequireDefault(require("../../repositories/models/ILessonsRepository"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateLessonUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LessonsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('GroupsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('LessonHistoryRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ILessonsRepository.default === "undefined" ? Object : _ILessonsRepository.default, typeof _IGroupsRepository.default === "undefined" ? Object : _IGroupsRepository.default, typeof _ILessonHistoryRepository.default === "undefined" ? Object : _ILessonHistoryRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateLessonUseCase {
  constructor(lessonsRepository, groupsRepository, lessonHistoryRepository) {
    this.lessonsRepository = lessonsRepository;
    this.groupsRepository = groupsRepository;
    this.lessonHistoryRepository = lessonHistoryRepository;
  }

  async execute({
    type,
    group_id,
    title,
    duration,
    description,
    resource,
    released_at,
    platform,
    name,
    link
  }) {
    const formatedDate = (0, _dateFns.startOfHour)(new Date(released_at));

    if ((0, _dateFns.isBefore)(formatedDate, Date.now())) {
      throw new _AppError.default("You can't create an lesson on a past date.");
    }

    const group = await this.groupsRepository.findById(group_id);

    if (!group) {
      throw new _AppError.default('Not possible to find a Module');
    }

    const findLessonTitle = await this.lessonHistoryRepository.findByTitle(title);
    const findLessonName = await this.lessonHistoryRepository.findByName(name);

    if (findLessonName || findLessonTitle) {
      throw new _AppError.default('This lesson already exists');
    }

    const lesson = await this.lessonsRepository.create({
      type
    });
    const lessonHistory = await this.lessonHistoryRepository.create({
      lesson_id: lesson.id,
      group_id,
      title,
      duration,
      description,
      resource,
      released_at: formatedDate,
      platform,
      name,
      link
    });
    return lessonHistory;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateLessonUseCase = CreateLessonUseCase;