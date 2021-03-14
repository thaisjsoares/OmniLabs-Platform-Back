import AppError from '../../../shared/errors/AppError';

import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';
import FakeModulesRepository from '@modules/modules/repositories/fakes/FakeModulesRepository';
import CreateLessonService from './CreateLesson.service';

let createLesson: CreateLessonService;
let fakeLessonsRepository: FakeLessonsRepository;
let fakeModulesRepository: FakeModulesRepository;

describe('Create Lesson', () => {
    beforeEach(() => {
        fakeLessonsRepository = new FakeLessonsRepository();
        fakeModulesRepository = new FakeModulesRepository();

        createLesson = new CreateLessonService(
            fakeLessonsRepository,
            fakeModulesRepository
        )
    })

    it('should be able to create lesson', async () => {
        const module = await fakeModulesRepository.create({
            name: "Iniciando no Nodejs",
            description: "módulo iniciação em node",
            journey_id: "journey_id"
        })

        const lesson = await createLesson.execute({
            name: 'métodos http',
            description: "get, post, put e delete",
            duration: 12000,
            module_id: module.id, 
            video_id: 'video_id'
        })

        expect(lesson).toHaveProperty('id');
    })

    it('should not be able to create lesson if module non exists', async () => {
        await expect(
            createLesson.execute({
                name: 'métodos http',
                description: "get, post, put e delete",
                duration: 12000,
                module_id: 'non-existing-module', 
                video_id: 'video_id'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
    
})
