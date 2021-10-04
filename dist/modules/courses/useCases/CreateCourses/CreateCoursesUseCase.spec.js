"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../repositories/fakes/FakeCoursesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateCoursesUseCase = require("./CreateCoursesUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCoursesRepository;
let fakeCacheProvider;
let createCourse;
describe('CreateCourse', () => {
  beforeEach(() => {
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createCourse = new _CreateCoursesUseCase.CreateCoursesUseCase(fakeCoursesRepository, fakeCacheProvider);
  });
  it('should be able to create a course', async () => {
    const course = await createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    });
    expect(course).toHaveProperty('id');
  });
  it('should not be able to create already existent course', async () => {
    await createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    });
    await expect(createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});