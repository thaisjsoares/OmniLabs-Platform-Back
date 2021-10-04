"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../../courses/repositories/fakes/FakeCoursesRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _UpdateJourneyUseCase = _interopRequireDefault(require("./UpdateJourneyUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeCoursesRepository;
let updateJourney;
describe('Update Journey', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    updateJourney = new _UpdateJourneyUseCase.default(fakeJourneyRepository, fakeCoursesRepository);
  });
  it('should be able to edit Journey', async () => {
    const journey = await fakeJourneyRepository.create({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: '123'
    });
    await updateJourney.execute({
      journey_id: journey.id,
      name: 'Reactjs',
      description: 'Front-end'
    });
    expect(journey.name).toBe('Reactjs');
    expect(journey.description).toBe('Front-end');
  });
  it('should not be able to edit non existing journey', async () => {
    await expect(updateJourney.execute({
      journey_id: 'non-existing-journey-id',
      name: 'non-existing-name',
      description: 'non-existing-description'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update course_id of journey if course non exist', async () => {
    const journey = await fakeJourneyRepository.create({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: '123'
    });
    await expect(updateJourney.execute({
      journey_id: journey.id,
      name: 'Reactjs',
      description: 'Front-end',
      course_id: 'aaaaaa'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});