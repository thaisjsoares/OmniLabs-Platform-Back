"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificLessonUseCase = void 0;

var _ILessonsRepository = _interopRequireDefault(require("../../repositories/models/ILessonsRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListSpecificLessonUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LessonsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILessonsRepository.default === "undefined" ? Object : _ILessonsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSpecificLessonUseCase {
  constructor(lessonsRepository) {
    this.lessonsRepository = lessonsRepository;
  }

  async execute({
    lesson_id
  }) {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new _AppError.default('Not possible to find lesson');
    }

    return lesson;
  }

}) || _class) || _class) || _class) || _class);
exports.ListSpecificLessonUseCase = ListSpecificLessonUseCase;