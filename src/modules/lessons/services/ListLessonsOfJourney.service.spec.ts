import AppError from '../../../shared/errors/AppError';

import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import FakeModulesRepository from '@modules/modules/repositories/fakes/FakeModulesRepository';

import ListLessonsOfJourney from './ListLessonsOfJourney.service';

let fakeLessonsRepository: FakeLessonsRepository;
let fakeJourneyRepository: FakeJourneyRepository
let fakeModulesRepository: FakeModulesRepository;

let listLessonsOfJourney: ListLessonsOfJourney;

describe('List Lessons of Journey', () => {
    beforeEach(() => {
        fakeLessonsRepository = new FakeLessonsRepository();
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeModulesRepository = new FakeModulesRepository();

        listLessonsOfJourney = new ListLessonsOfJourney(
            fakeLessonsRepository,
            fakeModulesRepository,
            fakeJourneyRepository
        )
    })

    it('should be able to list lessons of journey', async () => {
        const journey = await fakeJourneyRepository.create({
            name: "Nodejs",
            description: "Back-End",
            course_id: "course_id"
        })
        
        const module1 = await fakeModulesRepository.create({
            name: "nodeJs module 1",
            description: "múdulo sobre node",
            journey_id: journey.id
        })

        const lesson = await fakeLessonsRepository.create({
            name: 'métodos http',
            description: "get, post, put e delete",
            duration: 12000,
            module_id: module1.id, 
            video_id: 'video_id'
        })

        const lesson2 = await fakeLessonsRepository.create({
            name: 'lesson2',
            description: "get, post, put e delete",
            duration: 12000,
            module_id: module1.id, 
            video_id: 'video_id'
        })

        const listLessons = await listLessonsOfJourney.execute({
            journey_name: "Nodejs"
        })

        expect(listLessons).toEqual([{
            module: module1,
            lessons: [{
                id: lesson.id,
                name: lesson.name,
                description: lesson.description,
                duration: "20 min, 00 s",
                module_id: lesson.module_id, 
                video_id: lesson.video_id,
            },
            {
                id: lesson2.id,
                name: lesson2.name,
                description: lesson2.description,
                duration: "20 min, 00 s",
                module_id: lesson2.module_id, 
                video_id: lesson2.video_id, 
            }
        ]
        }])
    })

    it('should not be able to find journey if jouney_name non exists', async () => {
        await expect(
            listLessonsOfJourney.execute({
                journey_name: "Nodejs"
            })
        ).rejects.toBeInstanceOf(AppError);
    })
    
})
