import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';

interface IRequest {
    name: string;
    description: string;
    course_id: string;
    duration: number;
    video_id: string;
}
@injectable()
class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({ name, description, course_id, duration, video_id }: IRequest): Promise<Lesson> {
        const lesson = await this.lessonsRepository.create({name, description, course_id, duration, video_id});

        return lesson;
    }
}

export default CreateLessonService;
