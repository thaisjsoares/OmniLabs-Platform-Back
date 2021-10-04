"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../repositories/fakes/FakeCoursesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ShowCoursesUseCase = require("./ShowCoursesUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCoursesRepository;
let fakeCacheProvider;
let showCourses;
describe('ShowCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    showCourses = new _ShowCoursesUseCase.ShowCoursesUseCase(fakeCoursesRepository, fakeCacheProvider);
  });
  it('should be able to list courses', async () => {
    const course1 = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'asdasd'
    });
    const course2 = await fakeCoursesRepository.create({
      name: 'explorer',
      description: '123123'
    });
    const courses = await showCourses.execute({
      page: 1,
      limit: 5
    });
    expect(courses).toEqual([course1, course2]);
  });
});