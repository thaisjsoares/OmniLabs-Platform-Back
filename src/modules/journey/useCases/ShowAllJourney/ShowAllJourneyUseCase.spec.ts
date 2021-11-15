import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import ShowAllJourneysService from './ShowAllJourneysUseCase';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeCoursesRepository: FakeCoursesRepository;
let showAllJourneys: ShowAllJourneysService;

describe('List All Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeCoursesRepository = new FakeCoursesRepository();

        showAllJourneys = new ShowAllJourneysService(
            fakeJourneyRepository,
            fakeCoursesRepository,
        );
    });

    it('should be able to list all Journeys', async () => {
        const course1 = await fakeCoursesRepository.create({
            description: 'asd',
            name: '123',
        });

        const journey1 = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Back-end',
            course_id: course1.id,
        });

        const journey2 = await fakeJourneyRepository.create({
            name: 'ReactJs',
            description: 'Front-end',
            course_id: course1.id,
        });

        expect(await showAllJourneys.execute()).toEqual([
            {
                ...journey1,
                image_url: journey1.getAvatarUrl(),
                course_name: course1.name,
            },
            {
                ...journey2,
                image_url: journey1.getAvatarUrl(),
                course_name: course1.name,
            },
        ]);
    });
});
