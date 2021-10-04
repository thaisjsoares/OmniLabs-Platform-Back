"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../repositories/fakes/FakeCoursesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeSotrageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/fakes/FakeSotrageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _UpdateCoursesImageUseCase = require("./UpdateCoursesImageUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCoursesRepository;
let fakeStorageProvider;
let fakeCacheProvider;
let updateCourseImage;
describe('UpdateCourseImage', () => {
  beforeEach(() => {
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    fakeStorageProvider = new _FakeSotrageProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    updateCourseImage = new _UpdateCoursesImageUseCase.UpdateCoursesImageUseCase(fakeCoursesRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to create a new Course', async () => {
    const course = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'iniciando na programacao'
    });
    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image.png'
    });
    expect(course.image).toBe('image.png');
  });
  it('should not be able to update image from non existing course', async () => {
    await expect(updateCourseImage.execute({
      course_id: 'non-existing-course',
      imageFileName: 'image.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const course = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'iniciando na programacao'
    });
    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image.jpg'
    });
    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('image.jpg');
    expect(course.image).toBe('image2.jpg');
  });
});