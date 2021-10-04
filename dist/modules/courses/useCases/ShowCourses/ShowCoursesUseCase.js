"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCoursesUseCase = void 0;

var _ICoursesRepository = _interopRequireDefault(require("../../repositories/models/ICoursesRepository"));

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowCoursesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CoursesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICoursesRepository.default === "undefined" ? Object : _ICoursesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ShowCoursesUseCase {
  constructor(coursesRepository, cacheProvider) {
    this.coursesRepository = coursesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    limit,
    page
  }) {
    const course = await this.coursesRepository.findAll(page, limit);
    return course;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ShowCoursesUseCase = ShowCoursesUseCase;