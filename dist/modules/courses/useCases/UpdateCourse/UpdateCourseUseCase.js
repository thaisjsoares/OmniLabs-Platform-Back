"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCourseUseCase = void 0;

var _ICoursesRepository = _interopRequireDefault(require("../../repositories/models/ICoursesRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCourseUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CoursesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICoursesRepository.default === "undefined" ? Object : _ICoursesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCourseUseCase {
  constructor(coursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute({
    course_id,
    description,
    name
  }) {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new _AppError.default('Not possible to find course');
    }

    course.name = name;
    course.description = description;
    await this.coursesRepository.save(course);
    return course;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateCourseUseCase = UpdateCourseUseCase;