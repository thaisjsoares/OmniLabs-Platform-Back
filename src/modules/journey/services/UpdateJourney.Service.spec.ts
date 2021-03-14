import AppError from '../../../shared/errors/AppError';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'

import UpdateJourney from './UpdateJourney.Service';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeCoursesRepository: FakeCoursesRepository;
let updateJourney: UpdateJourney;

describe('Update Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeCoursesRepository = new FakeCoursesRepository();

        updateJourney = new UpdateJourney(
            fakeJourneyRepository,
            fakeCoursesRepository
        )
    })

    it('should be able to edit Journey', async () => {
        const journey = await fakeJourneyRepository.create({
            name: "Nodejs",
            description: "Back-End",
            course_id: "123"
        });

        await updateJourney.execute({
            journey_id: journey.id,
            name: "Reactjs",
            description: "Front-end"
        })

        expect(journey.name).toBe('Reactjs');
        expect(journey.description).toBe('Front-end');
    })

    it('should not be able to edit non existing journey', async () => {
        await expect(
            updateJourney.execute({
                journey_id: 'non-existing-journey-id',
                name: 'non-existing-name',
                description: 'non-existing-description'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update course_id of journey if course non exist', async () => {
        const journey = await fakeJourneyRepository.create({
            name: "Nodejs",
            description: "Back-End",
            course_id: "123"
        });

        
        await expect(
            updateJourney.execute({
                journey_id: journey.id,
                name: "Reactjs",
                description: "Front-end",
                course_id: 'aaaaaa'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
