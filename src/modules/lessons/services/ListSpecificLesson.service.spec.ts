import AppError from '../../../shared/errors/AppError';

import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';
import ListSpecificLesson from './ListSpecificLesson.service';

let listSpecificLesson: ListSpecificLesson;
let fakeLessonsRepository: FakeLessonsRepository;

describe('List Specific Lesson', () => {
    beforeEach(() => {
        fakeLessonsRepository = new FakeLessonsRepository();

        listSpecificLesson = new ListSpecificLesson(
            fakeLessonsRepository,
        )
    })

    it('should be able to list a specific lesson', async () => {
        const lesson = await fakeLessonsRepository.create({
            name: 'métodos http',
            description: "get, post, put e delete",
            duration: 12000,
            module_id:'module', 
            video_id: 'video_id'
        })

        expect(
            await listSpecificLesson.execute({
                lesson_id: lesson.id
            })
        ).toEqual(lesson)
    })

    it('should not be able to list non existent lesson', async () => {
        await expect(
            listSpecificLesson.execute({
                lesson_id: 'non-existent-lesson'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
    
})
