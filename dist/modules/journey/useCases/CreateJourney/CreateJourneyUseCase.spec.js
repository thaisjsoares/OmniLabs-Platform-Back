"use strict";

var _FakeCoursesRepository = _interopRequireDefault(require("../../../courses/repositories/fakes/FakeCoursesRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateJourneyUseCase = _interopRequireDefault(require("./CreateJourneyUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeCoursesRepository;
let createJourney;
describe('Create Journey', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeCoursesRepository = new _FakeCoursesRepository.default();
    createJourney = new _CreateJourneyUseCase.default(fakeJourneyRepository, fakeCoursesRepository);
  });
  it('should be able to create Journey', async () => {
    const course = await fakeCoursesRepository.create({
      name: 'Starter',
      description: 'curso iniciantes'
    });
    const journey = await createJourney.execute({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: course.id
    });
    expect(journey).toHaveProperty('id');
  });
  it('should not be able to create journey whith a non existing course', async () => {
    await expect(createJourney.execute({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: 'non-existing-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create already existent journey', async () => {
    const course = await fakeCoursesRepository.create({
      name: 'Starter',
      description: 'curso iniciantes'
    });
    await createJourney.execute({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: course.id
    });
    await expect(createJourney.execute({
      name: 'Nodejs',
      description: 'Back-End',
      course_id: course.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});