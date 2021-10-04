"use strict";

var _FakeGroupsRepository = _interopRequireDefault(require("../../../groups/repositories/fakes/FakeGroupsRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../../journey/repositories/fakes/FakeJourneyRepository"));

var _FakeLessonHistoryRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLessonHistoryRepository"));

var _FakeLessonsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLessonsRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateLessonUseCase = require("../CreateLesson/CreateLessonUseCase");

var _ListLessonsOfJourneyUseCase = require("./ListLessonsOfJourneyUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeLessonHistoryRepository;
let fakeLessonsRepository;
let fakeJourneyRepository;
let fakeGroupsRepository;
let listLessonsOfJourney;
let createLesson;
describe('List Lessons of Journey', () => {
  beforeEach(() => {
    fakeLessonHistoryRepository = new _FakeLessonHistoryRepository.default();
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeGroupsRepository = new _FakeGroupsRepository.default();
    fakeLessonsRepository = new _FakeLessonsRepository.default();
    listLessonsOfJourney = new _ListLessonsOfJourneyUseCase.ListLessonOfCourseUseCase(fakeLessonHistoryRepository, fakeGroupsRepository, fakeJourneyRepository);
    createLesson = new _CreateLessonUseCase.CreateLessonUseCase(fakeLessonsRepository, fakeGroupsRepository, fakeLessonHistoryRepository);
  });
  it('should be able to list lessons of journey', async () => {
    const journey = await fakeJourneyRepository.create({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: 'course_id'
    });
    const group1 = await fakeGroupsRepository.create({
      name: 'nodeJs module 1',
      description: 'múdulo sobre node',
      journey_id: journey.id
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
      group_id: group1.id
    });
    const lesson2 = await createLesson.execute({
      type: 'video',
      title: 'Video reactjs',
      name: 'vide-react-js',
      resource: '12314124',
      released_at: '3000/01/20',
      platform: 'vimeo',
      description: 'desc',
      duration: 12000,
      group_id: group1.id
    });
    const listLessons = await listLessonsOfJourney.execute({
      journey_name: 'Nodejs'
    });
    expect(listLessons).toEqual([{
      group: group1,
      lessons: [{
        id: lesson.id,
        lesson_id: lesson.lesson_id,
        link: lesson.link,
        title: 'Video VsCode',
        name: 'vide-vs-code',
        resource: '12314124',
        released_at: new Date('3000/01/20'),
        platform: 'vimeo',
        description: 'desc',
        duration: '20 min, 00 s',
        group_id: group1.id
      }, {
        id: lesson2.id,
        lesson_id: lesson2.lesson_id,
        link: lesson2.link,
        title: 'Video reactjs',
        name: 'vide-react-js',
        resource: '12314124',
        released_at: new Date('3000/01/20'),
        platform: 'vimeo',
        description: 'desc',
        duration: '20 min, 00 s',
        group_id: group1.id
      }]
    }]);
  });
  it('should not be able to find journey if jouney_name non exists', async () => {
    await expect(listLessonsOfJourney.execute({
      journey_name: 'Nodejs'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});