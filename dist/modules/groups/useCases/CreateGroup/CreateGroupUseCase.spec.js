"use strict";

var _FakeGroupsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeGroupsRepository"));

var _FakeJourneyRepository = _interopRequireDefault(require("../../../journey/repositories/fakes/FakeJourneyRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateGroupUseCase = require("./CreateGroupUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createGroup;
let fakeGroupsRepository;
let fakeJourneyRepository;
describe('Create Group', () => {
  beforeEach(() => {
    fakeGroupsRepository = new _FakeGroupsRepository.default();
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    createGroup = new _CreateGroupUseCase.CreateGroupUseCase(fakeGroupsRepository, fakeJourneyRepository);
  });
  it('should be able to create group', async () => {
    const journey = await fakeJourneyRepository.create({
      name: 'nodejs',
      description: 'back-end',
      course_id: '123'
    });
    expect(await createGroup.execute({
      name: 'iniciando no nodejs',
      description: 'backend iniciantes',
      journey_id: journey.id
    })).toHaveProperty('id');
  });
  it('should not be able to create group if a non existent journey', async () => {
    await expect(createGroup.execute({
      name: 'iniciando no nodejs',
      description: 'backend iniciantes',
      journey_id: 'non-existing-journey'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});