import AppError from '../../../shared/errors/AppError';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'

import CreateJourneyService from './CreateJourney.Service';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeCoursesRepository: FakeCoursesRepository;
let createJourney: CreateJourneyService;

describe('Create Journey', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeCoursesRepository = new FakeCoursesRepository();

        createJourney = new CreateJourneyService(
            fakeJourneyRepository,
            fakeCoursesRepository
        )
    })

    it('should be able to create Journey', async () => {
        const course = await fakeCoursesRepository.create({
            name: "Starter",
            description: "curso iniciantes"
        })

        const journey = await createJourney.execute({
            name: "Nodejs",
            description: "Back-End",
            course_id: course.id
        })

        expect(journey).toHaveProperty('id')
    })

    it('should not be able to create journey whith a non existing course', async () => {
        await expect(
            createJourney.execute({
                name: "Nodejs",
                description: "Back-End",
                course_id: "non-existing-id"
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create already existent journey', async () => {
        const course = await fakeCoursesRepository.create({
            name: "Starter",
            description: "curso iniciantes"
        })

        await createJourney.execute({
            name: "Nodejs",
            description: "Back-End",
            course_id: course.id
        })

        await expect(createJourney.execute({
            name: "Nodejs",
            description: "Back-End",
            course_id: course.id
        })).rejects.toBeInstanceOf(AppError)
    })
})
