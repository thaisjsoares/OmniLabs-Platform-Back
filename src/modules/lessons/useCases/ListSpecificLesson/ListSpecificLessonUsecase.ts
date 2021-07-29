import Lesson from '@modules/lessons/infra/typeorm/entities/Lessons';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    lesson_id: string;
}

@injectable()
class ListSpecificLessonUseCase {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({ lesson_id }: IRequest): Promise<Lesson> {
        const lesson = await this.lessonsRepository.findById(lesson_id);

        if (!lesson) {
            throw new AppError('Not possible to find lesson');
        }

        return lesson;
    }
}

export { ListSpecificLessonUseCase };
