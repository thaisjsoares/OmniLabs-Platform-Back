import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';

import AppError from '@shared/errors/AppError';

import { ListSpecificLessonUseCase } from './ListSpecificLessonUsecase';

let listSpecificLesson: ListSpecificLessonUseCase;
let fakeLessonsRepository: FakeLessonsRepository;

describe('List Specific Lesson', () => {
    beforeEach(() => {
        fakeLessonsRepository = new FakeLessonsRepository();

        listSpecificLesson = new ListSpecificLessonUseCase(
            fakeLessonsRepository,
        );
    });

    it('should be able to list a specific lesson', async () => {
        const lesson = await fakeLessonsRepository.create({
            type: 'video',
        });

        expect(
            await listSpecificLesson.execute({
                lesson_id: lesson.id,
            }),
        ).toEqual(lesson);
    });

    it('should not be able to list non existent lesson', async () => {
        await expect(
            listSpecificLesson.execute({
                lesson_id: 'non-existent-lesson',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
