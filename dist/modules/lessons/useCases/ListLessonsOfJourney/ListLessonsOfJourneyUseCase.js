"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLessonOfCourseUseCase = void 0;

var _IGroupsRepository = _interopRequireDefault(require("../../../groups/repositories/models/IGroupsRepository"));

var _IJourneyRepository = _interopRequireDefault(require("../../../journey/repositories/models/IJourneyRepository"));

var _ILessonHistoryRepository = _interopRequireDefault(require("../../repositories/models/ILessonHistoryRepository"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListLessonOfCourseUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LessonHistoryRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('GroupsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('JourneyRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ILessonHistoryRepository.default === "undefined" ? Object : _ILessonHistoryRepository.default, typeof _IGroupsRepository.default === "undefined" ? Object : _IGroupsRepository.default, typeof _IJourneyRepository.default === "undefined" ? Object : _IJourneyRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListLessonOfCourseUseCase {
  constructor(lessonHistoryRepository, groupsRepository, journeyRepository) {
    this.lessonHistoryRepository = lessonHistoryRepository;
    this.groupsRepository = groupsRepository;
    this.journeyRepository = journeyRepository;
  }

  async execute({
    journey_name
  }) {
    const journey = await this.journeyRepository.findByName(journey_name);

    if (!journey) {
      throw new _AppError.default('Not possible to find Journey');
    }

    const groups = await this.groupsRepository.findByJourney(journey.id);
    const groupsLessons = await Promise.all(groups.map(async group => {
      const lessons = await this.lessonHistoryRepository.findByGroup(group.id);
      const formatedLessons = lessons.map(lesson => {
        const minutes = Math.floor(lesson.duration / 60);
        const seconds = lesson.duration - minutes * 60;
        return { ...lesson,
          duration: (0, _dateFns.format)(new Date(0, 0, 0, 0, minutes, seconds), "mm 'min', ss 's'")
        };
      });
      return {
        group,
        lessons: formatedLessons
      };
    }));
    return groupsLessons;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ListLessonOfCourseUseCase = ListLessonOfCourseUseCase;