"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCoursesImageUseCase = void 0;

var _ICoursesRepository = _interopRequireDefault(require("../../repositories/models/ICoursesRepository"));

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IStorageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCoursesImageUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CoursesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ICoursesRepository.default === "undefined" ? Object : _ICoursesRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateCoursesImageUseCase {
  constructor(coursesRepository, storageProvider, cacheProvider) {
    this.coursesRepository = coursesRepository;
    this.storageProvider = storageProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    course_id,
    imageFileName
  }) {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new _AppError.default('This courses does not exist');
    }

    await this.cacheProvider.invalidate('courses-list');

    if (course.image) {
      await this.storageProvider.deleteFile(course.image);
    }

    const filename = await this.storageProvider.saveFile(imageFileName);
    course.image = filename;
    await this.coursesRepository.save(course);
    return course;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UpdateCoursesImageUseCase = UpdateCoursesImageUseCase;