import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import ShowJourneysOfCourse from './ShowJourneysOfCourse.Service';

let fakeJourneyRepository: FakeJourneyRepository;
let showJourneysOfCourse: ShowJourneysOfCourse;

describe('Show journeys of Course', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();

        showJourneysOfCourse = new ShowJourneysOfCourse(fakeJourneyRepository);
    });

    it('should be able to show journeys of course', async () => {
        const journey1 = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Back-end',
            course_id: '123',
        });

        const journey2 = await fakeJourneyRepository.create({
            name: 'ReactJs',
            description: 'Front-end',
            course_id: '123',
        });

        await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Back-end',
            course_id: '456',
        });

        expect(await showJourneysOfCourse.execute('123')).toEqual([
            journey1,
            journey2,
        ]);
    });
});
