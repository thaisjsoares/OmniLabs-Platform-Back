"use strict";

var _FakeGroupsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeGroupsRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../../journey/repositories/fakes/FakeJourneyRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ShowGroupsOfJourneyUseCase = require("./ShowGroupsOfJourneyUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeGroupsRepository;
let showGroupsOfJourney;
describe('Show groups of joourney', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeGroupsRepository = new _FakeGroupsRepository.default();
    showGroupsOfJourney = new _ShowGroupsOfJourneyUseCase.ShowGroupsOfJourneyUseCase(fakeGroupsRepository, fakeJourneyRepository);
  });
  it('Should be able to list groups of a journey', async () => {
    const journey = await fakeJourneyRepository.create({
      course_id: 'course_id',
      description: 'description test',
      name: 'joureny-test'
    });
    const group1 = await fakeGroupsRepository.create({
      description: 'group1',
      journey_id: journey.id,
      name: 'group1'
    });
    const group2 = await fakeGroupsRepository.create({
      description: 'group2',
      journey_id: journey.id,
      name: 'group2'
    });
    const groups = await showGroupsOfJourney.execute({
      journey_id: journey.id
    });
    expect(groups).toEqual([group1, group2]);
  });
  it('Should not be able to show groups of non existing journey', async () => {
    await expect(showGroupsOfJourney.execute({
      journey_id: 'non-existing-journey'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});