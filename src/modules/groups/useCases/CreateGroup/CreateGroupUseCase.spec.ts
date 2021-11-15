import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import AppError from '@shared/errors/AppError';

import { CreateGroupUseCase } from './CreateGroupUseCase';

let createGroup: CreateGroupUseCase;
let fakeGroupsRepository: FakeGroupsRepository;
let fakeJourneyRepository: FakeJourneyRepository;

describe('Create Group', () => {
    beforeEach(() => {
        fakeGroupsRepository = new FakeGroupsRepository();
        fakeJourneyRepository = new FakeJourneyRepository();

        createGroup = new CreateGroupUseCase(
            fakeGroupsRepository,
            fakeJourneyRepository,
        );
    });

    it('should be able to create group', async () => {
        const journey = await fakeJourneyRepository.create({
            name: 'nodejs',
            description: 'back-end',
            course_id: '123',
        });

        expect(
            await createGroup.execute({
                name: 'iniciando no nodejs',
                description: 'backend iniciantes',
                journey_id: journey.id,
            }),
        ).toHaveProperty('id');
    });

    it('should not be able to create group if a non existent journey', async () => {
        await expect(
            createGroup.execute({
                name: 'iniciando no nodejs',
                description: 'backend iniciantes',
                journey_id: 'non-existing-journey',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
