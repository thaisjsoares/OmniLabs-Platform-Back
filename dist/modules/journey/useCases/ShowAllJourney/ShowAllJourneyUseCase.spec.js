"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../../courses/repositories/fakes/FakeCoursesRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _ShowAllJourneysUseCase = _interopRequireDefault(require("./ShowAllJourneysUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeCoursesRepository;
let showAllJourneys;
describe('List All Journey', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    showAllJourneys = new _ShowAllJourneysUseCase.default(fakeJourneyRepository, fakeCoursesRepository);
  });
  it('should be able to list all Journeys', async () => {
    const course1 = await fakeCoursesRepository.create({
      description: 'asd',
      name: '123'
    });
    const journey1 = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: course1.id
    });
    const journey2 = await fakeJourneyRepository.create({
      name: 'ReactJs',
      description: 'Front-end',
      course_id: course1.id
    });
    expect(await showAllJourneys.execute()).toEqual([{ ...journey1,
      image_url: journey1.getAvatarUrl(),
      course_name: course1.name
    }, { ...journey2,
      image_url: journey1.getAvatarUrl(),
      course_name: course1.name
    }]);
  });
});