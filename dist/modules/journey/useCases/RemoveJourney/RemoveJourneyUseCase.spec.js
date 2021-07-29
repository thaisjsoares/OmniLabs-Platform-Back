"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../../courses/repositories/fakes/FakeCoursesRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ShowAllJourneysUseCase = _interopRequireDefault(require("../ShowAllJourney/ShowAllJourneysUseCase"));

var _RemoveJourneyUseCase = _interopRequireDefault(require("./RemoveJourneyUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeCoursesRepository;
let removeJourney;
let listJourney;
describe('Remove Journey', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    removeJourney = new _RemoveJourneyUseCase.default(fakeJourneyRepository);
    listJourney = new _ShowAllJourneysUseCase.default(fakeJourneyRepository, fakeCoursesRepository);
  });
  it('should be able to remove journey', async () => {
    const course1 = await fakeCoursesRepository.create({
      description: '123',
      name: 'asdad'
    });
    const journey = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Backend',
      course_id: course1.id
    });
    const journey2 = await fakeJourneyRepository.create({
      name: 'reactjs',
      description: 'Backend',
      course_id: course1.id
    });
    expect(await listJourney.execute()).toEqual([{ ...journey,
      image_url: journey.getAvatarUrl(),
      course_name: course1.name
    }, { ...journey2,
      image_url: journey2.getAvatarUrl(),
      course_name: course1.name
    }]);
    expect(await removeJourney.execute(journey.id)).toMatchObject(journey);
    expect(await listJourney.execute()).toEqual([{ ...journey2,
      image_url: journey2.getAvatarUrl(),
      course_name: course1.name
    }]);
  });
  it('should not be able able to remove a non existing journey', async () => {
    await expect(removeJourney.execute('asd')).rejects.toBeInstanceOf(_AppError.default);
  });
});