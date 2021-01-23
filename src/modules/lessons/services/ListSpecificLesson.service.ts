import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns'
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';

import AppError from '@shared/errors/AppError';

interface IRequest {
    lesson_id: string;
}

@injectable()
class ListSpecificLesson {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({ lesson_id }: IRequest){
        const lesson = await this.lessonsRepository.findById(lesson_id);

        return lesson;
    }
}

export default ListSpecificLesson;
