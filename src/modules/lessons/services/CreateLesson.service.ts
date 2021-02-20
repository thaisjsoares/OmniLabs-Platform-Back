import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

interface IRequest {
    name: string;
    description: string;
    course_id: string;
    duration: number;
    video_id: string;
    module_id?: string;
}
@injectable()
class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute({ name, description, course_id, duration, video_id, module_id }: IRequest): Promise<Lesson> {
        const course = await this.coursesRepository.findById(course_id)

        if(!course) {
            throw new AppError('Not possible to find Coruse')
        }

        const lesson = await this.lessonsRepository.create({
            name, 
            description, 
            course_id: course.id, 
            duration, 
            video_id,
            module_id
        });

        return lesson;
    }
}

export default CreateLessonService;
