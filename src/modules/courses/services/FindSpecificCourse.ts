import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Courses from '../infra/typeorm/entities/Courses';

interface IRequest {
    course_id: string;
}

@injectable()
class FindSpecificCourse {
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

export default FindSpecificCourse;
