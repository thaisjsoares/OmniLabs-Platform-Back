"use strict";

var _FakeGroupsRepository = _interopRequireDefault(require("../../../groups/repositories/fakes/FakeGroupsRepository"));

var _FakeLessonHistoryRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLessonHistoryRepository"));

var _FakeLessonsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLessonsRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateLessonUseCase = require("./CreateLessonUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createLesson;
let fakeLessonsRepository;
let fakeGroupsRepository;
let fakeLessonHistoryRepository;
describe('Create Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new _FakeLessonsRepository.default();
    fakeGroupsRepository = new _FakeGroupsRepository.default();
    fakeLessonHistoryRepository = new _FakeLessonHistoryRepository.default();
    createLesson = new _CreateLessonUseCase.CreateLessonUseCase(fakeLessonsRepository, fakeGroupsRepository, fakeLessonHistoryRepository);
  });
  it('should be able to create lesson', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'Iniciando no Nodejs',
      description: 'módulo iniciação em node',
      journey_id: 'journey_id'
    });
    const lesson = await createLesson.execute({
      type: 'video',
      title: 'Video VsCode',
      name: 'vide-vs-code',
      resource: '12314124',
      released_at: '3000/01/20',
      platform: 'vimeo',
      description: 'desc',
      duration: 12000,
      group_id: group.id
    });
    expect(lesson).toHaveProperty('id');
  });
  it('should not be able to create lesson if group non exists', async () => {
    await expect(createLesson.execute({
      type: 'video',
      title: 'Video VsCode',
      name: 'vide-vs-code',
      resource: '12314124',
      released_at: '3000/01/20',
      platform: 'vimeo',
      description: 'desc',
      duration: 12000,
      group_id: '8345bb5c-6c67-4a6a-9f3d-40bcd45b4104'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create lesson if lesson name or title already exists', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'Iniciando no Nodejs',
      description: 'módulo iniciação em node',
      journey_id: 'journey_id'
    });
    await createLesson.execute({
      type: 'video',
      title: 'Video VsCode',
      name: 'vide-vs-code',
      resource: '12314124',
      released_at: '3000/01/20',
      platform: 'vimeo',
      description: 'desc',
      duration: 12000,
      group_id: group.id
    });
    await expect(createLesson.execute({
      type: 'video',
      title: 'Video VsCode',
      name: 'vide-vs-code',
      resource: '12314124',
      released_at: '3000/01/20',
      platform: 'vimeo',
      description: 'desc',
      duration: 12000,
      group_id: group.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});