import Courses from '@modules/courses/entities/Courses';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    course_id: string;
    name: string;
    description: string;
}

@injectable()
class UpdateCourseUseCase {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute({
        course_id,
        description,
        name,
    }: IRequest): Promise<Courses> {
        const course = await this.coursesRepository.findById(course_id);

        if (!course) {
            throw new AppError('Not possible to find course');
        }

        course.name = name;
        course.description = description;

        await this.coursesRepository.save(course);

        return course;
    }
}

export { UpdateCourseUseCase };
