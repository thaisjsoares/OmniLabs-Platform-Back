"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICoursesRepository = _interopRequireDefault(require("../../../courses/repositories/models/ICoursesRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IJourneyRepository = _interopRequireDefault(require("../../repositories/models/IJourneyRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateJourneyService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('JourneyRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CoursesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IJourneyRepository.default === "undefined" ? Object : _IJourneyRepository.default, typeof _ICoursesRepository.default === "undefined" ? Object : _ICoursesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateJourneyService {
  constructor(journeyRepository, coursesRepository) {
    this.journeyRepository = journeyRepository;
    this.coursesRepository = coursesRepository;
  }

  async execute({
    journey_id,
    description,
    name,
    course_id
  }) {
    const journey = await this.journeyRepository.findById(journey_id);

    if (!journey) {
      throw new _AppError.default('Not possible to find Journey');
    }

    if (course_id) {
      const course = await this.coursesRepository.findById(course_id);

      if (!course) {
        throw new _AppError.default('Not possible to find Course');
      }

      journey.course_id = course_id;
    }

    journey.name = name;
    journey.description = description;
    await this.journeyRepository.save(journey);
    return journey;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateJourneyService;
exports.default = _default;