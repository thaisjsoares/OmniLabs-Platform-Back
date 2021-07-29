"use strict";

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _ShowJourneysOfCourseUseCase = _interopRequireDefault(require("./ShowJourneysOfCourseUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let showJourneysOfCourse;
describe('Show journeys of Course', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    showJourneysOfCourse = new _ShowJourneysOfCourseUseCase.default(fakeJourneyRepository);
  });
  it('should be able to show journeys of course', async () => {
    const journey1 = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: '123'
    });
    const journey2 = await fakeJourneyRepository.create({
      name: 'ReactJs',
      description: 'Front-end',
      course_id: '123'
    });
    await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: '456'
    });
    expect(await showJourneysOfCourse.execute('123')).toEqual([journey1, journey2]);
  });
});