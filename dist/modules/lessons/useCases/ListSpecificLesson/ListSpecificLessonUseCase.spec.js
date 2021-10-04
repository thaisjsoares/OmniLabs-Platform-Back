"use strict";

var _FakeLessonsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLessonsRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ListSpecificLessonUsecase = require("./ListSpecificLessonUsecase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listSpecificLesson;
let fakeLessonsRepository;
describe('List Specific Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new _FakeLessonsRepository.default();
    listSpecificLesson = new _ListSpecificLessonUsecase.ListSpecificLessonUseCase(fakeLessonsRepository);
  });
  it('should be able to list a specific lesson', async () => {
    const lesson = await fakeLessonsRepository.create({
      type: 'video'
    });
    expect(await listSpecificLesson.execute({
      lesson_id: lesson.id
    })).toEqual(lesson);
  });
  it('should not be able to list non existent lesson', async () => {
    await expect(listSpecificLesson.execute({
      lesson_id: 'non-existent-lesson'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});