import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Courses from '../infra/typeorm/entities/Courses';

@injectable()
class ShowCoursesService {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute(): Promise<Courses[]> {
        const course = await this.coursesRepository.findAll();

        return course;
    }
}

export default ShowCoursesService;
