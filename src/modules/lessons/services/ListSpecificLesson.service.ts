import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
    lesson_id: string;
}

@injectable()
class ListSpecificLesson {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({ lesson_id }: IRequest) {
        const lesson = await this.lessonsRepository.findById(lesson_id);

        if (!lesson) {
            throw new AppError('Not possible to find lesson');
        }

        return lesson;
    }
}

export default ListSpecificLesson;
