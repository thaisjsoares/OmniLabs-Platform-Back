import AppError from '../../../shared/errors/AppError';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import RemoveJourneyService from './RemoveJourney.Service';

let fakeJourneyRepository: FakeJourneyRepository;
let removeJourney: RemoveJourneyService;

describe('Remove Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();

        removeJourney = new RemoveJourneyService(
            fakeJourneyRepository,
        )
    })

    it('should be able to remove journey', async () => {
        const journey = await fakeJourneyRepository.create({
            name: "NodeJs",
            description: "Backend",
            course_id: "course_id"
        })

        expect(await removeJourney.execute(journey.id)).toMatchObject(journey);
    })

    it('should not be able able to remove a non existing journey', async () => {
        await expect(
            removeJourney.execute("asd")
        ).rejects.toBeInstanceOf(AppError)
    })

    
})
