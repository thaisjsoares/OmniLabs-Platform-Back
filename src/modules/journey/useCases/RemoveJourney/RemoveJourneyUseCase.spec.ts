import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import AppError from '@shared/errors/AppError';

import ShowAllJourneys from '../ShowAllJourney/ShowAllJourneysUseCase';
import RemoveJourneyService from './RemoveJourneyUseCase';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeCoursesRepository: FakeCoursesRepository;
let removeJourney: RemoveJourneyService;
let listJourney: ShowAllJourneys;

describe('Remove Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeCoursesRepository = new FakeCoursesRepository();

        removeJourney = new RemoveJourneyService(fakeJourneyRepository);
        listJourney = new ShowAllJourneys(
            fakeJourneyRepository,
            fakeCoursesRepository,
        );
    });

    it('should be able to remove journey', async () => {
        const course1 = await fakeCoursesRepository.create({
            description: '123',
            name: 'asdad',
        });

        const journey = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Backend',
            course_id: course1.id,
        });

        const journey2 = await fakeJourneyRepository.create({
            name: 'reactjs',
            description: 'Backend',
            course_id: course1.id,
        });

        expect(await listJourney.execute()).toEqual([
            {
                ...journey,
                image_url: journey.getAvatarUrl(),
                course_name: course1.name,
            },
            {
                ...journey2,
                image_url: journey2.getAvatarUrl(),
                course_name: course1.name,
            },
        ]);
        expect(await removeJourney.execute(journey.id)).toMatchObject(journey);
        expect(await listJourney.execute()).toEqual([
            {
                ...journey2,
                image_url: journey2.getAvatarUrl(),
                course_name: course1.name,
            },
        ]);
    });

    it('should not be able able to remove a non existing journey', async () => {
        await expect(removeJourney.execute('asd')).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
