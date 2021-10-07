import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';

import AppError from '@shared/errors/AppError';

import { ShowGroupsUseCase } from './ShowGroupsUseCase';

let fakeGroupsRepository: FakeGroupsRepository;
let showGroupsOfJourney: ShowGroupsUseCase;

describe('Show groups', () => {
    beforeEach(() => {
        fakeGroupsRepository = new FakeGroupsRepository();

        showGroupsOfJourney = new ShowGroupsUseCase(fakeGroupsRepository);
    });

    it('Should be able to list all groups', async () => {
        const group1 = await fakeGroupsRepository.create({
            description: 'group1',
            journey_id: 'asd',
            name: 'group1',
        });

        const group2 = await fakeGroupsRepository.create({
            description: 'group2',
            journey_id: 'asd',
            name: 'group2',
        });

        const groups = await showGroupsOfJourney.execute();

        expect(groups).toEqual([group1, group2]);
    });
});
