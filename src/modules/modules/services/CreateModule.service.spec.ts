import AppError from '../../../shared/errors/AppError';

import FakeModulesRepository from '@modules/modules/repositories/fakes/FakeModulesRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import CreateModule from './CreateModule.service';

let createModule: CreateModule;
let fakeModulesRepository: FakeModulesRepository;
let fakeJourneyRepository: FakeJourneyRepository

describe('Create Module', () => {
    beforeEach(() => {
        fakeModulesRepository = new FakeModulesRepository();
        fakeJourneyRepository = new FakeJourneyRepository();

        createModule = new CreateModule(
            fakeModulesRepository,
            fakeJourneyRepository
        )
    })

    it('should be able to create module', async () => {
        const journey = await fakeJourneyRepository.create({
            name: "nodejs",
            description: "back-end",
            course_id: "123"
        })

        expect(
            await createModule.execute({
                name: "iniciando no nodejs",
                description: "backend iniciantes",
                journey_id: journey.id
            })
        ).toHaveProperty('id')
    })

    it('should not be able to create module if a non existent journey', async () => {
        await expect(
            createModule.execute({
                name: "iniciando no nodejs",
                description: "backend iniciantes",
                journey_id: "non-existing-journey"
            })
        ).rejects.toBeInstanceOf(AppError);
    })
    
})
