import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import AppError from '@shared/errors/AppError';

import { ShowGroupsOfJourneyUseCase } from './ShowGroupsOfJourneyUseCase';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeGroupsRepository: FakeGroupsRepository;
let showGroupsOfJourney: ShowGroupsOfJourneyUseCase;

describe('Show groups of joourney', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeGroupsRepository = new FakeGroupsRepository();

        showGroupsOfJourney = new ShowGroupsOfJourneyUseCase(
            fakeGroupsRepository,
            fakeJourneyRepository,
        );
    });

    it('Should be able to list groups of a journey', async () => {
        const journey = await fakeJourneyRepository.create({
            course_id: 'course_id',
            description: 'description test',
            name: 'joureny-test',
        });

        const group1 = await fakeGroupsRepository.create({
            description: 'group1',
            journey_id: journey.id,
            name: 'group1',
        });

        const group2 = await fakeGroupsRepository.create({
            description: 'group2',
            journey_id: journey.id,
            name: 'group2',
        });

        const groups = await showGroupsOfJourney.execute({
            journey_id: journey.id,
        });

        expect(groups).toEqual([group1, group2]);
    });

    it('Should not be able to show groups of non existing journey', async () => {
        await expect(
            showGroupsOfJourney.execute({
                journey_id: 'non-existing-journey',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
