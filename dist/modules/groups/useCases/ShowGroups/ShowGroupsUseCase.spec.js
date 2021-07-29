"use strict";

var _FakeGroupsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeGroupsRepository"));

var _ShowGroupsUseCase = require("./ShowGroupsUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeGroupsRepository;
let showGroupsOfJourney;
describe('Show groups', () => {
  beforeEach(() => {
    fakeGroupsRepository = new _FakeGroupsRepository.default();
    showGroupsOfJourney = new _ShowGroupsUseCase.ShowGroupsUseCase(fakeGroupsRepository);
  });
  it('Should be able to list all groups', async () => {
    const group1 = await fakeGroupsRepository.create({
      description: 'group1',
      journey_id: 'asd',
      name: 'group1'
    });
    const group2 = await fakeGroupsRepository.create({
      description: 'group2',
      journey_id: 'asd',
      name: 'group2'
    });
    const groups = await showGroupsOfJourney.execute();
    expect(groups).toEqual([group1, group2]);
  });
});