import Courses from '@modules/courses/infra/typeorm/entities/Courses';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    course_id: string;
}

@injectable()
class FindSpecificCourseUseCase {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute({ course_id }: IRequest): Promise<Courses> {
        const course = await this.coursesRepository.findById(course_id);

        if (!course) {
            throw new AppError('Not possible to find course');
        }

        return course;
    }
}

export { FindSpecificCourseUseCase };
