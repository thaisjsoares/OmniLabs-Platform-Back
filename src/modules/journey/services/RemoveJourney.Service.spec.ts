import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import AppError from '../../../shared/errors/AppError';

import RemoveJourneyService from './RemoveJourney.Service';
import ShowAllJourneys from './ShowAllJourneys.Service';

let fakeJourneyRepository: FakeJourneyRepository;
let removeJourney: RemoveJourneyService;
let listJourney: ShowAllJourneys;

describe('Remove Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();

        removeJourney = new RemoveJourneyService(fakeJourneyRepository);
        listJourney = new ShowAllJourneys(fakeJourneyRepository);
    });

    it('should be able to remove journey', async () => {
        const journey = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Backend',
            course_id: 'course_id',
        });

        const journey2 = await fakeJourneyRepository.create({
            name: 'reactjs',
            description: 'Backend',
            course_id: 'course_id',
        });

        expect(await listJourney.execute()).toEqual([journey, journey2]);
        expect(await removeJourney.execute(journey.id)).toMatchObject(journey);
        expect(await listJourney.execute()).toEqual([journey2]);
    });

    it('should not be able able to remove a non existing journey', async () => {
        await expect(removeJourney.execute('asd')).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
