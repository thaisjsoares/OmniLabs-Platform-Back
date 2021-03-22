import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Courses from '../infra/typeorm/entities/Courses';

@injectable()
class ShowCoursesService {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Courses[]> {
        let course = await this.cacheProvider.recover<Courses[]>(
            `courses-list`,
        );

        if (!course) {
            course = await this.coursesRepository.findAll();

            await this.cacheProvider.save('courses-list', course);
        }

        return course;
    }
}

export default ShowCoursesService;
